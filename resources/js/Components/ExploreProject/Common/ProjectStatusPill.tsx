import React, { useMemo } from 'react'
import dayjs from 'dayjs'

interface Properties {
  completed: boolean
  proposedDate: string | null
  today: string
}

const ProjectStatusPill = ({ completed, proposedDate, today }: Properties) => {
  const passedProposedDate = useMemo(() => {
    if (proposedDate == null) {
      return false
    }
    return dayjs(proposedDate).isBefore(dayjs(today))
  }, [proposedDate, today])

  return (
    <>
      {!completed && !passedProposedDate && (
        <span className='inline-flex items-center justify-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-600'>
          In Progress
        </span>
      )}
      {!completed && passedProposedDate && (
        <span className='inline-flex items-center justify-center rounded-full bg-red-50 px-4 py-1.5 text-xs font-medium text-red-600'>
          Schedule Expired
        </span>
      )}
      {completed && (
        <span className='inline-flex items-center justify-center rounded-full bg-green-50 px-4 py-1.5 text-xs font-medium text-green-600'>
          Completed
        </span>
      )}
    </>
  )
}

export default ProjectStatusPill
