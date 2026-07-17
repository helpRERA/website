import React from 'react'
import { ProjectDetailData } from '../../../../Pages/ProjectDetails'
import { Language } from '../../../../ui/ui_interfaces'
import Localization from '../../../../ui/Localization'
import { localization } from '../../../../Localization/localization'
import ProjectDocumentAccordion from './ProjectDocumentAccordion'
import { DocumentsByType } from '../../../../DataStructures/data_interfaces'
import { projectDocCategories } from '../../../ExploreProject/project-document-categories'

interface Properties {
  project: ProjectDetailData
  reference: React.RefObject<HTMLDivElement>
  documents: DocumentsByType[]
  orders: DocumentsByType[]
  lang?: Language
}

const ProjectDocuments = ({ project, reference, lang = 'en', documents, orders }: Properties) => {
  return (
    <>
      <div className='mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-4 mb-10' ref={reference}>
        <h3 className='text-[20px] font-medium text-[#085484] mb-2' style={{ fontFamily: "'Urbanist', sans-serif" }}>
          Project Related Important Documents
        </h3>
        {documents.length === 0 && orders.length === 0 && (
          <div className='text-xs text-red-500'>
            * There are no documents associated with this project.
          </div>
        )}
        <div className='flex flex-col gap-4'>
          {projectDocCategories.map((category) => (
            <ProjectDocumentAccordion
              documents={category.type === 'order' ? orders : documents}
              projectCategory={category}
              key={category.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectDocuments
