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
        className='z-20 flex shrink-0 items-center justify-center bg-[#085484] pl-4 pr-8 text-white md:min-w-[220px] md:pl-6 md:pr-12'
        style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' }}
      >
        <img src='/svg/news.svg' alt='News' className='h-5 w-5 md:mr-2' />
        <span className='hidden font-semibold text-[15px] md:block'>Latest News</span>
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

                  {announcement.is_new === 1 && (
                    <span className='mx-2 px-3 py-1 text-[12px] font-normal bg-[#085484] text-white rounded-[4px] leading-none tracking-normal no-underline'>
                      New
                    </span>
                  )}
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
