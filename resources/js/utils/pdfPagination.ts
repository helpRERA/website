export interface ProtectedBand {
  top: number;
  bottom: number;
}

// Find a clear gap in the actual raster, since canvas font metrics can differ
// slightly from DOM Range measurements. Rows are indexed from the scan's top.
export function findRasterPageEnd(inkRows: boolean[], gap = 3): number {
  let clearRows = 0;
  for (let row = inkRows.length - 1; row >= 0; row--) {
    clearRows = inkRows[row] ? 0 : clearRows + 1;
    if (clearRows >= gap) return row + gap;
  }
  // An oversized image/row with no clear gap must still make progress.
  return inkRows.length;
}

// Coordinates are canvas pixels. Always advance, even for an oversized image/row.
export function findPageEnd(start: number, pageHeight: number, totalHeight: number, bands: ProtectedBand[]): number {
  const limit = Math.min(start + pageHeight, totalHeight);
  let end = limit;
  while (true) {
    const crossing = bands.filter(band => band.top < end && band.bottom > end && band.top > start);
    if (!crossing.length) return end;
    const next = Math.floor(Math.min(...crossing.map(band => band.top)));
    if (next <= start) return limit;
    end = next;
  }
}
