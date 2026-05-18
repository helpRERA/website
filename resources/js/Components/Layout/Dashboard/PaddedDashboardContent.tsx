import React from 'react'
import DashboardLayout from './DashboardLayout'

interface Properties {
  children: React.ReactNode
}

const PaddedDashboardContent = ({ children }: Properties) => {
  return (
    <DashboardLayout>
      <div className='mx-auto mt-4 flex w-11/12 flex-col p-1 2xl:w-10/12'>{children}</div>
    </DashboardLayout>
  )
}

export default PaddedDashboardContent
