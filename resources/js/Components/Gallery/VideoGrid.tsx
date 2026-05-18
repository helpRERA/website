import { GalleryVideo } from '../../DataStructures/data_interfaces'
import Localization from '../../ui/Localization'
import Pagination from '../../ui/table/Pagination'
import { Language, Paginator } from '../../ui/ui_interfaces'

interface Properties {
  videos: Paginator<GalleryVideo>
  language?: Language
}

const VideoGrid = ({ videos, language = 'en' }: Properties) => {
  return (
    <>
      <div className='my-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {videos.data.map((video: GalleryVideo) => {
          return (
            <>
              <div className='flex flex-col'>
                <div className=''>
                  {' '}
                  <iframe
                    key={video.id.toString()}
                    className='aspect-video w-full'
                    src={video.url}
                    allowFullScreen
                  />
                </div>

                <div className='flex  p-2 text-sm md:text-base lg:text-lg'>
                  <Localization
                    language={language}
                    text={{ english: video.caption, malayalam: video.caption_malayalam }}
                  />
                  <div className='self ml-auto'> {video.date}</div>
                </div>
              </div>
            </>
          )
        })}
      </div>
      <div className='my-5'>
        <Pagination pagination={videos} />
      </div>
    </>
  )
}

export default VideoGrid
