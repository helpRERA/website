export async function generatePDF(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element #${elementId} not found`);

  const html2pdf = (await import('html2pdf.js')).default;
  element.classList.add('pdf-export');

  const options = {
    margin: [22, 20, 20, 20] as [number, number, number, number],
    filename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  try {
    await html2pdf().set(options).from(element).save();
  } finally {
    element.classList.remove('pdf-export');
  }
}