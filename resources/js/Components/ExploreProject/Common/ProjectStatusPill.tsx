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
        <span className='flex justify-center rounded-full bg-gray-500 px-2 py-1 text-sm text-white'>
          In Progress
        </span>
      )}
      {!completed && passedProposedDate && (
        <span className='flex justify-center rounded-full bg-gray-500 px-2 py-1 text-sm text-white'>
          Schedule Expired
        </span>
      )}
      {completed && (
        <span className='flex justify-center rounded-full bg-green-500 px-2 py-1 text-sm'>
          Completed
        </span>
      )}
    </>
  )
}

export default ProjectStatusPill
