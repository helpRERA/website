import { Link } from '@inertiajs/react'
import { Slide } from 'pure-react-carousel'
import { Album } from '../../../../DataStructures/data_interfaces'
import Localization from '../../../../ui/Localization'
import SlideShowRoundButtons from '../../../../ui/SlideShow/SlideShowRoundButtons'
import { Language } from '../../../../ui/ui_interfaces'

interface Properties {
  lang?: Language
  latestAlbums?: Album[]
}

const HomeGalleryImages = ({ lang = 'en', latestAlbums }: Properties) => {
  return (
    <div className='flex flex-col gap-4 py-5'>
      <SlideShowRoundButtons
        totalSlides={latestAlbums == null ? 0 : latestAlbums.length}
        visibleSlides={1}
        currentSlide={0}
        isPlaying={true}
        infinite={true}
        interval={3000}
      >
        <div className='flex w-full'>
          {latestAlbums?.map((item, index) => {
            return (
              <Slide
                key={item.id.toString()}
                index={index}
                className='my-10 flex h-full justify-center  px-5'
              >
                <Link
                  as='a'
                  href={`/gallery/${item.url}`}
                  className='group relative flex h-full w-full flex-col items-center  overflow-hidden text-center shadow-lg'
                >
                  <img
                    src={item.cover_photo}
                    className='aspect-video h-full w-full object-cover object-center transition duration-300 group-hover:scale-110'
                  />
                  <div className='absolute left-0 bottom-0 w-full bg-black bg-opacity-50 pl-6 pb-2 lg:pl-8 lg:pb-2'>
                    <span className='break-words text-sm font-medium leading-5 text-white hover:text-indigo-500 lg:leading-normal'>
                      <Localization
                        text={{
                          english: item.name,
                          malayalam: item.name_malayalam,
                        }}
                        language={lang}
                      />
                    </span>
                  </div>
                </Link>
              </Slide>
            )
          })}
        </div>
      </SlideShowRoundButtons>
      <div className='flex justify-end gap-2'>
        <Link
          as='a'
          className='text-sm font-medium leading-5 text-indigo-500 hover:text-indigo-600 lg:leading-normal'
          href={`/gallery?section=images&lang=${lang}`}
        >
          See More Images...
        </Link>
      </div>
    </div>
  )
}

export default HomeGalleryImages
