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
}: GlobalSearchProperties) => {
  return (
    <>
      <GlobalSearchTabs
        section={section}
        oldSearch={oldSearch}
        lang={lang}
      />
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
