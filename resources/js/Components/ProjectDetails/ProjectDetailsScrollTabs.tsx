import React, { useState } from 'react'
import ProjectOverview from './Sections/Overview/ProjectOverview'
import ProjectQuickFact from './Sections/QuickFact/ProjectQuickFact'
import ProjectDocuments from './Sections/QuickFact/ProjectDocuments'
import LatLngMap from '../Common/Maps/LatLngMap'
import useProjectAddress from './useProjectAddress'
import { ProjectDetailData, ProjectLastModified } from '../../Pages/ProjectDetails'
import { Language } from '../../ui/ui_interfaces'
import { ExtensionCert, OrderFile } from '../../DataStructures/krera_interfaces'
import { DocumentsByType } from '../../DataStructures/data_interfaces'
import Localization from '../../ui/Localization'

interface Properties {
  projects: ProjectDetailData
  documents: DocumentsByType[]
  orders: DocumentsByType[]
  extensionOrder: OrderFile | null
  registrationOrder: OrderFile | null
  extensionCertificate: ExtensionCert | null
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
]

const ProjectDetailsScrollTabs = ({
  projects,
  lang = 'en',
  documents,
  orders,
  extensionOrder,
  registrationOrder,
  extensionCertificate,
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
      <div className='flex flex-wrap items-center justify-center gap-4 md:gap-6'>
        {tabItems.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2.5 rounded-md px-5 py-3 min-w-[140px] transition-all ${
                isActive
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
            extensionOrder={extensionOrder}
            extensionCertificate={extensionCertificate}
            lastModified={lastModified}
            projectHash={projectHash}
            registrationOrder={registrationOrder}
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
            orders={orders}
            lang={lang}
          />
        )}

        {activeTab === 'map-view' && (
          <div className='h-[400px] w-full rounded-xl overflow-hidden'>
            <LatLngMap
              lat={projects.coordinates?.Latitude ?? null}
              long={projects.coordinates?.Longitude ?? null}
              city={city}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetailsScrollTabs
