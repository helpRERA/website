import { useState } from 'react'
import { GalleryVideo } from '../../../DataStructures/data_interfaces'
import AddButton from '../../../ui/button/AddButton'
import DeleteButton from '../../../ui/button/DeleteButton'
import Card from '../../../ui/card/Card'
import DeleteModal from '../../../ui/modal/DeleteModal'
import Modal from '../../../ui/modal/Modal'
import Pagination from '../../../ui/table/Pagination'
import { Language, Paginator } from '../../../ui/ui_interfaces'
import AddVideoForm from './AddVideoForm'
import Localization from '../../../ui/Localization'
import EditButton from '../../../ui/button/EditButton'

interface Properties {
  videos: Paginator<GalleryVideo>
  language?: Language
}

const ManageVideo = ({ videos, language = 'en' }: Properties) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const toggleDelete = (video: GalleryVideo | null = null) => {
    setSelectedVideo(video)
    setShowDeleteModal(video != null)
  }

  const toggleUpdate = (video: GalleryVideo | null = null) => {
    setSelectedVideo(video)
    setShowModal(video != null)
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-end'>
        <AddButton onClick={() => setShowModal(true)} />
      </div>
      <div className='my-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {videos.data.map((video: GalleryVideo) => {
          return (
            <Card key={video.id.toString()}>
              <iframe
                className='aspect-video w-full'
                src={video.url}
                allowFullScreen
              />

              <div className='flex  p-2'>
                <Localization
                  language={language}
                  text={{ english: video.caption, malayalam: video.caption_malayalam ?? '' }}
                />
                <div className='self ml-auto'> {video.date}</div>
              </div>

              <div className='flex w-full justify-end gap-4 p-2'>
                <EditButton onClick={() => toggleUpdate(video)} />
                <DeleteButton onClick={() => toggleDelete(video)} />
              </div>
            </Card>
          )
        })}
      </div>
      <div className='my-10'>
        <Pagination pagination={videos} />
      </div>
      {showModal && (
        <Modal
          title={selectedVideo ? 'Edit Video' : 'Add Video'}
          setShowModal={() => toggleUpdate(null)}
          large
        >
          <div className='p-2'>
            <AddVideoForm
              setShowModal={setShowModal}
              video={selectedVideo}
            />
          </div>
        </Modal>
      )}
      {selectedVideo && showDeleteModal && (
        <DeleteModal
          title={`Remove ${selectedVideo.caption}`}
          setShowModal={() => toggleDelete(null)}
          url={`/manage-video/${selectedVideo.id}`}
        >
          <p>Are You Sure You Want To Delete Video?</p>
        </DeleteModal>
      )}
    </div>
  )
}

export default ManageVideo
