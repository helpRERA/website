import { Slide } from 'pure-react-carousel'
import React from 'react'
import ModalSlideShow from '../../../ui/SlideShow/ModalSlideShow'

interface Properties {
  images: { ID: number | null }[]
  setShowModal: (showModal: boolean) => void
  currentSlide: number
}

const ProjectImageSlideShow = ({ images, setShowModal, currentSlide }: Properties) => {
  return (
    <ModalSlideShow
      setShowModal={setShowModal}
      currentSlide={currentSlide}
      length={images.length}
    >
      <>
        {images.map((image, index) => {
          return (
            <Slide
              index={index}
              key={image.ID?.toString() + ' ' + index}
            >
              <div
                className='relative flex w-full flex-col items-center
                        justify-center gap-5 px-5'
              >
                <img
                  src={image.ID == null ? '/placeholder.png' : `/uploaded-images/${image.ID}`}
                  alt='image'
                  className='max-h-[75vh]'
                />
              </div>
            </Slide>
          )
        })}
      </>
    </ModalSlideShow>
  )
}

export default ProjectImageSlideShow
