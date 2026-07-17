import { router } from '@inertiajs/react'
import React, { FormEvent, useEffect, useState } from 'react'
import useCustomForm from '../../hooks/useCustomForm'
import { Complaint } from '../../Pages/ComplaintList/ComplaintListPage'
import Button from '../../ui/button/Button'
import Input from '../../ui/form/Input'
import Pagination from '../../ui/table/Pagination'
import Table from '../../ui/table/Table'
import { Paginator } from '../../ui/ui_interfaces'
import FullSpinnerWrapper from '../../ui/FullSpinnerWrapper'
import ComplaintListItem from './ComplaintListItem'
import SelectList from '../../ui/form/SelectList'
import Modal from '../../ui/modal/Modal'
import ComplaintMoreInfo from './ComplaintMoreInfo'
import { ReliefSought } from '../../DataStructures/krera_interfaces'

const heads = [
  'Complaint No',
  'Complainant Name',
  'Respondent Name',
  'Project Name',
  'Order Detail',
  '',
]

const rulingTypes = [
  { value: 'Rulings of K-RERA Authority' },
  { value: 'Judgements by Adjudicating Officers' },
]

const sort = [{ value: 'newest' }, { value: 'oldest' }]

const ComplaintList = ({
  complaints,
  oldSearch,
  oldRulingBy,
  oldSort,
  reliefSought,
}: {
  complaints: Paginator<Complaint>
  oldSearch: string
  oldRulingBy: string
  oldSort: string
  reliefSought: ReliefSought[]
}) => {
  const [processing, setProcessing] = useState(false)
  const { form, setFormValue, setAll } = useCustomForm({
    search: '',
    ruling_by: 'Rulings of K-RERA Authority',
    sort: '',
  })

  useEffect(() => {
    setAll({
      search: oldSearch,
      ruling_by: oldRulingBy,
      sort: oldSort,
    })
  }, [oldSearch, setAll, oldRulingBy, oldSort])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProcessing(true)
    router.get(
      `/complaint-list?search=${form.search}&ruling_by=${form.ruling_by}&sort=${form.sort}`,
      {},
      {
        onFinish: () => setProcessing(false),
      }
    )
  }

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)

  return (
    <div className='w-full'>
      {/* Search Card */}
      <div className='w-full rounded-[14px] bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 mb-8 relative z-30'>
        <h2 className='text-[20px] font-medium text-[#085484] mb-6' style={{ fontFamily: "'Urbanist', sans-serif" }}>
          Browse for Complaints
        </h2>
        <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-8 items-start w-full'>
          <div className='flex w-full flex-col md:w-[65%] gap-2'>
            <label className='text-[#085484] text-[13px] font-medium tracking-wide'>
              Complaint No. / Respondent Name / Project Name / Year
            </label>
            <input
              type='text'
              placeholder='Enter Complaint No. / Respondent Name / Project Name / Year'
              value={form.search}
              onChange={(e) => setFormValue('search')(e.target.value)}
              className='bg-white rounded-md border border-gray-200 py-2.5 px-4 text-[13px] text-gray-800 focus:border-[#085484] focus:ring-1 focus:ring-[#085484] outline-none w-full'
            />
            <div className='mt-3 flex gap-3'>
              <button type='submit' className='bg-[#085484] text-white px-10 py-2.5 rounded-md font-medium text-[13px] hover:bg-[#063e63] transition-colors'>
                Search
              </button>
              <button 
                type='button' 
                onClick={() => {
                  setAll({ search: '', ruling_by: 'Rulings of K-RERA Authority', sort: '' });
                  setTimeout(() => {
                    router.get(`/complaint-list?search=&ruling_by=Rulings of K-RERA Authority&sort=`);
                  }, 100);
                }} 
                className='bg-white text-gray-600 border border-gray-300 px-10 py-2.5 rounded-md font-medium text-[13px] hover:bg-gray-50 transition-colors'
              >
                Reset
              </button>
            </div>
          </div>
          
          <div className='flex w-full flex-col md:w-[35%] gap-2'>
            <label className='text-[#085484] text-[13px] font-medium tracking-wide'>
              Judgement / Orders By
            </label>
            <div className='relative w-full'>
              <select 
                value={form.ruling_by}
                onChange={(e) => setFormValue('ruling_by')(e.target.value)}
                className='bg-white rounded-md border border-gray-200 py-2.5 px-4 text-[13px] text-gray-800 focus:border-[#085484] focus:ring-1 focus:ring-[#085484] outline-none w-full'
              >
                {rulingTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.value}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>

      <FullSpinnerWrapper processing={processing}>
        {/* Results Info & Sort */}
        {complaints.data.length > 0 && (
          <div className='flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 mt-6'>
            <div className='text-[13px] text-gray-500 font-medium tracking-wide'>
              Showing Results for {complaints.from}-{complaints.to} of {complaints.total} complaints
            </div>
            <div className='flex items-center gap-3'>
              <span className='text-[13px] text-gray-600 font-medium'>Sort By:</span>
              <div className='w-[140px] relative'>
                <select 
                  value={form.sort}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormValue('sort')(val);
                    setTimeout(() => {
                       router.get(`/complaint-list?search=${form.search}&ruling_by=${form.ruling_by}&sort=${val}`);
                    }, 100);
                  }}
                  className='bg-white rounded-full border border-gray-300 py-1.5 px-4 text-[12.5px] text-gray-700 hover:border-gray-400 focus:border-[#085484] outline-none w-full appearance-none'
                >
                  <option value=''>Select Order</option>
                  <option value='Newest'>Newest</option>
                  <option value='Oldest'>Oldest</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'>
                  <svg className='h-3.5 w-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' /></svg>
                </div>
              </div>
            </div>
          </div>
        )}  
          <div className='flex flex-col gap-6'>
            {complaints.data?.map((complaint) => {
              return (
                <ComplaintListItem
                  complaint={complaint}
                  key={complaint.ComplaintNo}
                  setComplaint={setSelectedComplaint}
                />
              )
            })}
          </div>
        
        <div className='my-10 flex justify-center'>
          <Pagination pagination={complaints} />
        </div>
        
        {selectedComplaint != null && (
          <Modal
            setShowModal={() => setSelectedComplaint(null)}
            title={`Complaint No: ${selectedComplaint.ComplaintNo}`}
          >
            <ComplaintMoreInfo
              complaintId={selectedComplaint.ID}
              reliefSought={reliefSought}
            />
          </Modal>
        )}
      </FullSpinnerWrapper>
    </div>
  )
}

export default ComplaintList
