import FooterEditor from '../../Components/AdminPages/FooterEditor/FooterEditor'
import DashboardLayout from '../../Components/Layout/Dashboard/DashboardLayout'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'

interface Properties {
  footer: FooterDataInterface
}

const FooterEditorPage = ({ footer }: Properties) => {
  return (
    <PaddedDashboardContent>
      <FooterEditor footer={footer} />
    </PaddedDashboardContent>
  )
}

export default FooterEditorPage
