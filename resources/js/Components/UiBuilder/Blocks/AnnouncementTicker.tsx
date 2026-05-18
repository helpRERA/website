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
    <div
      className={`overflow-hidden bg-primary-800 ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      {isMounted && (
        <Marquee
          gradient={false}
          direction='left'
          speed={100}
          pauseOnHover
        >
          <div className='flex space-x-6 py-3 px-4 md:p-6 lg:space-x-10 lg:py-4 lg:px-5'>
            {announcements?.map((announcement) => {
              return (
                <Link
                  as='a'
                  className='flex-none  cursor-pointer text-sm leading-4 text-white underline hover:font-bold'
                  href={`/announcements/${announcement.id}?lang=${language}`}
                  key={announcement.id}
                >
                  <Localization
                    text={{
                      english: announcement.title,
                      malayalam: announcement.title_malayalam,
                    }}
                    language={language}
                  />
                </Link>
              )
            })}
          </div>
        </Marquee>
      )}
    </div>
  )
}

export default AnnouncementTicker
