import { ArrowDownTrayIcon } from '@heroicons/react/20/solid'
import AccordionItem from '../../../Common/Accordion/AccordionItem'
import { DocumentsByType } from '../../../../DataStructures/data_interfaces'
import { ProjectDocument } from '../../../../DataStructures/krera_interfaces'
import Modal from '../../../../ui/modal/Modal'
import React, { useEffect, useMemo } from 'react'
import { ProjectCategory } from '../../../ExploreProject/project-document-categories'
import { ProjectDetailData } from '../../../../Pages/ProjectDetails'
import axios from 'axios'
import FullSpinnerWrapper from '../../../../ui/FullSpinnerWrapper'
import { handleHttpErrors } from '../../../../ui/alerts'
import { getIndianDate } from '../../../../libs/dates'

interface DocumentGroup {
  name: string
  DocID: string
  no_of_docs: number
  type: string
}

const ProjectDocumentAccordion = ({
  project,
  projectCategory,
  documents,
}: {
  project: ProjectDetailData
  projectCategory: ProjectCategory
  documents: DocumentsByType[]
}) => {
  const [files, setFiles] = React.useState<ProjectDocument[]>([])
  const [showFiles, setShowFiles] = React.useState<boolean>(false)
  const [loadingFiles, setLoadingFiles] = React.useState<boolean>(false)

  const docsInCategory = useMemo(() => {
    const docs: DocumentGroup[] = []

    documents.forEach((document) => {
      const group = projectCategory.documents.find((doc) => doc.DocID.toString() == document.DocID)

      if (group != null) {
        docs.push({
          name: group.name,
          DocID: document.DocID,
          no_of_docs: document.no_of_docs,
          type: group.type,
        })
      }
    })

    return docs
  }, [documents, projectCategory])

  const [selectedCategory, setSelectedCategory] = React.useState<DocumentGroup | null>(null)

  const openModal = (category: DocumentGroup) => {
    setShowFiles(true)
    setSelectedCategory(category)
  }

  useEffect(() => {
    setFiles([])
    setLoadingFiles(true)
    if (selectedCategory != null) {
      const url =
        projectCategory.type === 'document'
          ? `/document-list?project_id=${project.ID}&doc_id=${selectedCategory.DocID}&type=${selectedCategory.type}`
          : `/order-list?project_id=${project.ID}&doc_id=${selectedCategory.DocID}&type=${selectedCategory.type}`

      axios
        .get(url)
        .then((response) => {
          setFiles(response.data)
        })
        .catch(handleHttpErrors)
        .finally(() => {
          setLoadingFiles(false)
        })
    }
  }, [project, selectedCategory])

  return (
    <>
      {docsInCategory.length > 0 && (
        <AccordionItem title={`${projectCategory.name} (${docsInCategory.length})`}>
          <div className='flex flex-col gap-5'>
            {docsInCategory.map((document) => {
              return (
                <div
                  className='flex items-center justify-between gap-1 md:gap-5'
                  key={document.DocID}
                >
                  <span className='text-xs md:text-sm'>
                    <b>{document.name}</b>
                  </span>
                  <button
                    className='text-blue-500 hover:text-blue-700'
                    onClick={() => openModal(document)}
                  >
                    {document.no_of_docs} Files
                  </button>
                </div>
              )
            })}
          </div>
        </AccordionItem>
      )}
      {showFiles && (
        <Modal
          setShowModal={setShowFiles}
          title={`Documents: ${selectedCategory?.name}`}
        >
          <FullSpinnerWrapper processing={loadingFiles}>
            <div className='flex max-h-[50vh] flex-col gap-5 p-2'>
              {files.map((document) => {
                return (
                  <div
                    className='flex items-center justify-between gap-1 md:gap-5'
                    key={document.ID.toString()}
                  >
                    <span className='text-xs md:text-sm'>
                      <b>
                        {document.DocumentName} ({getIndianDate(document.CreatedOn)})
                      </b>
                    </span>
                    <a
                      className='text-blue-500 hover:text-blue-700'
                      href={`/${
                        projectCategory.type === 'order' ? 'extension-order' : 'view-file'
                      }/${document.ID}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <ArrowDownTrayIcon className='h-5 w-5' />
                    </a>
                  </div>
                )
              })}
            </div>
          </FullSpinnerWrapper>
        </Modal>
      )}
    </>
  )
}

export default ProjectDocumentAccordion
