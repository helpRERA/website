import { Link } from '@inertiajs/react'
import Marquee from 'react-fast-marquee'
import { Announcement } from '../../../DataStructures/data_interfaces'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import { BlockConfiguration } from '../DefaultBlockData'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'
import useMounted from '../../../hooks/useMounted'

export const announcementTickerData = {
  dependencies: ['announcementTicker'],
}

interface Properties {
  announcements?: Announcement[]
  language?: Language
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: BlockConfiguration
}

const AnnouncementTicker = ({ language = 'en', announcements, blockData }: Properties) => {
  const isMounted = useMounted()

  return (
    <div className='flex h-12 w-full overflow-hidden border-b border-gray-200 bg-white shadow-sm'>
      {/* Latest News Badge */}
      <div 
        className='z-20 flex shrink-0 items-center justify-center bg-[#0c598a] pl-6 pr-12 text-white' 
        style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)', minWidth: '220px' }}
      >
        <svg xmlns='http://www.w3.org/2000/svg' className='mr-2 h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
          <path fillRule='evenodd' d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z' clipRule='evenodd' />
        </svg>
        <span className='font-semibold text-[15px]'>Latest News</span>
      </div>

      {/* Ticker */}
      <div className='-ml-10 flex flex-1 items-center bg-white pl-10'>
        {isMounted && (
          <Marquee gradient={false} direction='left' speed={50} pauseOnHover>
            <div className='flex items-center space-x-12 px-4'>
              {announcements?.map((announcement) => (
                <Link
                  as='a'
                  className='flex items-center text-sm font-medium text-[#0f2c59] hover:underline'
                  href={`/announcements/${announcement.id}?lang=${language}`}
                  key={announcement.id}
                >
                  <span className='mr-2 h-1.5 w-1.5 rounded-full bg-[#0f2c59]'></span>
                  <Localization
                    text={{
                      english: announcement.title,
                      malayalam: announcement.title_malayalam,
                    }}
                    language={language}
                  />
                </Link>
              ))}
            </div>
          </Marquee>
        )}
      </div>
    </div>
  )
}

export default AnnouncementTicker
