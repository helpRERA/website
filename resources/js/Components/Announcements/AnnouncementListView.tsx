import React from 'react'
import NoticeCard from '../Home/AnnoucementPreview/NoticeCard'
import { Announcement } from '../../DataStructures/data_interfaces'
import { Language, Paginator } from '../../ui/ui_interfaces'
import Pagination from '../../ui/table/Pagination'
interface Properties {
  announcements: Paginator<Announcement>
  lang?: Language
}

const AnnouncementListView = ({ announcements, lang = 'en' }: Properties) => {
  return (
    <>
      <div className='mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 xl:mt-16 xl:grid-cols-5'>
        {announcements.data?.map((announcement) => {
          return (
            <NoticeCard
              key={announcement.id}
              announcement={announcement}
              lang={lang}
            />
          )
        })}
      </div>
      <div className='my-10'>
        <Pagination pagination={announcements} />
      </div>
    </>
  )
}

export default AnnouncementListView
