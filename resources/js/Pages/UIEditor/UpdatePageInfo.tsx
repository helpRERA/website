import EditPage from '../../Components/UiBuilder/PageBuilder/EditPage'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import { Page } from '../../DataStructures/ui_builder_interfaces'

interface Properties {
  page: Page
}

const UpdatePageInfo = ({ page }: Properties) => {
  return (
    <PaddedDashboardContent>
      <EditPage page={page} />
    </PaddedDashboardContent>
  )
}

export default UpdatePageInfo
