import React from 'react'

const SearchButton = () => {
  return (
    <>
      <button
        type='submit'
        className='flex h-12 w-12  shrink-0 justify-center rounded bg-primary-700 text-primary-700 shadow-md'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 self-center'
          fill='none'
          viewBox='0 0 24 24'
          stroke='white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </button>
    </>
  )
}

export default SearchButton
