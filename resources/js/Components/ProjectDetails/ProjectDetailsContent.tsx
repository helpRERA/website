import React from 'react'
import ProjectDetailsScrollTabs from './ProjectDetailsScrollTabs'
import { ProjectDetailData, ProjectLastModified } from '../../Pages/ProjectDetails'
import ProjectImagesList from './Sections/ProjectImagesList'
import LatLngMap from '../Common/Maps/LatLngMap'
import useProjectAddress from './useProjectAddress'
import { Language } from '../../ui/ui_interfaces'
import { ExtensionCert, OrderFile } from '../../DataStructures/krera_interfaces'
import { DocumentsByType } from '../../DataStructures/data_interfaces'

interface Properties {
  project: ProjectDetailData
  lang?: Language
  documents: DocumentsByType[]
  orders: DocumentsByType[]
  extensionOrder: OrderFile | null
  registrationOrder: OrderFile | null
  extensionCertificate: ExtensionCert | null
  lastModified?: ProjectLastModified | null
  projectHash: string
  hasForm6: boolean
  today: string
}

const ProjectDetailsContent = ({
  project,
  lang = 'en',
  documents,
  orders,
  extensionCertificate,
  extensionOrder,
  registrationOrder,
  lastModified,
  projectHash,
  hasForm6,
  today,
}: Properties) => {
  const city = useProjectAddress(project)

  return (
    <>
      <div className='relative flex flex-col gap-5 pb-5 lg:h-full lg:overflow-y-auto'>
        <div className='flex flex-col gap-5 px-2 pt-1'>
          <ProjectImagesList project={project} />
          {/*Location Map Based ON Lat & Long*/}
          <LatLngMap
            lat={project.coordinates?.Latitude ?? null}
            long={project.coordinates?.Longitude ?? null}
            city={city}
          />
        </div>
      </div>
      {/*Scrollable Right Section With Content*/}
      <div className='px-2 lg:h-full lg:overflow-y-auto'>
        <ProjectDetailsScrollTabs
          projects={project}
          lang={lang}
          hasForm6={hasForm6}
          documents={documents}
          orders={orders}
          extensionCertificate={extensionCertificate}
          extensionOrder={extensionOrder}
          lastModified={lastModified}
          projectHash={projectHash}
          registrationOrder={registrationOrder}
          today={today}
        />
      </div>
    </>
  )
}
export default ProjectDetailsContent
