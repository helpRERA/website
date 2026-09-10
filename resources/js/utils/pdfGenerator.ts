import html2canvas from 'html2canvas';
import { jsPDF, GState } from "jspdf";
import { PDFDocument } from 'pdf-lib';
import { findPageEnd, ProtectedBand } from './pdfPagination';

function getProtectedBands(element: HTMLElement, scale: number): ProtectedBand[] {
  const origin = element.getBoundingClientRect().top;
  const bands: ProtectedBand[] = [];
  const addRect = (rect: DOMRect) => {
    if (rect.height && rect.width) bands.push({
      top: Math.max(0, Math.floor((rect.top - origin) * scale) - 2),
      bottom: Math.ceil((rect.bottom - origin) * scale) + 2,
    });
  };
  // Ranges expose individual rendered lines, including text in long clauses.
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  while (walker.nextNode()) {
    if (!walker.currentNode.textContent?.trim()) continue;
    range.selectNodeContents(walker.currentNode);
    Array.from(range.getClientRects()).forEach(addRect);
  }
  element.querySelectorAll<HTMLElement>('tr, .photo-box, .signature-row, img').forEach(node => addRect(node.getBoundingClientRect()));
  element.querySelectorAll<HTMLElement>('.legal-section-title, h2, h3').forEach(node => {
    const rect = node.getBoundingClientRect();
    // Keep the heading with at least the first line of its following content.
    const next = node.nextElementSibling?.getBoundingClientRect();
    bands.push({ top: Math.floor((rect.top - origin) * scale), bottom: Math.ceil(((next ? Math.min(next.bottom, next.top + 28) : rect.bottom) - origin) * scale) });
  });
  return bands;
}

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
  try {
    await document.fonts.ready;
    await Promise.all(Array.from(container.querySelectorAll('img')).map(img => img.decode().catch(() => undefined)));
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const margin = 20;
    const contentWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    const contentHeight = pdf.internal.pageSize.getHeight() - margin * 2;
    const sections = Array.from(container.querySelectorAll<HTMLElement>('.paper-page'));
    let firstPage = true;
    for (const section of sections.length ? sections : [container]) {
      const canvas = await html2canvas(section, { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' });
      const scale = canvas.width / section.getBoundingClientRect().width;
      const bands = getProtectedBands(section, scale);
      const pixelsPerMm = canvas.width / contentWidth;
      const pageHeight = Math.floor(contentHeight * pixelsPerMm);
      for (let start = 0; start < canvas.height;) {
        const end = findPageEnd(start, pageHeight, canvas.height, bands);
        const slice = document.createElement('canvas');
        slice.width = canvas.width;
        slice.height = end - start;
        const context = slice.getContext('2d');
        if (!context) throw new Error('Unable to create PDF page canvas');
        context.drawImage(canvas, 0, start, canvas.width, slice.height, 0, 0, slice.width, slice.height);
        if (!firstPage) pdf.addPage();
        firstPage = false;
        pdf.addImage(slice.toDataURL('image/jpeg', 0.98), 'JPEG', margin, margin, contentWidth, slice.height / pixelsPerMm);
        start = end;
      }
      canvas.width = canvas.height = 0;
    }

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
