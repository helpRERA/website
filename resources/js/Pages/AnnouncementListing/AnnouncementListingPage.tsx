import React, { useMemo } from 'react'
import { Language, Paginator } from '../../ui/ui_interfaces'
import { Announcement } from '../../DataStructures/data_interfaces'
import AnnouncementListView from '../../Components/Announcements/AnnouncementListView'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import AnnouncementFilter from '../../Components/Announcements/AnnouncementFilter/AnnouncementFilter'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'

export interface AnnouncementListPageProperties {
  announcements: Paginator<Announcement>
  oldSearch: string
  oldFrom: string
  oldTo: string
  oldSort: string
  oldType: string
  oldSubType: string
  lang?: Language
}

const AnnouncementListingPage = ({
  announcements,
  oldFrom,
  oldSearch,
  oldTo,
  oldType,
  oldSort,
  oldSubType,
  lang = 'en',
}: AnnouncementListPageProperties) => {
  const links = useMemo(() => {
    let title = 'Announcements'
    if (oldType != '' || oldSubType != '') {
      title = oldType
      if (oldSubType != '') {
        title = oldType + ' - ' + oldSubType
      }
    }
    return {
      title: {
        english: title,
        malayalam: '',
      },
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
              name: { english: 'Announcements', malayalam: '' },
              link: '/announcements',
              external: false,
            },
          },
        ],
      },
    }
  }, [oldType, oldSubType])

  return (
    <AppLayout>
      <PageTitle
        block={links}
        language={lang}
      />
      <AppLayoutPadding>
        <main className='flex w-full flex-col'>
          <div className='text-skin-base container mx-auto flex min-h-[75vh] flex-col px-4 py-4'>
            <AnnouncementFilter
              oldFrom={oldFrom}
              oldSearch={oldSearch}
              oldTo={oldTo}
              oldType={oldType}
              oldSort={oldSort}
              oldSubType={oldSubType}
              lang={lang}
            />
            <AnnouncementListView
              announcements={announcements}
              lang={lang}
            />
          </div>
        </main>
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default AnnouncementListingPage
