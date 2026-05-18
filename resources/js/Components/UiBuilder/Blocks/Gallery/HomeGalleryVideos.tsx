import { Link } from '@inertiajs/react'
import { Slide } from 'pure-react-carousel'
import { GalleryVideo } from '../../../../DataStructures/data_interfaces'
import SlideShowRoundButtons from '../../../../ui/SlideShow/SlideShowRoundButtons'
import { Language } from '../../../../ui/ui_interfaces'

interface Properties {
  language?: Language
  latestVideos?: GalleryVideo[]
}

const HomeGalleryVideos = ({ language = 'en', latestVideos }: Properties) => {
  return (
    <div className='flex flex-col py-5'>
      <SlideShowRoundButtons
        totalSlides={latestVideos == null ? 0 : latestVideos.length}
        visibleSlides={1}
        currentSlide={0}
        isPlaying={true}
        infinite={true}
        interval={3000}
      >
        <div className='flex h-full w-full'>
          {latestVideos?.map((item, index) => {
            return (
              <Slide
                key={item.id.toString()}
                index={index}
                className='my-10 flex h-full justify-center px-5'
              >
                <div className='flex h-full w-full items-center justify-center text-center shadow-lg'>
                  <iframe
                    src={item.url}
                    className='aspect-video h-full w-full'
                    allowFullScreen
                  ></iframe>
                </div>
              </Slide>
            )
          })}
        </div>
      </SlideShowRoundButtons>
      <div className='flex justify-end gap-2'>
        <Link
          as='a'
          className='text-sm font-medium leading-5 text-indigo-500 hover:text-indigo-600 lg:leading-normal'
          href={`/gallery?section=videos&lang=${language}`}
        >
          See More Videos...
        </Link>
      </div>
    </div>
  )
}

export default HomeGalleryVideos
