import React from 'react'

import { Announcement } from '../../../DataStructures/data_interfaces'
import { Language } from '../../../ui/ui_interfaces'

import { Link } from '@inertiajs/react'

interface Properties {
  announcement: Announcement
  lang?: Language
}

const NoticeCard = ({ announcement, lang = 'en' }: Properties) => {
  return (
    <>
      <Link
        as='a'
        href={`/announcements/${announcement.id}?lang=${lang}`}
        className='group flex cursor-pointer
                flex-col justify-start gap-3 overflow-hidden rounded bg-slate-100 p-5 text-left
                shadow-xl transition-shadow duration-200 hover:shadow-2xl'
      >
        <div className='flex flex-col gap-2'>
          <span className='break-words text-xs leading-5 text-gray-900'>{announcement.date}</span>
          <h3 className='pb-2 font-bold uppercase text-indigo-700'>{announcement.title}</h3>
          <span className='line-clamp line-clamp--five break-words text-sm leading-5'>
            {announcement.description}
          </span>
          <span className='text-skin-base break-words text-sm leading-5'>More...</span>
        </div>
      </Link>
    </>
  )
}

export default NoticeCard
