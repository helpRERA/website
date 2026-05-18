import { router } from '@inertiajs/react'
import { useState } from 'react'
import { Album } from '../../../DataStructures/data_interfaces'
import DeleteButton from '../../../ui/button/DeleteButton'
import EditButton from '../../../ui/button/EditButton'
import Card from '../../../ui/card/Card'
import CardHeader from '../../../ui/card/CardHeader'
import DeleteModal from '../../../ui/modal/DeleteModal'
import ManageGalleryImage from './GalleryImage/ManageGalleryImage'

const UpdateAlbum = ({ album }: { album: Required<Album> }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const openEdit = () => {
    router.get(`/manage-gallery/${album.id}/edit`)
  }

  return (
    <>
      <Card>
        <CardHeader
          title={album.name}
          back='/manage-gallery'
        />
        <div className='flex justify-end gap-5'>
          <EditButton onClick={() => openEdit()} />
          <DeleteButton onClick={() => setShowDeleteModal(true)} />
        </div>
      </Card>
      <ManageGalleryImage album={album} />
      {showDeleteModal && (
        <DeleteModal
          url={`/manage-gallery/${album.id}`}
          title={`Remove Album`}
          setShowModal={setShowDeleteModal}
        >
          <p>Are you sure you want to delete {album.name} ? </p>
        </DeleteModal>
      )}
    </>
  )
}

export default UpdateAlbum
