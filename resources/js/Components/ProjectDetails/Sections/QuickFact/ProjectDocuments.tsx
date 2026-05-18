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
      <div className='relative my-5 flex w-full flex-col gap-3 text-sm'>
        <div
          className='absolute -top-[6rem]'
          ref={reference}
        ></div>
        <span className='text-sm font-bold md:text-base'>
          <Localization
            text={localization['Documents']}
            language={lang}
          />
        </span>
        {documents.length === 0 && orders.length === 0 && (
          <div className='text-xs text-red-500'>
            * There are no documents associated with this project.
          </div>
        )}
        {projectDocCategories.map((category) => (
          <ProjectDocumentAccordion
            documents={category.type === 'order' ? orders : documents}
            projectCategory={category}
            key={category.id}
            project={project}
          />
        ))}
      </div>
    </>
  )
}

export default ProjectDocuments
