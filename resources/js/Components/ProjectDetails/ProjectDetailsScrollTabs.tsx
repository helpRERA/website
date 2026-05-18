import React, { useCallback, useRef, useState } from 'react'
import Tabs from '../../ui/Tab/Tabs'
import ProjectOverview from './Sections/Overview/ProjectOverview'
import ProjectQuickFact from './Sections/QuickFact/ProjectQuickFact'
import ProjectSchools from './Sections/ProjectSchools'

import { ProjectDetailData, ProjectLastModified } from '../../Pages/ProjectDetails'
import ProjectDocuments from './Sections/QuickFact/ProjectDocuments'
import { ArrowUpIcon } from '@heroicons/react/20/solid'
import { Language } from '../../ui/ui_interfaces'
import { ExtensionCert, OrderFile } from '../../DataStructures/krera_interfaces'
import { DocumentsByType } from '../../DataStructures/data_interfaces'

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
  {
    value: 'Overview',
    value_malayalam: 'അവലോകനം',
  },
  {
    value: 'Quick Facts',
    value_malayalam: 'പെട്ടെന്നുള്ള വസ്തുതകൾ',
  },
  {
    value: 'Documents',
    value_malayalam: 'പ്രമാണങ്ങൾ',
  },
  {
    value: 'Schools & Hospitals Nearby',
    value_malayalam: 'സമീപത്തുള്ള സ്കൂളുകളും ആശുപത്രികളും',
  },
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
  const [selectedTab, setSelectedTab] = useState('Overview')
  const overviewReference = useRef<HTMLDivElement>(null)
  const quickFactReference = useRef<HTMLDivElement>(null)
  const schoolsReference = useRef<HTMLDivElement>(null)
  const documentsReference = useRef<HTMLDivElement>(null)

  const tabChange = useCallback((value: string) => {
    setSelectedTab(value)
    if (value === 'Overview' && overviewReference.current != null) {
      overviewReference.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (value === 'Schools & Hospitals Nearby' && schoolsReference.current != null) {
      schoolsReference.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (value === 'Documents' && documentsReference.current != null) {
      documentsReference.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (value === 'Quick Facts' && quickFactReference.current != null) {
      quickFactReference.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const gotoTop = () => {
    if (overviewReference.current != null) {
      overviewReference.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className='relative pb-10'>
      <div className='sticky top-[2.5rem] z-10 w-full items-center gap-1 bg-white marker:flex md:gap-3 lg:top-0 lg:gap-5'>
        {lang === 'en' && (
          <>
            <Tabs
              items={tabItems}
              selectedTab={selectedTab}
              setSelectedTab={tabChange}
              lang={lang}
            />
          </>
        )}
      </div>
      <div className='px-3'>
        <ProjectOverview
          project={projects}
          reference={overviewReference}
          lang={lang}
          hasForm6={hasForm6}
          extensionOrder={extensionOrder}
          extensionCertificate={extensionCertificate}
          lastModified={lastModified}
          projectHash={projectHash}
          registrationOrder={registrationOrder}
          today={today}
        />
        <ProjectDocuments
          project={projects}
          reference={documentsReference}
          documents={documents}
          orders={orders}
          lang={lang}
        />
        <ProjectQuickFact
          project={projects}
          reference={quickFactReference}
          lang={lang}
        />
        <ProjectSchools
          project={projects}
          reference={schoolsReference}
          lang={lang}
        />

        <div className='bottom-10 right-10 hidden lg:fixed lg:block'>
          <button
            className='rounded-full bg-primary-500 p-2 text-white '
            onClick={gotoTop}
          >
            <ArrowUpIcon className='h-6 w-6' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsScrollTabs
