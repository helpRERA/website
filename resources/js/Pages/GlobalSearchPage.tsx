import GlobalSearch from '../Components/GlobalSearch/GlobalSearch'
import AppLayout from '../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../Components/Layout/AppLayout/AppLayoutPadding'
import { Announcement } from '../DataStructures/data_interfaces'
import { Project } from '../DataStructures/krera_interfaces'
import { Page } from '../DataStructures/ui_builder_interfaces'
import { Language, Paginator } from '../ui/ui_interfaces'

export interface GlobalSearchProperties {
  section: string
  oldSearch: string
  lang: Language
  announcements?: Paginator<Announcement> | null
  pages?: Paginator<Page> | null
  projects?: Paginator<Project> | null
}

const GlobalSearchPage = ({
  section,
  oldSearch,
  lang = 'en',
  announcements,
  pages,
  projects,
}: GlobalSearchProperties) => {
  return (
    <AppLayout>
      <AppLayoutPadding>
        <GlobalSearch
          section={section}
          oldSearch={oldSearch}
          lang={lang}
          announcements={announcements}
          pages={pages}
          projects={projects}
        />
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default GlobalSearchPage
