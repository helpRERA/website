import { ArrowDownTrayIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
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
  const [open, setOpen] = React.useState<boolean>(projectCategory.name.includes('Main'))

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
        <div className='flex flex-col gap-1.5 w-full'>
          <div
            className='flex w-full cursor-pointer justify-between items-center px-6 py-4 rounded-xl border border-gray-300 bg-white transition-colors hover:bg-gray-50 shadow-sm'
            onClick={() => setOpen(!open)}
          >
            <div className='flex items-center text-[15px] text-[#595959] font-normal' style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {projectCategory.name} ({docsInCategory.length})
            </div>
            <ChevronDownIcon
              className={`${
                open ? 'rotate-180' : ''
              } h-5 w-5 shrink-0 text-black transition-transform duration-200 ease-linear`}
            />
          </div>
          
          {open && (
            <div className='flex flex-col rounded-xl bg-[#eaf5fa] overflow-hidden mt-0.5 border border-[#d8eaf2]'>
              {docsInCategory.map((document, index) => {
                return (
                  <div
                    className={`flex items-center justify-between gap-4 px-6 py-4 ${
                      index !== docsInCategory.length - 1 ? 'border-b border-[#d8eaf2]' : ''
                    }`}
                    key={document.DocID}
                  >
                    <div className='flex items-center gap-3'>
                      <svg className="w-5 h-5 text-red-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 2h8l6 6v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 7h5l-5-5v5z" />
                      </svg>
                      <span className='text-[15px] text-[#595959] font-normal' style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {document.name}*
                      </span>
                      <button
                        className='text-[#085484] hover:text-[#06426a] flex items-center justify-center shrink-0 ml-1'
                        onClick={() => openModal(document)}
                        title='View Files'
                      >
                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
                        </svg>
                      </button>
                    </div>
                    <span className='text-[15px] text-[#595959] font-normal whitespace-nowrap' style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {document.no_of_docs} File{document.no_of_docs > 1 ? 's' : ''}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
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
