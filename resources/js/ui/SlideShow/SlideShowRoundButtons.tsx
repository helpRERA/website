import { ButtonBack, ButtonNext, CarouselProvider, DotGroup, Slider } from 'pure-react-carousel'
import { useMemo } from 'react'

interface Properties {
  totalSlides: number
  visibleSlides: number
  currentSlide: number
  children: JSX.Element[] | JSX.Element
  isPlaying?: boolean
  interval?: number
  infinite?: boolean
}

const SlideShowRoundButtons = ({
  totalSlides,
  visibleSlides,
  currentSlide,
  children,
  isPlaying = false,
  infinite = false,
  interval = 3000,
}: Properties) => {
  const shouldBePlaying = useMemo(() => {
    if (!isPlaying) {
      return false
    }
    return totalSlides > visibleSlides
  }, [isPlaying, visibleSlides, totalSlides])

  return (
    <div className='relative flex w-full'>
      <CarouselProvider
        className='flex w-full items-center justify-center'
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        isIntrinsicHeight={true}
        totalSlides={totalSlides}
        visibleSlides={visibleSlides}
        step={visibleSlides}
        currentSlide={currentSlide}
        isPlaying={shouldBePlaying}
        interval={interval}
        infinite={infinite}
      >
        <ButtonBack
          role='button'
          aria-label='slide backward'
          className='absolute left-2 z-10 flex cursor-pointer items-center justify-center rounded-full bg-gray-50 p-4
                 shadow hover:bg-gray-200 focus:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
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
        <div className='mx-auto h-full w-full overflow-x-hidden overflow-y-hidden'>
          <Slider>
            <div
              id='slider'
              className='flex h-full w-full items-center justify-start transition duration-700 ease-out'
            >
              {children}
            </div>
          </Slider>
          <DotGroup className='mt-5 flex flex-wrap justify-center gap-2' />
        </div>
        <ButtonNext
          role='button'
          aria-label='slide forward'
          className='absolute right-2 z-10 flex cursor-pointer items-center justify-center rounded-full bg-gray-50 p-4
                 shadow hover:bg-gray-200 focus:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
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
  )
}

export default SlideShowRoundButtons
