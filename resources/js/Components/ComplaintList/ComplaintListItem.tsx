import { Complaint } from '../../Pages/ComplaintList/ComplaintListPage'
import React from 'react'

interface Properties {
  complaint: Complaint
  setComplaint: React.Dispatch<React.SetStateAction<Complaint | null>>
}

const ComplaintListItem = ({ complaint, setComplaint }: Properties) => {
  return (
    <div className='flex flex-col md:flex-row bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden w-full relative pl-2 hover:shadow-md transition-shadow'>
      <div className='absolute left-0 top-0 bottom-0 w-2.5 bg-[#085484] rounded-l-[20px]'></div>
      <div className='flex flex-col md:flex-row w-full p-6 lg:p-8 items-center'>
        
        {/* Col 1: Complaint Number & Project Name */}
        <div className='flex flex-col gap-6 w-full md:w-[23%] shrink-0 border-r border-gray-100/80 pr-6'>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2 text-[#085484] font-medium text-[13.5px]'>
              <svg className='w-4 h-4 opacity-90' fill='currentColor' viewBox='0 0 24 24'><path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'/></svg>
              Complaint Number
            </div>
            <span className='text-[13px] text-gray-600 ml-6'>{complaint.ComplaintNo}</span>
          </div>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2 text-[#085484] font-medium text-[13.5px]'>
              <svg className='w-4 h-4 opacity-90' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2L2 22h20L12 2zm0 3.82L17.28 17H6.72L12 5.82z'/></svg>
              Project Name
            </div>
            <span className='text-[13px] text-gray-600 ml-6'>{complaint.ProjectName || '-'}</span>
          </div>
        </div>

        {/* Col 2: Complainant Name & Respondent Name */}
        <div className='flex flex-col gap-6 w-full md:w-[32%] shrink-0 border-r border-gray-100/80 px-6'>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2 text-[#085484] font-medium text-[13.5px]'>
              <svg className='w-4 h-4 opacity-90' fill='currentColor' viewBox='0 0 24 24'><path d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/></svg>
              Complainant Name
            </div>
            <span className='text-[13px] text-gray-600 ml-6'>{complaint.ComplainantName || '-'}</span>
          </div>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2 text-[#085484] font-medium text-[13.5px]'>
              <svg className='w-4 h-4 opacity-90' fill='currentColor' viewBox='0 0 24 24'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>
              Respondent Name
            </div>
            <span className='text-[13px] text-gray-600 ml-6'>{complaint.RespondentName || '-'}</span>
          </div>
        </div>

        {/* Col 3: Orders */}
        <div className='flex flex-col gap-3 w-full md:w-[15%] shrink-0 border-r border-gray-100/80 px-6'>
          <div className='flex items-center gap-2 text-[#085484] font-medium text-[13.5px]'>
            <svg className='w-4 h-4 opacity-90' fill='currentColor' viewBox='0 0 24 24'><path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'/></svg>
            Orders
          </div>
          <div className='flex flex-col gap-2 ml-1'>
            {complaint.InteriumOrder === '1' && (
              <a href={complaint.Tbl_Name === 'RegisteredAppeal' ? `/appeal-file/${complaint.ID}` : `/complaint-file/${complaint.ComplaintNo}/${complaint.ComplainantName}`} target='_blank' rel='noreferrer' className='flex items-center justify-between border border-gray-200 rounded-full px-3 py-1.5 text-[11.5px] text-gray-600 hover:bg-gray-50 hover:text-[#085484] transition-colors w-full'>
                <span>Interim order</span>
                <svg className='w-3.5 h-3.5 text-[#085484]' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'/></svg>
              </a>
            )}
            {complaint.FinalOrder === '1' && (
              <a href={complaint.Tbl_Name === 'RegisteredAppeal' ? `/appeal-file/${complaint.ID}` : `/complaint-file/${complaint.ComplaintNo}/${complaint.ComplainantName}`} target='_blank' rel='noreferrer' className='flex items-center justify-between border border-gray-200 rounded-full px-3 py-1.5 text-[11.5px] text-gray-600 hover:bg-gray-50 hover:text-[#085484] transition-colors w-full'>
                <span>Final order</span>
                <svg className='w-3.5 h-3.5 text-[#085484]' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'/></svg>
              </a>
            )}
            {complaint.InteriumOrder !== '1' && complaint.FinalOrder !== '1' && (
              <span className='text-[12px] text-gray-400'>Not Available</span>
            )}
          </div>
        </div>

        {/* Col 4: Status */}
        <div className='flex justify-center w-full md:w-[15%] shrink-0 border-r border-gray-100/80 px-6'>
          {complaint.FinalOrder === '1' ? (
             <span className='bg-[#e3fbe3] text-[#2c982c] px-6 py-2 rounded-full text-[12px] font-medium min-w-[90px] text-center'>Closed</span>
          ) : (
             <span className='bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-[12px] font-medium min-w-[90px] text-center'>Pending</span>
          )}
        </div>

        {/* Col 5: Actions */}
        <div className='flex flex-col gap-3 w-full md:w-[15%] px-6 shrink-0'>
          {complaint.Tbl_Name === 'AlreadyRegisteredComplaints' && (
            <button
              className='w-full bg-[#085484] text-white px-4 py-2.5 rounded-[8px] text-[12.5px] font-medium hover:bg-[#063e63] transition-colors text-center'
              onClick={() => setComplaint(complaint)}
            >
              View Details
            </button>
          )}
          {complaint.ProjectName && complaint.ProjectName !== '' && (
            <button className='w-full border border-[#085484]/40 text-[#085484] bg-white px-4 py-2.5 rounded-[8px] text-[12.5px] font-medium hover:bg-[#f6f9fc] transition-colors text-center shadow-sm'>
              View Project
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default ComplaintListItem
