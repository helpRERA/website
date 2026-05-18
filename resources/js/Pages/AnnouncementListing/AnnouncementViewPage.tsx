import { useMemo } from 'react'
import AnnouncementListingView from '../../Components/Announcements/AnnouncementListingView'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'
import { Announcement } from '../../DataStructures/data_interfaces'
import { Language } from '../../ui/ui_interfaces'

interface Properties {
  announcement: Announcement
  lang: Language
}

const AnnouncementViewPage = ({ announcement, lang = 'en' }: Properties) => {
  const links = useMemo(() => {
    return {
      title: { english: announcement.title, malayalam: announcement.title_malayalam },
      links: {
        lastUUID: 2,
        items: [
          {
            id: 1,
            item: { name: { english: 'Home', malayalam: '' }, link: '/', external: false },
          },
          {
            id: 2,
            item: {
              name: { english: announcement.type, malayalam: '' },
              link: '/announcements?type=' + encodeURIComponent(announcement.type ?? ''),
              external: false,
            },
          },
        ],
      },
    }
  }, [announcement])

  return (
    <AppLayout>
      <PageTitle
        block={links}
        language={lang}
      />
      <AppLayoutPadding>
        <AnnouncementListingView
          announcement={announcement}
          lang={lang}
        />
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default AnnouncementViewPage
