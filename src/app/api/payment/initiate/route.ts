import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId, packageName, phoneNumber, amount, customerName } = await request.json();

    if (!userId || !packageName || !phoneNumber || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate phone number (Kenya format: 254XXXXXXXXX or 07XXXXXXXXX)
    const formattedPhone = phoneNumber.startsWith('0') 
      ? phoneNumber.slice(1) 
      : phoneNumber.startsWith('254')
      ? phoneNumber.slice(3)
      : phoneNumber;

    // Create payment record
    const externalReference = `CVPRO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        amount,
        status: 'pending',
        transaction_reference: externalReference,
      })
      .select()
      .single();

    if (paymentError) {
      return NextResponse.json({ error: 'Failed to create payment record' }, { status: 500 });
    }

    // Create order record
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        package_name: packageName,
        payment_id: paymentData.id,
        status: 'pending',
      });

    if (orderError) {
      console.error('Failed to create order:', orderError);
    }

    // Call PayHero API to initiate STK Push
    const auth = Buffer.from(`${process.env.PAYHERO_API_KEY}:${process.env.PAYHERO_SECRET_KEY}`).toString('base64');
    
    const payheroResponse = await fetch('https://backend.payhero.co.ke/api/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amount,
        phone_number: formattedPhone,
        channel_id: parseInt(process.env.PAYHERO_CHANNEL_ID || '0'),
        provider: 'm-pesa',
        external_reference: externalReference,
        customer_name: customerName || 'CVPro User',
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`,
      }),
    });

    const payheroData = await payheroResponse.json();

    if (!payheroResponse.ok) {
      console.error('PayHero API error:', payheroData);
      return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
    }

    // Update payment with PayHero reference
    await supabase
      .from('payments')
      .update({ 
        transaction_reference: payheroData.reference || externalReference 
      })
      .eq('id', paymentData.id);

    return NextResponse.json({
      success: true,
      paymentId: paymentData.id,
      transactionReference: payheroData.reference || externalReference,
      checkoutRequestId: payheroData.CheckoutRequestID,
      status: payheroData.status,
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
