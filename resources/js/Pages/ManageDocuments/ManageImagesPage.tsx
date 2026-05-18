import ManageImages from '../../Components/AdminPages/ManageFIles/Images/ManageImages'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import { Image } from '../../DataStructures/data_interfaces'
import { UploadedImage } from '../../DataStructures/krera_interfaces'
import { Paginator } from '../../ui/ui_interfaces'

interface Properties {
  images: Paginator<Image>
}

const ManageImagesPage = ({ images }: Properties) => {
  return (
    <PaddedDashboardContent>
      <ManageImages images={images} />
    </PaddedDashboardContent>
  )
}

export default ManageImagesPage
