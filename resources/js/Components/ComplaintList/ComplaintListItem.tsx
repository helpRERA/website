import { Complaint } from '../../Pages/ComplaintList/ComplaintListPage'
import React from 'react'

interface Properties {
  complaint: Complaint
  setComplaint: React.Dispatch<React.SetStateAction<Complaint | null>>
}

const ComplaintListItem = ({ complaint, setComplaint }: Properties) => {
  return (
    <div className='flex flex-col md:flex-row bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden w-full relative pl-1.5 md:pl-2 hover:shadow-md transition-shadow'>
      <div className='absolute left-0 top-0 bottom-0 w-1.5 md:w-2.5 bg-[#085484] rounded-l-[20px]'></div>
      <div className='flex flex-col md:flex-row w-full p-4 md:p-6 lg:p-8 items-start md:items-center gap-4 md:gap-0'>

        {/* Col 1: Complaint Number & Project Name */}
        <div className='flex flex-col gap-4 md:gap-6 w-full md:w-[23%] shrink-0 border-b md:border-b-0 md:border-r border-gray-100/80 pb-4 md:pb-0 md:pr-6'>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2 text-[#085484] font-normal text-[15px] md:text-[16px]' style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <img src="/svg/pronum.svg" alt="Complaint Number" className="w-[13px] h-[13px] shrink-0 object-contain" />
              Complaint Number
            </div>
            <span className='text-[#444444] text-[13px] md:text-[14px] font-normal ml-6' style={{ fontFamily: "'DM Sans', sans-serif" }}>{complaint.ComplaintNo}</span>
          </div>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2 text-[#085484] font-normal text-[15px] md:text-[16px]' style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <img src="/svg/projectname.svg" alt="Project Name" className="w-[13px] h-[13px] shrink-0 object-contain" />
              Project Name
            </div>
            <span className='text-[#444444] text-[13px] md:text-[14px] font-normal ml-6' style={{ fontFamily: "'DM Sans', sans-serif" }}>{complaint.ProjectName || '-'}</span>
          </div>
        </div>

        {/* Col 2: Complainant Name & Respondent Name */}
        <div className='flex flex-col gap-4 md:gap-6 w-full md:w-[32%] shrink-0 border-b md:border-b-0 md:border-r border-gray-100/80 pb-4 md:pb-0 md:px-6'>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2 text-[#085484] font-normal text-[15px] md:text-[16px]' style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <img src="/svg/comnanem.svg" alt="Complainant Name" className="w-[13px] h-[13px] shrink-0 object-contain" />
              Complainant Name
            </div>
            <span className='text-[#444444] text-[13px] md:text-[14px] font-normal ml-6 leading-relaxed' style={{ fontFamily: "'DM Sans', sans-serif" }}>{complaint.ComplainantName || '-'}</span>
          </div>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-2 text-[#085484] font-normal text-[15px] md:text-[16px]' style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <img src="/svg/respond.svg" alt="Respondent Name" className="w-[13px] h-[13px] shrink-0 object-contain" />
              Respondent Name
            </div>
            <span className='text-[#444444] text-[13px] md:text-[14px] font-normal ml-6 leading-relaxed' style={{ fontFamily: "'DM Sans', sans-serif" }}>{complaint.RespondentName || '-'}</span>
          </div>
        </div>

        {/* Col 3: Orders */}
        <div className='flex flex-col gap-3 w-full md:w-[15%] shrink-0 border-b md:border-b-0 md:border-r border-gray-100/80 pb-4 md:pb-0 md:px-6'>
          <div className='flex items-center gap-2 text-[#085484] font-normal text-[15px] md:text-[16px]' style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <img src="/svg/order1.svg" alt="Orders" className="w-[13px] h-[13px] shrink-0 object-contain" />
            Orders
          </div>
          <div className='flex flex-col gap-2 ml-6 md:ml-1'>
            {complaint.InteriumOrder === '1' && (
              <a href={complaint.Tbl_Name === 'RegisteredAppeal' ? `/appeal-file/${complaint.ID}` : `/complaint-file/${complaint.ComplaintNo}/${complaint.ComplainantName}`} target='_blank' rel='noreferrer' className='flex items-center justify-between border border-gray-200 rounded-full px-3 py-1.5 text-[11.5px] md:text-[12px] text-gray-600 hover:bg-gray-50 hover:text-[#085484] transition-colors w-full sm:w-[160px] md:w-full'>
                <span>Interim order</span>
                <svg className='w-3.5 h-3.5 text-[#085484]' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' /></svg>
              </a>
            )}
            {complaint.FinalOrder === '1' && (
              <a href={complaint.Tbl_Name === 'RegisteredAppeal' ? `/appeal-file/${complaint.ID}` : `/complaint-file/${complaint.ComplaintNo}/${complaint.ComplainantName}`} target='_blank' rel='noreferrer' className='flex items-center justify-between border border-gray-200 rounded-full px-3 py-1.5 text-[11.5px] md:text-[12px] text-gray-600 hover:bg-gray-50 hover:text-[#085484] transition-colors w-full sm:w-[160px] md:w-full'>
                <span>Final order</span>
                <svg className='w-3.5 h-3.5 text-[#085484]' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' /></svg>
              </a>
            )}
            {complaint.InteriumOrder !== '1' && complaint.FinalOrder !== '1' && (
              <span className='text-[12px] text-gray-400'>Not Available</span>
            )}
          </div>
        </div>

        {/* Col 4: Status */}
        <div className='flex justify-start md:justify-center w-full md:w-[15%] shrink-0 border-b md:border-b-0 md:border-r border-gray-100/80 pb-4 md:pb-0 md:px-6'>
          {complaint.FinalOrder === '1' ? (
            <span className='bg-[#e3fbe3] text-[#2c982c] px-6 py-2 rounded-full text-[12px] font-medium min-w-[90px] text-center'>Closed</span>
          ) : (
            <span className='bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-[12px] font-medium min-w-[90px] text-center'>Pending</span>
          )}
        </div>

        {/* Col 5: Actions */}
        <div className='flex flex-col gap-3 w-full md:w-[15%] md:px-6 shrink-0 mt-2 md:mt-0'>
          {complaint.Tbl_Name === 'AlreadyRegisteredComplaints' && (
            <button
              className='w-full bg-[#085484] text-white px-4 py-2.5 rounded-[8px] text-[12.5px] font-medium hover:bg-[#063e63] transition-colors text-center'
              onClick={() => setComplaint(complaint)}
            >
              View Details
            </button>
          )}
          {complaint.ProjectId && complaint.ProjectId !== '0' && (
          <a
            href = {`/projects/${complaint.ProjectId}?lang=en`}
            target='_blank'
            rel='noreferrer'
            className='w-full border border-[#085484]/40 text-[#085484] bg-white px-4 py-2.5 rounded-[8px] text-[12.5px] font-medium hover:bg-[#f6f9fc] transition-colors text-center shadow-sm'
          >
          View Project
        </a>
  )}
      </div>

    </div>
    </div >
  )
}

export default ComplaintListItem
