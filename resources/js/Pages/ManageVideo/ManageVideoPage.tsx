import ManageVideo from '../../Components/AdminPages/ManageVideo/ManageVideo'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import { GalleryVideo } from '../../DataStructures/data_interfaces'
import { Paginator } from '../../ui/ui_interfaces'

interface Properties {
  videos: Paginator<GalleryVideo>
}

const ManageVideoPage = ({ videos }: Properties) => {
  return (
    <PaddedDashboardContent>
      <ManageVideo videos={videos} />
    </PaddedDashboardContent>
  )
}

export default ManageVideoPage
