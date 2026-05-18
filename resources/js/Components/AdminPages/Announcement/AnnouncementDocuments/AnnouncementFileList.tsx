import React, { useCallback, useState } from 'react'
import {
  Announcement,
  AnnouncementFile,
  UploadedFile,
} from '../../../../DataStructures/data_interfaces'
import AddButton from '../../../../ui/button/AddButton'
import Modal from '../../../../ui/modal/Modal'
import ChooseFile from '../../../Common/FIleUpload/ChooseFile'
import DeleteModal from '../../../../ui/modal/DeleteModal'
import ButtonBorderIcon from '../../../../ui/button/ButtonBorderIcon'
import { TrashIcon } from '@heroicons/react/20/solid'
import { router } from '@inertiajs/react'

interface Properties {
  announcement: Announcement
  files: AnnouncementFile[]
}

const AnnouncementFileList = ({ announcement, files }: Properties) => {
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<AnnouncementFile | null>(null)

  const onFile = useCallback(
    (file: UploadedFile) => {
      if (file == null) {
        return
      }
      router.post(
        '/attach-announcement-file',
        {
          announcement_id: announcement.id,
          document_id: file.id,
        },
        {
          preserveState: false,
        }
      )
    },
    [announcement]
  )

  const selectFileForDeletion = useCallback((file: AnnouncementFile) => {
    setSelectedFile(file)
    setShowDeleteModal(true)
  }, [])

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-8 lg:col-span-4'>
          <div className='flex justify-end'>
            <AddButton onClick={() => setShowFileUpload(true)} />
          </div>
          {files.length === 0 && (
            <div>
              <span>{announcement.type} Has No Documents Attached To It.</span>
            </div>
          )}
          <div className='grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4'>
            {files.map((file) => {
              return (
                <div
                  key={file.id.toString()}
                  className='flex  gap-2 rounded-md bg-white px-5 py-3 shadow hover:shadow-lg'
                >
                  <div className='flex flex-grow flex-col gap-2'>
                    <a
                      href={file.document?.url ?? ''}
                      target='_blank'
                      rel='noreferrer'
                      className='link'
                    >
                      {file.document?.name}
                    </a>
                  </div>
                  <div className='flex gap-3 self-center'>
                    <ButtonBorderIcon
                      type='danger'
                      onClick={() => selectFileForDeletion(file)}
                    >
                      <TrashIcon className='h-5 w-5 ' />
                    </ButtonBorderIcon>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {showFileUpload && (
        <Modal
          setShowModal={setShowFileUpload}
          title={'Select Document'}
          large
        >
          <ChooseFile onFile={onFile} />
        </Modal>
      )}
      {showDeleteModal && (
        <DeleteModal
          title='Delete Document'
          setShowModal={setShowDeleteModal}
          url={`/remove-announcement-file/${selectedFile?.id}`}
        >
          <p>Conform Deleting {selectedFile?.document?.name}?</p>
        </DeleteModal>
      )}
    </>
  )
}

export default AnnouncementFileList
