const assert = require('node:assert/strict');
const { test } = require('node:test');
const { buildSync } = require('esbuild');
const Module = require('node:module');
const output = buildSync({ entryPoints: ['resources/js/utils/pdfPagination.ts'], bundle: true, platform: 'node', format: 'cjs', write: false }).outputFiles[0].text;
const fixture = new Module('pdf-pagination-fixture.cjs');
fixture._compile(output, 'pdf-pagination-fixture.cjs');
const { findPageEnd } = fixture.exports;

test('moves a boundary above a text line and overlapping inline values', () => {
  assert.equal(findPageEnd(0, 100, 250, [{ top: 90, bottom: 105 }, { top: 85, bottom: 95 }]), 85);
});

test('keeps a table row together when it fits on the next page', () => {
  const bands = [{ top: 70, bottom: 130 }];
  assert.equal(findPageEnd(0, 100, 250, bands), 70);
  assert.equal(findPageEnd(70, 100, 250, bands), 170);
});

test('long content advances without gaps, overlaps, or empty trailing pages', () => {
  const bands = Array.from({ length: 25 }, (_, i) => ({ top: i * 12 + 2, bottom: i * 12 + 11 }));
  let start = 0;
  const boundaries = [];
  while (start < 300) {
    const end = findPageEnd(start, 100, 300, bands);
    assert.ok(end > start && end - start <= 100);
    assert.ok(!bands.some(band => band.top < end && band.bottom > end));
    boundaries.push(end);
    start = end;
  }
  assert.equal(boundaries.at(-1), 300);
  assert.equal(findPageEnd(200, 100, 300, []), 300);
});

test('oversized elements still allow pagination to progress', () => {
  assert.equal(findPageEnd(0, 100, 300, [{ top: 0, bottom: 300 }]), 100);
});
