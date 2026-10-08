import Pagination from '../../ui/table/Pagination'
import GlobalSearchResultCard from './GlobalSearchResultCard'
import { GlobalSearchProperties } from '../../Pages/GlobalSearchPage'
import GlobalSearchAnnouncement from './GlobalSearchAnnouncement'
import GlobalSearchPages from './GlobalSearchPages'
import GlobalSearchProjects from './GlobalSearchProjetcs'
import GlobalSearchTabs from './GlobalSearchTabs'

const GlobalSearch = ({
  section,
  oldSearch,
  lang = 'en',
  announcements,
  projects,
  pages,
  combined,
}: GlobalSearchProperties) => {
  return (
    <>
      <GlobalSearchTabs
        section={section}
        oldSearch={oldSearch}
        lang={lang}
      />
      {combined != null && (
        <>
          <div className='my-10 flex flex-col gap-5'>
            {combined.data.map(result => result.type === 'announcement' ? (
              <GlobalSearchResultCard
                key={`announcement-${result.item.id}`}
                lang={lang}
                title={{ english: result.item.title, malayalam: result.item.title_malayalam }}
                description={{ english: result.item.description, malayalam: result.item.description_malayalam }}
                link={`/announcements/${result.item.id}?lang=${lang}`}
              />
            ) : (
              <GlobalSearchResultCard
                key={`project-${result.item.ID}`}
                lang={lang}
                title={{ english: result.item.Name, malayalam: '' }}
                description={{ english: result.item.certificate?.RegistrationNo ?? null, malayalam: '' }}
                link={`/projects/${result.item.ID}?lang=${lang}`}
              />
            ))}
            {combined.total === 0 && <p>No results found.</p>}
          </div>
          {combined.last_page > 1 && <Pagination pagination={combined} />}
        </>
      )}
      {announcements != null && (
        <GlobalSearchAnnouncement
          announcements={announcements}
          lang={lang}
        />
      )}
      {pages != null && (
        <GlobalSearchPages
          pages={pages}
          lang={lang}
        />
      )}
      {projects != null && (
        <GlobalSearchProjects
          lang={lang}
          projects={projects}
        />
      )}
    </>
  )
}

export default GlobalSearch
