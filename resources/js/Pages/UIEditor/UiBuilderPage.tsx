import PageBuilder from '../../Components/UiBuilder/PageBuilder/PageBuilder'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import { Page } from '../../DataStructures/ui_builder_interfaces'
import { PageDataDependencies } from './OutputPage'
import DashboardLayout from '../../Components/Layout/Dashboard/DashboardLayout'

interface Properties {
  page: Page
  dependencies: PageDataDependencies
}

const UiBuilderPage = ({ page, dependencies }: Properties) => {
  return (
    <DashboardLayout>
      <PageBuilder
        page={page}
        dependencies={dependencies}
      />
    </DashboardLayout>
  )
}

export default UiBuilderPage
