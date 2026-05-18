import { useCallback, useState } from 'react'
import { UploadedFile } from '../../../../DataStructures/data_interfaces'
import DeleteButton from '../../../../ui/button/DeleteButton'
import Pagination from '../../../../ui/table/Pagination'
import Table from '../../../../ui/table/Table'
import { Paginator } from '../../../../ui/ui_interfaces'
import DeleteModal from '../../../../ui/modal/DeleteModal'

interface Properties {
  documents: Paginator<UploadedFile>
}

const heads = ['Name', 'Url', 'Type']

const ManageDocumentList = ({ documents }: Properties) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedDocument, setSelectedImage] = useState<UploadedFile | null>(null)

  const openDeleteDocument = useCallback((file: UploadedFile | null) => {
    setSelectedImage(file)
    setShowDeleteModal(true)
  }, [])

  return (
    <>
      <Table
        heads={heads}
        editColumn
      >
        <tbody>
          {documents.data.map((file) => (
            <tr
              key={file.id.toString()}
              className='standard-tr'
            >
              <td className='standard-td'>{file.name}</td>
              <td className='standard-td'>{file.url}</td>
              <td className='standard-td'>{file.mime}</td>
              <td>
                <div className='flex items-center gap-3'>
                  <a
                    className='link'
                    href={file.url ?? ''}
                    target='_blank'
                    rel='noreferrer'
                  >
                    VIEW
                  </a>
                  <div className='flex flex-wrap justify-end gap-1 p-4'>
                    <DeleteButton onClick={() => openDeleteDocument(file)} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showDeleteModal && selectedDocument != null && (
        <DeleteModal
          url={`/manage-documents/${selectedDocument.id}`}
          title={`Remove ${selectedDocument.name}`}
          setShowModal={setShowDeleteModal}
        >
          <p>Are you sure you want to delete {selectedDocument.name} ? </p>
        </DeleteModal>
      )}
      <div className='mt-10'>
        <Pagination pagination={documents} />
      </div>
    </>
  )
}

export default ManageDocumentList
