export interface ProtectedBand {
  top: number;
  bottom: number;
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
