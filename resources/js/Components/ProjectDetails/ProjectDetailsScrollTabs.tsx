import React, { useState } from 'react'
import ProjectOverview from './Sections/Overview/ProjectOverview'
import ProjectQuickFact from './Sections/QuickFact/ProjectQuickFact'
import ProjectDocuments from './Sections/QuickFact/ProjectDocuments'
import LatLngMap from '../Common/Maps/LatLngMap'
import useProjectAddress from './useProjectAddress'
import { ProjectDetailData, ProjectLastModified } from '../../Pages/ProjectDetails'
import { Language } from '../../ui/ui_interfaces'
import { DocumentsByType } from '../../DataStructures/data_interfaces'
import Localization from '../../ui/Localization'
import ProjectOrders from './Sections/Orders/ProjectOrders'

interface Properties {
  projects: ProjectDetailData
  documents: DocumentsByType[]
  orders: DocumentsByType[]
  lang?: Language
  lastModified?: ProjectLastModified | null
  projectHash: string
  hasForm6: boolean
  today: string
}

const tabItems = [
  { id: 'overview', label: 'Overview', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'quick-facts', label: 'Quick Facts', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { id: 'documents', label: 'Documents', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { id: 'map-view', label: 'Map View', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { id: 'orders', label: 'Orders', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z' },
]

const ProjectDetailsScrollTabs = ({
  projects,
  lang = 'en',
  documents,
  orders,
  lastModified,
  projectHash,
  hasForm6,
  today,
}: Properties) => {
  const [activeTab, setActiveTab] = useState('overview')
  const city = useProjectAddress(projects)

  return (
    <div className='flex flex-col gap-6'>
      {/* Tab Header */}
      <div className='flex w-full items-center justify-start gap-3 overflow-x-auto px-4 py-1 sm:justify-center md:flex-wrap md:gap-6 md:overflow-visible md:px-0' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {tabItems.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center justify-center gap-2.5 rounded-md px-5 py-3 min-w-[140px] transition-all ${isActive
                  ? 'bg-[#085484] text-white shadow-md'
                  : 'bg-white text-gray-500 hover:bg-gray-50 shadow-[0_2px_10px_rgba(0,0,0,0.04)]'
                }`}
            >
              <svg className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[#085484]'}`} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d={tab.icon} />
              </svg>
              <span className='text-sm font-medium'>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className='mt-4'>
        {activeTab === 'overview' && (
          <ProjectOverview
            project={projects}
            reference={{ current: null }}
            lang={lang}
            hasForm6={hasForm6}
            lastModified={lastModified}
            projectHash={projectHash}
            today={today}
          />
        )}

        {activeTab === 'quick-facts' && (
          <ProjectQuickFact
            project={projects}
            reference={{ current: null }}
            lang={lang}
          />
        )}

        {activeTab === 'documents' && (
          <ProjectDocuments
            project={projects}
            reference={{ current: null }}
            documents={documents}
            lang={lang}
          />
        )}

        {activeTab === 'map-view' && (
          <div className='mx-auto flex w-full max-w-[1100px] flex-col px-4 mb-10'>
            <h3 className='text-[22px] font-semibold text-[#085484] mb-5' style={{ fontFamily: "'Urbanist', sans-serif" }}>
              Location and Neighbourhood
            </h3>
            
            <div className='flex flex-col lg:flex-row gap-8 justify-between'>
              <div className='flex flex-col gap-6 lg:w-3/5 mt-1'>
                <p className='text-[15px] text-[#595959] font-normal leading-relaxed' style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {projects.Name} is strategically located with excellent connectivity to essential services, schools, hospitals, and key city destinations.
                </p>
                <div className='flex items-center gap-5 mt-2'>
                  <div className='flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#eef7fb] text-[#085484]'>
                    <svg className='h-[22px] w-[22px]' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM7.5 15c-.83 0-1.5-.67-1.5-1.5S6.67 12 7.5 12s1.5.67 1.5 1.5S8.33 15 7.5 15zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'/>
                    </svg>
                  </div>
                  <p className='text-[14.5px] text-[#595959] font-normal leading-relaxed' style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Easy access to major roads, public transport, schools, hospitals, and key city landmarks ensures a convenient and well-connected lifestyle.
                  </p>
                </div>
              </div>
              
              <div className='lg:w-2/5 flex lg:justify-end mb-6 lg:mb-0'>
                {/* Legend */}
                <div className='rounded-[14px] border border-gray-200 bg-white p-[26px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] w-full max-w-[270px] self-start'>
                  <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-6 w-6 shrink-0 items-center justify-center text-[#d80b0b]'>
                        <svg className='h-[26px] w-[26px]' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
                        </svg>
                      </div>
                      <span className='text-[15px] text-[#222] font-normal' style={{ fontFamily: "'DM Sans', sans-serif" }}>Project Location</span>
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#d80b0b] text-white text-[14px] font-bold'>
                        H
                      </div>
                      <span className='text-[15px] text-[#222] font-normal' style={{ fontFamily: "'DM Sans', sans-serif" }}>Hospital</span>
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#085484] text-white'>
                        <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z' />
                        </svg>
                      </div>
                      <span className='text-[15px] text-[#222] font-normal' style={{ fontFamily: "'DM Sans', sans-serif" }}>Schools</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-2 h-[450px] w-full rounded-2xl overflow-hidden border border-gray-200'>
              <iframe
                src={`https://maps.google.com/maps?q=hospitals+AND+schools%20near%20${city},kerala&z=12&output=embed`}
                className='h-full w-full'
              ></iframe>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <ProjectOrders
            project={projects}
            orders={orders}
          />
        )}
      </div>
    </div>
  )
}

export default ProjectDetailsScrollTabs
