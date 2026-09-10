const assert = require('node:assert/strict');
const { test } = require('node:test');
const Module = require('node:module');
const path = require('node:path');
const { buildSync } = require('esbuild');

// Render the actual components with React, without a database or browser.
const output = buildSync({
  stdin: {
    contents: `
      import React from 'react';
      import { renderToStaticMarkup } from 'react-dom/server';
      import FormPanel from './resources/js/Components/FormPanel/FormPanel';
      import DocumentPages from './resources/js/Components/DocumentPages/DocumentPages';
      import { useAgreementData } from './resources/js/hooks/useAgreementData';
      export { getAgreementFieldStep } from './resources/js/utils/agreementFieldNavigation';
      export function render(step, override) {
        function Fixture() {
          const { data } = useAgreementData(override);
          const noop = () => {};
          return <><FormPanel activeStep={step} data={data} setActiveStep={noop}
            updateField={noop} updateNestedField={noop} resetData={noop}
            setActiveField={noop} onSave={async () => {}} isSaving={false} isSaved={false} />
            <DocumentPages data={data} /></>;
        }
        return renderToStaticMarkup(<Fixture />);
      }
    `,
    resolveDir: process.cwd(),
    loader: 'tsx',
  },
  bundle: true,
  platform: 'node',
  format: 'cjs',
  packages: 'external',
  loader: { '.svg': 'text' },
  write: false,
  logLevel: 'silent',
}).outputFiles[0].text;
const fixture = new Module(path.join(process.cwd(), 'agreement-navigation-fixture.cjs'));
fixture.filename = path.join(process.cwd(), 'agreement-navigation-fixture.cjs');
fixture.paths = module.paths;
fixture._compile(output, fixture.filename);
const { render, getAgreementFieldStep } = fixture.exports;

test('preview navigation resolves current sections and ignores fields without an editor', () => {
  assert.equal(getAgreementFieldStep('promoterCompany.name'), 1);
  assert.equal(getAgreementFieldStep('additionalDisclosures.12.text'), 4);
  assert.equal(getAgreementFieldStep('competentAuthorityForDeclaration'), 5);
  assert.equal(getAgreementFieldStep('maintenanceClauses.12.text'), 6);
  assert.equal(getAgreementFieldStep('executionPlace'), undefined);
  assert.equal(getAgreementFieldStep('unknown'), undefined);
});

test('repeated land fields and date controls retain exact row and property identifiers', () => {
  const html = render(3, { landOwnerEntries: [
    { id: 11, surveyNos: 'First survey', titleDeedDate: '2026-01-01' },
    { id: 22, surveyNos: 'Second survey', titleDeedDate: '2026-02-01' },
  ] });
  for (const id of [11, 22]) {
    for (const field of ['surveyNos', 'titleDeedDate']) {
      const key = `landOwnerEntries.${id}.${field}`;
      assert.ok(html.includes(`data-form-field="${key}"`), key);
      assert.ok(html.includes(`data-edit-field="${key}"`), key);
      assert.equal(getAgreementFieldStep(key), 3);
    }
  }
});

test('click targets distinguish repeated clause rows', () => {
  const html = render(6, { maintenanceClauses: [
    { id: 31, text: 'First clause' }, { id: 32, text: 'Second clause' },
  ], additionalTerms: [{ id: 41, text: 'Additional term' }] });
  for (const key of ['maintenanceClauses.31.text', 'maintenanceClauses.32.text', 'additionalTerms.41.text']) {
    assert.ok(html.includes(`data-form-field="${key}"`), key);
    assert.ok(html.includes(`data-edit-field="${key}"`), key);
  }
});

test('pricing descriptions and garage values identify their own rows', () => {
  const html = render(5, {
    priceBreakdown: [{ id: 51, description: 'First cost' }, { id: 52, description: 'Second cost' }],
    garageDetails: [{ id: 61, no: 'G-1' }],
  });
  for (const key of ['priceBreakdown.51.description', 'priceBreakdown.52.description', 'garageDetails.61.no']) {
    assert.ok(html.includes(`data-form-field="${key}"`), key);
    assert.ok(html.includes(`data-edit-field="${key}"`), key);
  }
});
