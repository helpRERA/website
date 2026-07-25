export async function generatePDF(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element #${elementId} not found`);

  // To fix scaling duplication without losing font styles (which happens if cloned off-screen),
  // we temporarily strip the transform scale from the parent in the live DOM.
  const parent = element.parentElement;
  let originalTransform = '';
  if (parent) {
    originalTransform = parent.style.transform;
    parent.style.transform = 'none';
  }

  element.classList.add('pdf-export');
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
    jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
    pagebreak: { 
      mode: ['css', 'legacy'], 
      avoid: ['tr', 'h2', 'h3', 'p', 'li', '.placeholder-block', '.photo-box', '.signature-row', '.indent-1', '.indent-2', 'table'] 
    }
  };

  try {
    await html2pdf().set(options).from(element).save();
  } finally {
    element.classList.remove('pdf-export');
    if (parent) {
      parent.style.transform = originalTransform;
    }
  }
}