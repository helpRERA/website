import { Announcement } from '../../DataStructures/data_interfaces'
import Pagination from '../../ui/table/Pagination'
import { Language, Paginator } from '../../ui/ui_interfaces'
import GlobalSearchResultCard from './GlobalSearchResultCard'

interface Properties {
  announcements: Paginator<Announcement>
  lang?: Language
}

const GlobalSearchAnnouncement = ({ announcements, lang = 'en' }: Properties) => {
  return (
    <>
      <div className='my-10 flex flex-col gap-5'>
        {announcements?.data.map((announcement) => (
          <GlobalSearchResultCard
            lang={lang}
            key={announcement.id.toString()}
            title={{ english: announcement.title, malayalam: announcement.title_malayalam }}
            description={{
              english: announcement.description,
              malayalam: announcement.description_malayalam,
            }}
            link={`/announcements/${announcement.id}?lang=${lang}`}
          />
        ))}
      </div>
      <div className='my-5'>
        <Pagination pagination={announcements} />
      </div>
    </>
  )
}

export default GlobalSearchAnnouncement
