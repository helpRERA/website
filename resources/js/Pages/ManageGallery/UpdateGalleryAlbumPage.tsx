import UpdateAlbum from '../../Components/AdminPages/ManageGallery/UpdateAlbum'
import DashboardLayout from '../../Components/Layout/Dashboard/DashboardLayout'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import { Album } from '../../DataStructures/data_interfaces'

interface Properties {
  album: Required<Album>
}

const UpdateGalleryAlbumPage = ({ album }: Properties) => {
  return (
    <PaddedDashboardContent>
      <UpdateAlbum album={album} />
    </PaddedDashboardContent>
  )
}

export default UpdateGalleryAlbumPage
