import { useMemo } from 'react'
import CausesList from '../../Components/CausesList/CausesList'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'
import { Language, Paginator } from '../../ui/ui_interfaces'

export interface CauseListItem {
  ComplaintNumber: string
  RegistrationNo: string
  ComplainantName: string
  Nameofrespondent: string
  HearingDate: string
  HearingTime: string
  Cause: string
  DailyProceedings: string
}

interface Properties {
  causes: Paginator<CauseListItem>
  lang?: Language
  oldDate: string
  oldAuthority: string
}

const CauseListPage = ({ causes, lang = 'en', oldDate, oldAuthority }: Properties) => {
  const links = useMemo(() => {
    return {
      title: { english: 'Case List', malayalam: '' },
      links: {
        lastUUID: 2,
        items: [
          {
            id: 1,
            item: { name: { english: 'Home', malayalam: '' }, link: '/', external: false },
          },
          {
            id: 2,
            item: {
              name: { english: 'Case List', malayalam: '' },
              link: '/cause-list',
              external: false,
            },
          },
        ],
      },
    }
  }, [])

  return (
    <AppLayout>
      <PageTitle
        block={links}
        language={lang}
      />
      <AppLayoutPadding>
        <CausesList
          causes={causes}
          oldDate={oldDate}
          oldAuthority={oldAuthority}
        />
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default CauseListPage
