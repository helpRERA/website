import React from 'react'

interface Props {
  url: string
  setShowModal: (value: boolean) => unknown
}

const LightBox = ({ url, setShowModal }: Props) => {
  return (
    <div className='modal'>
      <div
        className='absolute right-0 top-0 p-5 cursor-pointer hover:bg-gray-700
                        text-white z-30'
        onClick={() => setShowModal(false)}
      >
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
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </div>
      <div className='flex relative w-full h-screen justify-center items-center px-5'>
        <img
          src={url}
          alt='image'
          className='max-w-full h-auto max-h-[75vh]'
        />
      </div>
    </div>
  )
}

export default LightBox
