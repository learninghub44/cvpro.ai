import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

export async function exportToPDF(content: string, filename: string) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  let page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  const fontSize = 12;
  const margin = 50;
  const lineHeight = fontSize * 1.5;
  
  // Split content into lines
  const lines = content.split('\n');
  let y = height - margin;
  
  for (const line of lines) {
    if (y < margin) {
      page = pdfDoc.addPage();
      y = height - margin;
    }
    
    page.drawText(line, {
      x: margin,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    
    y -= lineHeight;
  }
  
  const pdfBytes = await pdfDoc.save();
  
  // Create blob and download
  const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function exportToDOCX(content: string, filename: string) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: content.split('\n').map(line => 
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 24,
            }),
          ],
        })
      ),
    }],
  });
  
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.docx`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function exportCVToPDF(cvData: any, filename: string) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  let page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  let y = height - 50;
  const margin = 50;
  const lineHeight = 20;
  
  // Name
  if (cvData.professional_summary) {
    page.drawText(cvData.professional_summary, {
      x: margin,
      y,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight * 2;
  }
  
  // Experience
  if (cvData.experience && cvData.experience.length > 0) {
    page.drawText('Experience', {
      x: margin,
      y,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight;
    
    for (const exp of cvData.experience) {
      if (y < margin) {
        page = pdfDoc.addPage();
        y = height - margin;
      }
      
      page.drawText(`${exp.title} - ${exp.company}`, {
        x: margin,
        y,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
      
      page.drawText(exp.dates || '', {
        x: margin,
        y,
        size: 10,
        font,
        color: rgb(0.5, 0.5, 0.5),
      });
      y -= lineHeight;
      
      if (exp.description) {
        const descLines = exp.description.split('\n');
        for (const line of descLines) {
          if (y < margin) {
            page = pdfDoc.addPage();
            y = height - margin;
          }
          page.drawText(line, {
            x: margin + 20,
            y,
            size: 11,
            font,
            color: rgb(0, 0, 0),
          });
          y -= lineHeight;
        }
      }
      y -= lineHeight;
    }
  }
  
  // Education
  if (cvData.education && cvData.education.length > 0) {
    if (y < margin + 100) {
      page = pdfDoc.addPage();
      y = height - margin;
    }
    
    page.drawText('Education', {
      x: margin,
      y,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight;
    
    for (const edu of cvData.education) {
      if (y < margin) {
        page = pdfDoc.addPage();
        y = height - margin;
      }
      
      page.drawText(`${edu.degree} - ${edu.institution}`, {
        x: margin,
        y,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
      
      page.drawText(edu.dates || '', {
        x: margin,
        y,
        size: 10,
        font,
        color: rgb(0.5, 0.5, 0.5),
      });
      y -= lineHeight;
    }
  }
  
  // Skills
  if (cvData.skills && cvData.skills.length > 0) {
    if (y < margin + 100) {
      page = pdfDoc.addPage();
      y = height - margin;
    }
    
    page.drawText('Skills', {
      x: margin,
      y,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight;
    
    const skillsText = cvData.skills.join(', ');
    page.drawText(skillsText, {
      x: margin,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
