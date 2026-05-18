import { useMemo } from 'react'
import ComplaintList from '../../Components/ComplaintList/ComplaintList'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'
import { Language, Paginator } from '../../ui/ui_interfaces'
import { ReliefSought } from '../../DataStructures/krera_interfaces'

export interface Complaint {
  ID: string
  SrNo: string
  ComplaintID: string
  ComplaintNo: string
  ComplaintYear: string
  CertiNo: string
  ComplainantName: string
  RespondentName: string
  ProjectName: string | null
  RulingorJudge_Date: string
  InteriumOrder: string
  FinalOrder: string
  RulingByMaharera: string
  JudgementByOfficer: string
  Tbl_Name: 'RegisteredAppeal' | 'tbl_Complaint' | 'AlreadyRegisteredComplaints'
}

interface Properties {
  complaints: Paginator<Complaint>
  lang?: Language
  oldSearch: string
  oldRulingBy: string
  oldSort: string
  reliefSought: ReliefSought[]
}

const ComplaintListPage = ({
  lang = 'en',
  complaints,
  oldSearch,
  oldRulingBy,
  oldSort,
  reliefSought,
}: Properties) => {
  const links = useMemo(() => {
    return {
      title: { english: 'Complaint List', malayalam: '' },
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
              name: { english: 'Complaint List', malayalam: '' },
              link: '/complaint-list',
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
        <ComplaintList
          complaints={complaints}
          oldSearch={oldSearch}
          oldRulingBy={oldRulingBy}
          oldSort={oldSort}
          reliefSought={reliefSought}
        />
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default ComplaintListPage
