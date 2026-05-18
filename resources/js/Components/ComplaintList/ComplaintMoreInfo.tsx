import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { handleHttpErrors } from '../../ui/alerts'
import FullSpinnerWrapper from '../../ui/FullSpinnerWrapper'
import { getIndianDate } from '../../libs/dates'
import { ReliefSought } from '../../DataStructures/krera_interfaces'

interface Props {
  complaintId: string
  reliefSought: ReliefSought[]
}

interface ComplaintInfo {
  Row: string
  TotalCount: string
  AlreadyRegisteredComplaintsId: string
  Complainant: string
  ComplaintNo: string
  ProjRegNo: string
  ProjectName: string
  Respondent: string
  OrderTypeId: string
  OrderIsValue: string
  ComplaintYear: string
  DocumentName: string
  ComplaintType: string
  ComplaintTypeId: string
  OrderTypeValue: string | null
  Disposed: string
  DateofFiling: string
  BanchValueId: string
  ReliefSought: string | null
  Orderspassed: string | null
  RemarksStatus: string | null
  EpDetails: string | null
  AvailableReliefSought: string
  AvailableReliefSoughtId: string
  projectId: string
  AlreadyRegisteredProject: string
}

export default function ComplaintMoreInfo({ complaintId, reliefSought }: Props) {
  const [loading, setLoading] = useState(false)
  const [complaintInfo, setComplaintInfo] = useState<ComplaintInfo | null>(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get('/complaint-info?complaint_id=' + complaintId)
      .then((res) => {
        if (res.data.length > 0) {
          setComplaintInfo(res.data[0])
        }
      })
      .catch(handleHttpErrors)
      .finally(() => setLoading(false))
  }, [complaintId])

  const reliefs = useMemo(() => {
    if (
      complaintInfo == null ||
      complaintInfo.AvailableReliefSought == null ||
      complaintInfo.AvailableReliefSoughtId == null
    ) {
      return ''
    }

    const reliefs = complaintInfo.AvailableReliefSought.split(',')
    const ids = complaintInfo.AvailableReliefSoughtId.split(',')

    const result: string[] = []

    reliefSought.forEach((item) => {
      const idIndex = ids.findIndex((id) => id == item.Id.toString())
      if (idIndex === -1) {
        return
      }
      const isReliefSought = reliefs[idIndex] === 'true'
      if (isReliefSought) {
        result.push(item.Relief_Sought)
      }
    })

    return result.join(', ')
  }, [reliefSought, complaintInfo])

  return (
    <FullSpinnerWrapper processing={loading}>
      <div className='flex flex-col gap-2 p-2'>
        <div className='grid grid-cols-2 gap-2 p-2'>
          <div className='text-sm font-medium'>Project Reg No:</div>
          <div className='text-sm font-semibold'>{complaintInfo?.ProjRegNo}</div>

          <div className='text-sm font-medium'>Date Of Filing:</div>
          <div className='text-sm font-semibold'>{getIndianDate(complaintInfo?.DateofFiling)}</div>

          <div className='text-sm font-medium'>Order Type:</div>
          <div className='text-sm font-semibold'>{complaintInfo?.OrderTypeValue}</div>

          <div className='text-sm font-medium'>Order Passed:</div>
          <div className='text-sm font-semibold'>{complaintInfo?.Orderspassed}</div>

          <div className='text-sm font-medium'>Relief Sought:</div>
          <div className='text-sm font-semibold'>{reliefs}</div>

          <div className='text-sm font-medium'>Disposed:</div>
          <div className='text-sm font-semibold'>
            {complaintInfo?.Disposed === '1' ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    </FullSpinnerWrapper>
  )
}
