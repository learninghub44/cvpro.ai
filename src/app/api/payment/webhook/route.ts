import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Verify PayHero webhook signature if they provide one
    // const signature = request.headers.get('x-payhero-signature');
    // const hmac = crypto.createHmac('sha256', process.env.PAYHERO_WEBHOOK_SECRET!);
    // hmac.update(JSON.stringify(body));
    // const expectedSignature = hmac.digest('hex');
    // 
    // if (signature !== expectedSignature) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    // PayHero webhook response structure
    const { 
      reference, 
      status, 
      amount, 
      phone_number,
      external_reference 
    } = body;

    // Find payment by transaction reference or external reference
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .or(`transaction_reference.eq.${reference},transaction_reference.eq.${external_reference}`)
      .single();

    if (paymentError || !payment) {
      console.error('Payment not found:', { reference, external_reference });
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Map PayHero status to our status
    const statusMap: Record<string, string> = {
      'COMPLETED': 'completed',
      'SUCCESS': 'completed',
      'FAILED': 'failed',
      'CANCELLED': 'failed',
      'PENDING': 'pending',
      'QUEUED': 'pending',
    };

    const mappedStatus = statusMap[status?.toUpperCase()] || status?.toLowerCase() || 'pending';

    // Update payment status
    const { error: updateError } = await supabase
      .from('payments')
      .update({ status: mappedStatus })
      .eq('id', payment.id);

    if (updateError) {
      console.error('Failed to update payment:', updateError);
      return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
    }

    // If payment is successful, update related order
    if (mappedStatus === 'completed') {
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('payment_id', payment.id);

      if (orderError) {
        console.error('Failed to update order:', orderError);
      }
    } else if (mappedStatus === 'failed') {
      // Mark order as failed if payment failed
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: 'failed' })
        .eq('payment_id', payment.id);

      if (orderError) {
        console.error('Failed to update order:', orderError);
      }
    }

    console.log('Payment webhook processed:', { reference, status: mappedStatus });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
