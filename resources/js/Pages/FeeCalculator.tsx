import { FormEventHandler, ReactNode, useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { calculateFee, type ProjectStatus } from '../fee';
import AppLayout from '../Components/Layout/AppLayout/AppLayout'

interface ServerResult {
  land_fee: number;
  residential_fee: number;
  commercial_fee: number;
  total_fee: number;
}

interface PageProps {
  result: ServerResult | null;
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

const sqm = (v: string) => (v.trim() === '' ? 0 : Math.max(0, parseFloat(v) || 0));

const FEE_STRUCTURE: { category: string; formula: string }[] = [
  { category: 'Plot Development', formula: 'Rs. 10 per sqm of total layout area' },
  {
    category: 'Ongoing Residential Projects',
    formula: 'Rs. 10 per sqm of total layout area plus Rs. 25 per sqm of total floor area',
  },
  {
    category: 'New Residential Projects',
    formula: 'Rs. 10 per sqm of total layout area plus Rs. 50 per sqm of total floor area',
  },
  {
    category: 'Commercial or any other projects',
    formula: 'Rs. 10 per sqm of total layout area plus Rs. 100 per sqm of total floor area',
  },
];

function FeeCalculator({ result }: PageProps) {
  const { data, setData, post, processing, errors, wasSuccessful } = useForm({
    land_area: '',
    project_status: '' as ProjectStatus | '',
    residential_area: '',
    commercial_area: '',
  });

  const landArea = sqm(data.land_area);
  const residentialArea = sqm(data.residential_area);
  const commercialArea = sqm(data.commercial_area);
  const needsStatus = residentialArea > 0;

  // Instant preview — recomputed on every keystroke, purely client-side.
  const preview = useMemo(
    () =>
      calculateFee({
        landArea,
        projectStatus: data.project_status,
        residentialArea,
        commercialArea,
      }),
    [landArea, data.project_status, residentialArea, commercialArea],
  );

  const canSubmit = landArea > 0 && (!needsStatus || data.project_status !== '');

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('fee-calculator.store'));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Head title="Registration Fee Calculator" />

      <header className="border-b border-gray-200 bg-[#085484]">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6">
          <h1 className="text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">
            Registration Fee Calculator
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Fee structure reference */}
        <section className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm sm:mb-8">
          <div className="border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
            <h2 className="text-base font-semibold uppercase tracking-wide text-gray-800 sm:text-lg">
              Registration Fee for Projects
            </h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {FEE_STRUCTURE.map((row, i) => (
              <li key={row.category} className="flex gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gray-100 font-mono text-[11px] text-gray-500 sm:h-6 sm:w-6 sm:text-xs">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 sm:text-base">{row.category}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    {row.formula}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          {/* Form — left */}
          <form
            onSubmit={submit}
            className="space-y-5 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:space-y-6 sm:p-6"
          >
            <Field
              label="Total Land Area (in Sq. m.)"
              required
              error={errors.land_area}
            >
              <input
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                value={data.land_area}
                onChange={(e) => setData('land_area', e.target.value)}
                placeholder="e.g. 250"
                className={inputClass(!!errors.land_area)}
              />
            </Field>

            <Field
              label="Project Status"
              required={needsStatus}
              error={errors.project_status}
            >
              <select
                value={data.project_status}
                onChange={(e) => setData('project_status', e.target.value as ProjectStatus | '')}
                className={inputClass(!!errors.project_status)}
              >
                <option value="">Select status…</option>
                <option value="Ongoing">Ongoing</option>
                <option value="New">New</option>
              </select>
            </Field>

            <Field
              label="Built-up Area — Residential Use (in Sq. m.)"
              hint="As per Building Permit"
              error={errors.residential_area}
            >
              <input
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                value={data.residential_area}
                onChange={(e) => setData('residential_area', e.target.value)}
                placeholder="0"
                className={inputClass(!!errors.residential_area)}
              />
            </Field>

            <Field
              label="Built-up Area — Commercial / Other Use (in Sq. m.)"
              hint="As per Building Permit"
              error={errors.commercial_area}
            >
              <input
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                value={data.commercial_area}
                onChange={(e) => setData('commercial_area', e.target.value)}
                placeholder="0"
                className={inputClass(!!errors.commercial_area)}
              />
            </Field>


            {wasSuccessful && result && (
              <p className="text-xs text-emerald-700 sm:text-sm">
                Saved. Server-confirmed total: {inr.format(result.total_fee)}
              </p>
            )}

          
          </form>

          {/* Live ledger — right, result values right-aligned, sticks in view while the form scrolls */}
          <aside className="h-fit rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:sticky md:top-6">
            <p className="text-right font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
              Fee Breakdown
            </p>

            <dl className="mt-4 divide-y divide-dashed divide-gray-200 font-mono">
              <LedgerRow
                label={`Land Area — ${landArea || 0} sq.m. × ₹10`}
                value={preview.landFee}
              />
              <LedgerRow
                label={
                  residentialArea > 0
                    ? `Residential — ${residentialArea} sq.m. × ₹${data.project_status === 'New' ? 50 : 25}`
                    : 'Residential — none entered'
                }
                value={preview.residentialFee}
              />
              <LedgerRow
                label={
                  commercialArea > 0
                    ? `Commercial/Other — ${commercialArea} sq.m. × ₹100`
                    : 'Commercial/Other — none entered'
                }
                value={preview.commercialFee}
              />
            </dl>

            <div className="mt-4 flex flex-col items-end border-t-2 border-[#085484] pt-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
                Total Registration Fee
              </span>
              <span className="mt-1 break-all font-mono text-xl font-bold text-[#085484] sm:text-2xl">
                {landArea > 0 ? inr.format(preview.totalFee) : '—'}
              </span>
            </div>

            {needsStatus && data.project_status === '' && (
              <p className="mt-3 text-right text-xs text-amber-700">
                Select a Project Status to price the residential area.
              </p>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    'w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-800',
    'focus:outline-none focus:ring-2 focus:ring-[#085484]/40 focus:border-[#085484]',
    hasError ? 'border-red-400' : 'border-gray-300',
  ].join(' ');
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  );
}

function LedgerRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="py-2.5">
      <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
      <p className="mt-0.5 text-right text-sm tabular-nums text-gray-800 sm:text-base">
        {inr.format(value)}
      </p>
    </div>
  );
}

// Persistent layout: Inertia keeps AppLayout (Navbar, Footer, Lenis, toasts)
// mounted across visits instead of remounting it on every page change.
FeeCalculator.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;

export default FeeCalculator;