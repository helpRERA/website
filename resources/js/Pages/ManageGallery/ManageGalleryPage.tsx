import ManageAlbums from '../../Components/AdminPages/ManageGallery/ManageAlbums'
import DashboardLayout from '../../Components/Layout/Dashboard/DashboardLayout'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import { Album } from '../../DataStructures/data_interfaces'
import { Paginator } from '../../ui/ui_interfaces'

interface Properties {
  albums: Paginator<Album>
}

const ManageGalleryPage = ({ albums }: Properties) => {
  return (
    <PaddedDashboardContent>
      <ManageAlbums albums={albums} />
    </PaddedDashboardContent>
  )
}

export default ManageGalleryPage
