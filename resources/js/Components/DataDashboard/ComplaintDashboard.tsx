import { useState } from 'react'
import { router } from '@inertiajs/react'

interface ComplaintYear {
  year: string
  count: number
}

interface ComplaintType {
  type: string
  count: number
}

interface ComplaintSource {
  source: string
  count: number
}

interface ComplaintItem {
  id: string | number
  complaintId: string | number
  complaintNo: string
  complaintYear: string
  complainantName: string
  respondentName: string
  projectName: string
  rulingByMaharera: number
  judgementByOfficer: number
  rulingDate: string | null
  interiumOrder: number
  finalOrder: number
  type: string
  tableName: string
  division: string
}

interface ComplaintDashboardData {
  total: number
  byYear: ComplaintYear[]
  byType: ComplaintType[]
  bySource: ComplaintSource[]
  finalOrders: number
  interimOrders: number
  recent: ComplaintItem[]
  selectedYear: string | null
}

interface Props {
  complaintsCount: number
  complaintDashboard: ComplaintDashboardData
}

export default function ComplaintDashboard({
  complaintsCount,
  complaintDashboard,
}: Readonly<Props>) {

  const [selectedYear, setSelectedYear] = useState(
    complaintDashboard.selectedYear ?? ''
  )
  const [loading, setLoading] = useState(false)

  const applyYearFilter = (year: string) => {
    setSelectedYear(year)
    setLoading(true)

    router.reload({
      data: { year: year || undefined },
      only: ['complaintDashboard'], 
      onFinish: () => setLoading(false),
    })
  }

  const maxYearCount = Math.max(
    ...complaintDashboard.byYear.map((item) => item.count),
    1
  )

  const maxTypeCount = Math.max(
    ...complaintDashboard.byType.map((item) => item.count),
    1
  )

  const maxSourceCount = Math.max(
    ...complaintDashboard.bySource.map((item) => item.count),
    1
  )

  return (
    <div className='w-full'>

      {/* HEADER */}
      <div className='mb-8 rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
        <h2
          className='text-[#085484] font-medium text-xl md:text-[27px]'
          style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 500 }}
        >
          Complaint Dashboard
        </h2>
        <p className='mt-2 text-sm text-gray-500'>
          Complaint statistics and analysis
        </p>
      </div>

      {/* FILTER */}
      <div className='mb-8 rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
        <h2
          className='mb-6 text-[#085484] font-medium text-xl'
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          Complaint Filters
        </h2>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-col'>
            <label className='mb-2 text-sm font-medium text-[#0463A0]'>
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => applyYearFilter(e.target.value)}
              disabled={loading}
              className='w-full h-[42px] rounded-lg border border-gray-300 bg-white p-2.5 text-sm focus:border-[#0463A0] focus:outline-none focus:ring-1 focus:ring-[#0463A0] disabled:opacity-60'
            >
              <option value=''>All Years</option>
              {complaintDashboard.byYear.map((item) => (
                <option key={item.year} value={item.year}>
                  {item.year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='mt-6'>
          <button
            type='button'
            onClick={() => applyYearFilter('')}
            disabled={loading}
            className='rounded-md border border-[#0463A0] bg-white px-8 py-2 text-sm font-semibold text-[#0463A0] hover:bg-gray-50 disabled:opacity-60'
          >
            Reset
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className='mb-8'>
        <h2
          className='mb-4 text-[#085484] font-medium text-lg md:text-[22px]'
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          Complaint Summary
        </h2>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-col justify-center rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
            <div className='mb-4'>
              <img src='/svg/complaintsfiled.svg' alt='Total Complaints' className='h-7 w-7 object-contain' />
            </div>
            <h3 className='text-3xl font-bold text-gray-800'>
              {complaintDashboard.total}
            </h3>
            <p className='text-sm text-gray-500'>Total Complaints</p>
          </div>

          <div className='flex flex-col justify-center rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
            <div className='mb-4'>
              <div className='h-7 w-7 rounded-full bg-blue-100'></div>
            </div>
            <h3 className='text-3xl font-bold text-gray-800'>
              {complaintDashboard.byType[0]?.count ?? 0}
            </h3>
            <p className='text-sm text-gray-500'>K-RERA Authority Rulings</p>
          </div>

          <div className='flex flex-col justify-center rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
            <div className='mb-4'>
              <div className='h-7 w-7 rounded-full bg-purple-100'></div>
            </div>
            <h3 className='text-3xl font-bold text-gray-800'>
              {complaintDashboard.byType[1]?.count ?? 0}
            </h3>
            <p className='text-sm text-gray-500'>Adjudicating Officer Judgements</p>
          </div>

          <div className='flex flex-col justify-center rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
            <div className='mb-4'>
              <div className='h-7 w-7 rounded-full bg-green-100'></div>
            </div>
            <h3 className='text-3xl font-bold text-gray-800'>
              {complaintDashboard.finalOrders}
            </h3>
            <p className='text-sm text-gray-500'>Final Orders</p>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>

        <div className='rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
          <h2
            className='mb-6 text-[#085484] font-semibold text-lg md:text-[22px]'
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            Complaints by Year
          </h2>

          <div className='space-y-4'>
            {complaintDashboard.byYear.map((item) => (
              <div key={item.year}>
                <div className='mb-1 flex justify-between text-sm'>
                  <span className='font-medium text-gray-600'>{item.year}</span>
                  <span className='font-semibold text-[#0463A0]'>{item.count}</span>
                </div>
                <div className='h-3 w-full overflow-hidden rounded-full bg-gray-100'>
                  <div
                    className='h-full rounded-full bg-[#0463A0]'
                    style={{ width: `${(item.count / maxYearCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
          <h2
            className='mb-6 text-[#085484] font-semibold text-lg md:text-[22px]'
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            Complaints by Ruling Type
          </h2>

          <div className='space-y-6'>
            {complaintDashboard.byType.map((item) => (
              <div key={item.type}>
                <div className='mb-2 flex justify-between'>
                  <span className='text-sm font-medium text-gray-600'>{item.type}</span>
                  <span className='font-bold text-[#0463A0]'>{item.count}</span>
                </div>
                <div className='h-4 overflow-hidden rounded-full bg-gray-100'>
                  <div
                    className='h-full rounded-full bg-[#085484]'
                    style={{ width: `${(item.count / maxTypeCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SOURCE */}
      <div className='mt-6 rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
        <h2
          className='mb-6 text-[#085484] font-semibold text-lg md:text-[22px]'
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          Complaints by Source
        </h2>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {complaintDashboard.bySource.map((item) => (
            <div key={item.source} className='rounded-xl border border-gray-100 bg-gray-50 p-5'>
              <p className='text-sm text-gray-500'>{item.source}</p>
              <h3 className='mt-2 text-3xl font-bold text-[#0463A0]'>{item.count}</h3>
              <div className='mt-4 h-2 overflow-hidden rounded-full bg-gray-200'>
                <div
                  className='h-full rounded-full bg-[#0463A0]'
                  style={{ width: `${(item.count / maxSourceCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ORDERS */}
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
          <p className='text-sm text-gray-500'>Complaints with Interim Orders</p>
          <h3 className='mt-2 text-4xl font-bold text-[#0463A0]'>
            {complaintDashboard.interimOrders}
          </h3>
        </div>

        <div className='rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
          <p className='text-sm text-gray-500'>Complaints with Final Orders</p>
          <h3 className='mt-2 text-4xl font-bold text-[#0463A0]'>
            {complaintDashboard.finalOrders}
          </h3>
        </div>
      </div>

      {/* RECENT COMPLAINTS */}
      <div className='mt-6 rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
        <div className='mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
          <h2
            className='text-[#085484] font-semibold text-lg md:text-[22px]'
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            Recent Complaints
          </h2>
          <a href='/complaint-list' className='text-sm font-semibold text-[#0463A0] hover:underline'>
            View All Complaints
          </a>
        </div>

        <div className='overflow-x-auto'>
          <table className={`w-full min-w-[900px] text-sm transition-opacity ${loading ? 'opacity-50' : ''}`}>
            <thead>
              <tr className='border-b border-gray-200 text-left'>
                <th className='px-4 py-3 font-semibold text-gray-600'>Complaint No.</th>
                <th className='px-4 py-3 font-semibold text-gray-600'>Year</th>
                <th className='px-4 py-3 font-semibold text-gray-600'>Complainant</th>
                <th className='px-4 py-3 font-semibold text-gray-600'>Respondent</th>
                <th className='px-4 py-3 font-semibold text-gray-600'>Project</th>
                <th className='px-4 py-3 font-semibold text-gray-600'>Type</th>
              </tr>
            </thead>
            <tbody>
              {complaintDashboard.recent.length > 0 ? (
                complaintDashboard.recent.map((complaint) => (
                  <tr
                    key={`${complaint.id}-${complaint.complaintId}`}
                    className='border-b border-gray-100 hover:bg-gray-50'
                  >
                    <td className='px-4 py-3 font-medium text-[#0463A0]'>{complaint.complaintNo}</td>
                    <td className='px-4 py-3 text-gray-600'>{complaint.complaintYear}</td>
                    <td className='px-4 py-3 text-gray-600'>{complaint.complainantName || '-'}</td>
                    <td className='px-4 py-3 text-gray-600'>{complaint.respondentName || '-'}</td>
                    <td className='px-4 py-3 text-gray-600'>{complaint.projectName || '-'}</td>
                    <td className='px-4 py-3'>
                      {complaint.rulingByMaharera === 1 ? (
                        <span className='inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700'>
                          K-RERA
                        </span>
                      ) : complaint.judgementByOfficer === 1 ? (
                        <span className='inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700'>
                          Adjudicating Officer
                        </span>
                      ) : (
                        <span className='inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600'>
                          Other
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className='px-4 py-10 text-center text-gray-400'>
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}