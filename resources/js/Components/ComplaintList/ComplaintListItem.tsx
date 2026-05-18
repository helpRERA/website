import { Complaint } from '../../Pages/ComplaintList/ComplaintListPage'
import React from 'react'

interface Properties {
  complaint: Complaint
  setComplaint: React.Dispatch<React.SetStateAction<Complaint | null>>
}

const ComplaintListItem = ({ complaint, setComplaint }: Properties) => {
  return (
    <tr
      className='standard-tr'
      key={complaint.SrNo}
    >
      <td className='standard-td'>{complaint.ComplaintNo}</td>
      <td className='standard-td'>{complaint.ComplainantName}</td>
      <td className='standard-td'>{complaint.RespondentName}</td>
      <td className='standard-td'>{complaint.ProjectName}</td>
      <td className='standard-td'>
        {complaint.InteriumOrder == '1' ? 'Interim Order ' : ''}
        {complaint.FinalOrder == '1' ? 'Final Order' : ''}
        {complaint.FinalOrder != '1' && complaint.InteriumOrder != '1' && '_'}
      </td>
      <td className='standard-td grid grid-cols-2 gap-1'>
        {complaint.Tbl_Name === 'AlreadyRegisteredComplaints' && (
          <button
            className=' '
            onClick={() => setComplaint(complaint)}
          >
            <img
              src='/dashboard-svgs/more.svg'
              alt='More'
              className='h-auto w-10 hover:opacity-60'
            />
          </button>
        )}
        {(complaint.InteriumOrder === '1' || complaint.FinalOrder === '1') &&
          complaint.Tbl_Name === 'AlreadyRegisteredComplaints' && (
            <a
              href={`/complaint-file/${complaint.ComplaintNo}/${complaint.ComplainantName}`}
              target='_blank'
              rel='noreferrer'
              className='link'
            >
              <img
                src='/dashboard-svgs/doc.svg'
                alt='document'
                className='h-auto w-10 hover:opacity-60'
              />
            </a>
          )}
        {(complaint.InteriumOrder === '1' || complaint.FinalOrder === '1') &&
          complaint.Tbl_Name === 'RegisteredAppeal' && (
            <a
              href={`/appeal-file/${complaint.ID}`}
              target='_blank'
              rel='noreferrer'
              className='link'
            >
              <img
                src='/dashboard-svgs/doc.svg'
                alt='document'
                className='h-auto w-10 hover:scale-125'
              />
            </a>
          )}
      </td>
    </tr>
  )
}

export default ComplaintListItem
