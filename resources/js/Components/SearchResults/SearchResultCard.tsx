import React from 'react'

const SearchResultCard = () => {
  return (
    <>
      <div className='flex flex-col gap-5 bg-neutral-500 py-4 px-5 '>
        <div className='text-lg font-semibold md:text-xl lg:text-2xl '>Page Title</div>
        <div className='flex flex-col gap-5 md:flex-row md:gap-10'>
          <span className='md:text-lg'>
            Type: <b>Orders & Notifications</b>
          </span>
          <span className='md:text-lg'>
            Published on:<b> ##/##/##</b>
          </span>
        </div>
        <div className='md:text-lg lg:w-5/6'>
          « Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
          corporis suscipit laboriosam ...........
        </div>
      </div>
    </>
  )
}

export default SearchResultCard
