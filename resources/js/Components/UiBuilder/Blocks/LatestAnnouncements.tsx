import { Link } from '@inertiajs/react'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Announcement } from '../../../DataStructures/data_interfaces'
import { RequiredTextData } from '../../../DataStructures/ui_builder_interfaces'
import { getDisplayDate } from '../../../libs/dates'
import { localization } from '../../../Localization/localization'
import { handleHttpErrors } from '../../../ui/alerts'
import SelectList from '../../../ui/form/SelectList'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import { BlockConfiguration } from '../DefaultBlockData'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'

export const latestAnnouncementsBlock = {
  dependencies: ['latestAnnouncements'],
}

interface Properties {
  announcements?: Announcement[]
  language?: Language
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: BlockConfiguration
}

const tabs = [
  localization['Latest'],
  localization['Orders'],
  localization['Career'],
  localization['Notices'],
  localization['Tenders & Quotations'],
]

const LatestAnnouncements = ({ announcements, language = 'en', blockData }: Properties) => {
  const [selectedTab, setSelectedTab] = useState('Latest')
  const [items, setItems] = useState<Announcement[]>([])
  const selectTab = (value: string) => {
    setSelectedTab(value)
  }

  const fetchData = useCallback((type: string) => {
    setItems([])
    axios
      .get(`/latest-announcements?type=${encodeURIComponent(type)}`)
      .then((response) => {
        setItems(response.data)
      })
      .catch(handleHttpErrors)
  }, [])

  useEffect(() => {
    if (selectedTab === 'Latest' && announcements != null) {
      setItems(announcements)
      return
    }
    fetchData(selectedTab)
  }, [selectedTab, announcements, fetchData])

  return (
    <AppLayoutPadding>
      <div
        className={`${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
      >
        <div className='flex flex-col lg:flex-row'>
          <div className='w-full'>
            <div className='block w-full lg:hidden'>
              <div className='flex w-full flex-col sm:w-1/2'>
                <SelectList
                  list={tabs as RequiredTextData[]}
                  dataKey='english'
                  displayKey={
                    (language === 'en' ? 'english' : 'malayalam') as keyof RequiredTextData
                  }
                  data={selectedTab}
                  setData={selectTab}
                />
              </div>
            </div>

            <ul className='mt-8 hidden flex-row text-base font-normal leading-4 lg:flex lg:flex-wrap '>
              {tabs.map((tab) => {
                return (
                  <li
                    onClick={() => selectTab(tab.english ?? '')}
                    key={tab.english}
                    className={
                      'cursor-pointer border border-gray-300 py-5 text-center duration-100 hover:bg-primary-700 hover:text-white focus:outline-none sm:w-full lg:w-auto lg:px-12 ' +
                      (selectedTab === tab.english
                        ? 'bg-primary-900 text-white'
                        : 'bg-white text-gray-600')
                    }
                  >
                    <Localization
                      text={tab}
                      language={language}
                    />
                  </li>
                )
              })}
            </ul>

            <div className='mx-auto py-16'>
              {items.length > 0 && (
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                  {items.map((announcement, index) => {
                    return (
                      <div
                        className={`gap-2 ${
                          index === 0 ? 'flex' : index === 1 ? 'hidden sm:flex' : 'hidden lg:flex'
                        }`}
                        key={announcement.id.toString()}
                      >
                        <div className='w-2/5'>
                          <img
                            src='/imge/announcement-icon.png'
                            alt='Announcements'
                            className='h-auto w-full overflow-hidden rounded object-cover'
                          />
                        </div>
                        <div className='w-3/5'>
                          <Link
                            as='a'
                            href={`/announcements/${announcement.id}?lang=${language}`}
                            className='text-sm font-extrabold uppercase text-indigo-700'
                          >
                            <Localization
                              text={{
                                english: announcement.title,
                                malayalam: announcement.title_malayalam,
                              }}
                              language={language}
                            />
                          </Link>
                          <p className='line-clamp line-clamp--two  text-base text-gray-800'>
                            <Localization
                              text={{
                                english: announcement.description,
                                malayalam: announcement.description_malayalam,
                              }}
                              language={language}
                            />
                          </p>
                          <p className='text-xs text-gray-600'>
                            {getDisplayDate(announcement.date)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              {items.length === 0 && (
                <div className='flex w-full flex-col'>
                  <h1>No Records To Show.</h1>
                </div>
              )}
              <div className='items-right mt-14 flex justify-end'>
                <Link
                  as='a'
                  href={`/announcements?lang=${language}`}
                  className='f-m-m mt-7 flex items-center justify-center rounded text-sm font-semibold
                     text-indigo-700 hover:text-indigo-800 hover:underline focus:outline-none
                      md:text-lg xl:leading-4'
                >
                  <Localization
                    text={localization['See More']}
                    language={language}
                  />

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5l7 7-7 7'
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayoutPadding>
  )
}

export default LatestAnnouncements
