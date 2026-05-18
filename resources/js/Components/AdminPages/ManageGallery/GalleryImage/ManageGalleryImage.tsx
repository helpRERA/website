import { router } from '@inertiajs/react'
import { useCallback, useState } from 'react'
import { Album, AlbumImage, Image } from '../../../../DataStructures/data_interfaces'
import AddButton from '../../../../ui/button/AddButton'
import DeleteButton from '../../../../ui/button/DeleteButton'
import DeleteModal from '../../../../ui/modal/DeleteModal'
import Modal from '../../../../ui/modal/Modal'
import ChooseImage from '../../../Common/ImageUpload/ChooseImage'

const ManageGalleryImage = ({ album }: { album: Album }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteAlbumModal, setShowDeleteAlbumModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<AlbumImage | null>(null)

  const saveImage = (image: Image) => {
    setShowDeleteAlbumModal(false)
    router.post(`/gallery-image`, {
      album_id: album.id,
      image_id: image.id,
      caption: image.name,
      url: image.url,
    })
  }

  const openDeleteImage = useCallback((image: AlbumImage | null) => {
    setSelectedImage(image)
    setShowDeleteAlbumModal(true)
  }, [])

  return (
    <div className='mt-5 flex flex-col gap-5'>
      <div className='flex justify-end'>
        <AddButton onClick={() => setShowAddModal(true)} />
      </div>
      <div className='mt-10 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4'>
        {album.images?.map((image) => {
          return (
            <div
              className='flex flex-col gap-2'
              key={image.id.toString()}
            >
              <img
                src={image.url}
                alt={image.caption}
              />
              <div className='flex w-full flex-wrap items-center justify-between'>
                <p>{image.caption}</p>
                <div className='flex flex-wrap gap-1'>
                  <DeleteButton onClick={() => openDeleteImage(image)} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {showAddModal && (
        <Modal
          title='Add New Image'
          setShowModal={setShowAddModal}
        >
          <ChooseImage onImage={saveImage} />
        </Modal>
      )}
      {showDeleteAlbumModal && selectedImage != null && (
        <DeleteModal
          url={`/gallery-image/${selectedImage.id}`}
          title={`Remove ${selectedImage.caption}`}
          setShowModal={setShowDeleteAlbumModal}
        >
          <p>Are you sure you want to delete {selectedImage.caption} ? </p>
        </DeleteModal>
      )}
    </div>
  )
}

export default ManageGalleryImage
