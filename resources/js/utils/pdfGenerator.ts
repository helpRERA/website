import html2canvas from 'html2canvas';
import { jsPDF, GState } from "jspdf";
import { PDFDocument } from 'pdf-lib';

async function mergeSchedulePDFs(mainPdfBytes: ArrayBuffer, scheduleUrls: (string | undefined)[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.load(mainPdfBytes);

  for (const url of scheduleUrls) {
    if (!url) continue;

    try {
      const response = await fetch(url);
      if (!response.ok) continue;

      const scheduleBytes = await response.arrayBuffer();
      const schedulePdf = await PDFDocument.load(scheduleBytes);
      const copiedPages = await mergedPdf.copyPages(schedulePdf, schedulePdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    } catch (err) {
      console.error('Failed to merge schedule PDF:', url, err);
    }
  }

  return await mergedPdf.save();
}

function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function generatePDF(
  elementId: string,
  filename: string,
  scheduleUrls?: (string | undefined)[]
): Promise<void> {
  const container = document.getElementById(elementId);
  if (!container) throw new Error(`Element #${elementId} not found`);

  const parent = container.parentElement;
  let originalTransform = '';
  if (parent) {
    originalTransform = parent.style.transform;
    parent.style.transform = 'none';
  }

  container.classList.add('pdf-export');
  const html2pdf = (await import('html2pdf.js')).default;

  const options = {
    margin: [20, 20, 20, 20] as [number, number, number, number],
    filename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: {
      unit: 'mm' as const,
      format: 'a4' as const,
      orientation: 'portrait' as const,
      // encryption: {
      //   userPassword: '',
      //   ownerPassword: 'krera-secret',
      //   userPermissions: []
      // }
    },
    pagebreak: {
      mode: ['css', 'legacy'],
      avoid: ['tr', 'h2', 'h3', 'p', 'li', '.placeholder-block', '.photo-box', '.signature-row', '.indent-1', '.indent-2', 'table']
    }
  };

  try {
    const worker = html2pdf().set(options).from(container);
    const pdf = await worker.toPdf().get('pdf');

    const totalPages = pdf.internal.getNumberOfPages();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      pdf.saveGraphicsState();
      pdf.setGState(new GState({ opacity: 0.15 }));

      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(80);
      pdf.setFont("times", "normal");

      const text = "K-RERA";
      const centerX = pageWidth / 2;
      const centerY = pageHeight / 2;
      const fontSizeMm = 80 * 0.3528;
      const verticalOffset = fontSizeMm * 0.35;

      pdf.text(text, centerX, centerY + verticalOffset, {
        angle: 45,
        align: "center"
      });

      pdf.restoreGraphicsState();
    }

    const mainPdfBytes = pdf.output('arraybuffer');

    if (scheduleUrls && scheduleUrls.some(u => !!u)) {
      const mergedBytes = await mergeSchedulePDFs(mainPdfBytes, scheduleUrls);
      downloadBytes(mergedBytes, filename);
    } else {
      pdf.save(filename);
    }
  } finally {
    container.classList.remove('pdf-export');
    if (parent) {
      parent.style.transform = originalTransform;
    }
  }
}