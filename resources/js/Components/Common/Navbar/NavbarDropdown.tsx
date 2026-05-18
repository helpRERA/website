import React from 'react'

const NavbarDropdown = () => {
  return (
    <nav
      className='bg-primary sticky top-0 z-[999] mx-auto hidden h-14 w-full flex-col
     items-center justify-center px-6 text-white shadow md:flex  lg:flex'
    >
      <div className='flex w-full items-center justify-end'>
        <button className='mr-auto self-center rounded-2xl px-3 py-2 transition duration-300 ease-in hover:bg-indigo-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
            />
          </svg>
        </button>
        <button
          className='relative mx-10 flex h-full cursor-pointer
            items-center rounded-2xl border-b-2 border-transparent px-3  py-2 text-xs uppercase tracking-normal transition duration-300
            ease-in hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none '
        >
          About k-rera
          <span className='ml-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-chevron-down'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path
                stroke='none'
                d='M0 0h24v24H0z'
              />
              <polyline points='6 9 12 15 18 9' />
            </svg>
          </span>
        </button>
        <button
          className='relative mx-10 flex h-full cursor-pointer
                   items-center rounded-2xl border-b-2 border-transparent px-3  py-2 text-xs uppercase tracking-normal transition duration-300 ease-in hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none'
        >
          public corner
          <span className='ml-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-chevron-down'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path
                stroke='none'
                d='M0 0h24v24H0z'
              />
              <polyline points='6 9 12 15 18 9' />
            </svg>
          </span>
        </button>
        <button
          className='relative mx-10 flex h-full cursor-pointer
        items-center rounded-2xl border-b-2 border-transparent px-3  py-2 text-xs uppercase tracking-normal transition duration-300 ease-in hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none'
        >
          filing complaints
          <span className='ml-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-chevron-down'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path
                stroke='none'
                d='M0 0h24v24H0z'
              />
              <polyline points='6 9 12 15 18 9' />
            </svg>
          </span>
        </button>
        <button
          className='relative flex h-full cursor-pointer items-center
        rounded-2xl border-b-2 border-transparent px-3 py-2  text-xs uppercase tracking-normal transition duration-300 ease-in hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none'
        >
          promoters & agents corner
          <span className='ml-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-chevron-down'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path
                stroke='none'
                d='M0 0h24v24H0z'
              />
              <polyline points='6 9 12 15 18 9' />
            </svg>
          </span>
        </button>
      </div>
    </nav>
  )
}

export default NavbarDropdown
