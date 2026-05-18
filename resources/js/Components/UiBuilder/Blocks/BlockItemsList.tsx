import React, { useState } from 'react'

export default function BlockItemsList() {
  return (
    <>
      <div className='px-4 py-12 md:px-6 lg:px-20'>
        <div className='mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
          <div className='hidden sm:block md:pr-8 lg:w-72' />
          <div className='hidden sm:block md:pr-8 lg:w-72' />
          <div className='hidden sm:block md:pr-8 lg:w-72' />
          <p className='mt-3 flex items-center justify-end text-right text-xs font-medium leading-3 text-gray-800 sm:mt-8 md:pr-8'>
            Sort by
            <svg
              className='ml-2'
              width={12}
              height={12}
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.22725 3.91475C2.44692 3.69508 2.80308 3.69508 3.02275 3.91475L6 6.892L8.97725 3.91475C9.19692 3.69508 9.55308 3.69508 9.77275 3.91475C9.99242 4.13442 9.99242 4.49058 9.77275 4.71025L6.39775 8.08525C6.17808 8.30492 5.82192 8.30492 5.60225 8.08525L2.22725 4.71025C2.00758 4.49058 2.00758 4.13442 2.22725 3.91475Z'
                fill='#242424'
              />
            </svg>
          </p>
        </div>
        <div className='mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          <div className='md:pr-8 lg:w-72'>
            <img
              src='https://tuk-cdn.s3.amazonaws.com/can-uploader/grid-1.png'
              alt='table image'
              className='w-full'
            />
            <p className='mt-3 text-sm font-medium leading-none text-gray-800'>Retro Lamp</p>
            <p className='mt-2 text-xs font-medium leading-3 text-gray-600'>From $340</p>
          </div>
          <div className='md:pr-8 lg:w-72'>
            <img
              src='https://tuk-cdn.s3.amazonaws.com/can-uploader/grid-2.png'
              alt='table image'
              className='w-full'
            />
            <p className='mt-3 text-sm font-medium leading-none text-gray-800'>Shell Collection</p>
            <p className='mt-2 text-xs font-medium leading-3 text-gray-600'>From $140</p>
          </div>
          <div className='md:pr-8 lg:w-72'>
            <img
              src='https://tuk-cdn.s3.amazonaws.com/can-uploader/grid-3.png'
              alt='table image'
              className='w-full'
            />
            <p className='mt-3 text-sm font-medium leading-none text-gray-800'>Elegant Pendant</p>
            <p className='mt-2 text-xs font-medium leading-3 text-gray-600'>From $240</p>
          </div>
          <div className='md:pr-8 lg:w-72'>
            <img
              src='https://tuk-cdn.s3.amazonaws.com/can-uploader/grid-4.png'
              alt='table image'
              className='w-full'
            />
            <p className='mt-3 text-sm font-medium leading-none text-gray-800'>Flowering Cactus</p>
            <p className='mt-2 text-xs font-medium leading-3 text-gray-600'>From $90</p>
          </div>
        </div>
      </div>
    </>
  )
}
