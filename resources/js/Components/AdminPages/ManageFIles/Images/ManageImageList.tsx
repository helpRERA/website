import { useCallback, useState } from 'react'
import { Image } from '../../../../DataStructures/data_interfaces'
import DeleteButton from '../../../../ui/button/DeleteButton'
import Pagination from '../../../../ui/table/Pagination'
import { Paginator } from '../../../../ui/ui_interfaces'
import DeleteModal from '../../../../ui/modal/DeleteModal'

interface Properties {
  images: Paginator<Image>
}

const ManageImageList = ({ images }: Properties) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)

  const openDeleteImage = useCallback((image: Image | null) => {
    setSelectedImage(image)
    setShowDeleteModal(true)
  }, [])
  return (
    <>
      <div className='grid grid-cols-2 gap-5 p-5 md:grid-cols-3 lg:grid-cols-4'>
        {images.data.map((image) => (
          <div
            key={image.id.toString()}
            className='flex cursor-pointer flex-col gap-2 rounded-md bg-neutral-600  shadow hover:bg-neutral-500 hover:shadow-lg'
          >
            <img
              src={image.url ?? ''}
              alt={image.name}
              className='aspect-[4/3] w-full'
            />
            <div className='flex w-full flex-col gap-4 p-2'>
              <h4>{image.name}</h4>
              <p>{image.url}</p>
            </div>
            <div className='flex flex-wrap justify-end gap-1 p-4'>
              <DeleteButton onClick={() => openDeleteImage(image)} />
            </div>
          </div>
        ))}
      </div>
      {showDeleteModal && selectedImage != null && (
        <DeleteModal
          url={`/manage-images/${selectedImage.id}`}
          title={`Remove ${selectedImage.name}`}
          setShowModal={setShowDeleteModal}
        >
          <p>Are you sure you want to delete {selectedImage.name} ? </p>
        </DeleteModal>
      )}
      <div className='mt-10'>
        <Pagination pagination={images} />
      </div>
    </>
  )
}

export default ManageImageList
