import { ButtonBack, ButtonNext, CarouselProvider, Slider } from 'pure-react-carousel'
import React from 'react'

interface Properties {
  length: number
  currentSlide: number
  children: React.ReactNode
  setShowModal: (value: boolean) => void
}

const ModalSlideShow = ({ children, length, setShowModal, currentSlide }: Properties) => {
  return (
    <div className='modal'>
      <div
        className='absolute right-0 top-0 z-30 cursor-pointer p-5
                        text-white hover:bg-gray-700'
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

      <div className='relative mx-auto h-full w-full'>
        <CarouselProvider
          className='flex h-full w-full items-center justify-center'
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          isIntrinsicHeight={true}
          totalSlides={length}
          visibleSlides={1}
          step={1}
          currentSlide={currentSlide}
          infinite={true}
        >
          <ButtonBack
            role='button'
            aria-label='slide backward'
            className='absolute left-0 z-30 ml-8 flex h-12 w-12
                  cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-400
                  focus:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
            id='prev'
          >
            <svg
              width={8}
              height={14}
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7 1L1 7L7 13'
                stroke='black'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </ButtonBack>
          <div className='mx-auto  w-full overflow-x-hidden overflow-y-hidden'>
            <Slider>
              <div
                id='slider'
                className='flex w-full items-center
                                                justify-start transition duration-700 ease-out'
              >
                {children}
              </div>
            </Slider>
          </div>
          <ButtonNext
            role='button'
            aria-label='slide forward'
            className='absolute right-0 z-30 mr-8 flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2'
            id='next'
          >
            <svg
              width={8}
              height={14}
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 1L7 7L1 13'
                stroke='black'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </ButtonNext>
        </CarouselProvider>
      </div>
    </div>
  )
}

export default ModalSlideShow
