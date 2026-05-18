import React from 'react'

const headerWithBreadcrumbs = () => {
  return (
    <>
      <div className='border-4 bg-white py-6 lg:py-8'>
        <div className='container mx-auto flex flex-col items-start justify-between px-6 md:flex-row md:items-center'>
          <div>
            <p className='flex items-center text-xs text-black'>
              <span>Portal</span>
              <span className='mx-2'>&gt;</span>
              <span>Dashboard</span>
              <span className='mx-2'>&gt;</span>
              <span>KPIs</span>
            </p>
            <h4 className='text-2xl font-bold leading-tight text-black'>Dashboard</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default headerWithBreadcrumbs
