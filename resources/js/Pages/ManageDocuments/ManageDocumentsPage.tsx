import ManageDocuments from '../../Components/AdminPages/ManageFIles/Documents/ManageDocuments'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import { UploadedFile } from '../../DataStructures/data_interfaces'
import { Paginator } from '../../ui/ui_interfaces'

interface Properties {
  documents: Paginator<UploadedFile>
}

const ManageDocumentsPage = ({ documents }: Properties) => {
  return (
    <PaddedDashboardContent>
      <ManageDocuments documents={documents} />
    </PaddedDashboardContent>
  )
}
export default ManageDocumentsPage
