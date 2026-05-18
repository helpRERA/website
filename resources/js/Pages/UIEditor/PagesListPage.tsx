import PageList from '../../Components/UiBuilder/PageBuilder/PageList'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import { Page } from '../../DataStructures/ui_builder_interfaces'
import { Paginator } from '../../ui/ui_interfaces'

const PagesListView = ({ pages }: { pages: Paginator<Page> }) => {
  return (
    <PaddedDashboardContent>
      <PageList pages={pages} />
    </PaddedDashboardContent>
  )
}

export default PagesListView
