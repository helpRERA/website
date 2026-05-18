import { Slide } from 'pure-react-carousel'
import { useState } from 'react'
import { Album } from '../../DataStructures/data_interfaces'
import Localization from '../../ui/Localization'
import ModalSlideShow from '../../ui/SlideShow/ModalSlideShow'
import { Language } from '../../ui/ui_interfaces'

interface Properties {
  album: Album | null
  lang?: Language
}

const AlbumImages = ({ album, lang = 'en' }: Properties) => {
  const [currentSlide, setCurrentSlide] = useState<number | null>(null)

  return (
    <>
      <div className='mt-10 flex flex-col'>
        <p>
          <Localization
            text={{
              english: album?.description ?? '',
              malayalam: album?.description_malayalam ?? '',
            }}
            language={lang}
          />
        </p>
      </div>
      <div className='my-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-7 lg:grid-cols-4'>
        {album?.images?.map((image, index) => {
          return (
            <div
              className='group flex cursor-pointer flex-col gap-2'
              onClick={() => setCurrentSlide(index)}
              key={image.id.toString()}
            >
              <div className='container-square group-hover:shadow-lg'>
                <img
                  src={image.url}
                  alt={image.caption}
                  loading='lazy'
                  className='absolute inset-0 aspect-picture h-full w-full object-cover object-center transition duration-300 group-hover:scale-110'
                />
                <div className='absolute left-0 bottom-0 w-full bg-black bg-opacity-50 pl-6 pb-2 lg:pl-8 lg:pb-2'>
                  <span className='break-words text-sm font-medium leading-5 text-white hover:text-indigo-500 lg:leading-normal'>
                    {image.caption}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {currentSlide !== null && album?.images != null && (
        <ModalSlideShow
          setShowModal={() => setCurrentSlide(null)}
          currentSlide={currentSlide}
          length={album.images.length}
        >
          <>
            {album.images.map((image, index) => {
              return (
                <Slide
                  index={index}
                  key={album.id?.toString()}
                >
                  <div
                    className='relative flex w-full flex-col items-center
                        justify-center gap-5 px-5'
                  >
                    <img
                      src={image.url}
                      alt='image'
                      className='max-h-[75vh]'
                    />
                  </div>
                </Slide>
              )
            })}
          </>
        </ModalSlideShow>
      )}
    </>
  )
}

export default AlbumImages
