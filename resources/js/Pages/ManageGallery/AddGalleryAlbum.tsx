import GalleryForm from '../../Components/AdminPages/ManageGallery/GalleryForm'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import { Album } from '../../DataStructures/data_interfaces'

const AddGalleryAlbum = ({ album }: { album: Album }) => {
  return (
    <PaddedDashboardContent>
      <GalleryForm album={album} />
    </PaddedDashboardContent>
  )
}

export default AddGalleryAlbum
