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
      <div className='relative flex min-h-[475px] w-full flex-col items-center justify-center bg-[url("/imge/newhome.webp")] bg-cover bg-center'>
        <div className='absolute inset-0 bg-black/40'></div>
        <div className='z-10 flex flex-col items-center text-white pb-20'>
          <h1 className='text-3xl font-bold md:text-4xl lg:text-5xl' style={{ fontFamily: "'Urbanist', sans-serif" }}>
            Complaint List
          </h1>
          <div className='mt-2 text-sm font-medium flex gap-2 items-center text-gray-200'>
            <a href='/' className='hover:text-white transition-colors'>Home</a>
            <span>&gt;</span>
            <span className='text-white'>Complaint List</span>
          </div>
        </div>
      </div>
      
      <div className='cmpad relative z-20 mx-auto -mt-36 md:-mt-40 flex w-full max-w-[1280px] flex-col pb-10'>
        <ComplaintList
          complaints={complaints}
          oldSearch={oldSearch}
          oldRulingBy={oldRulingBy}
          oldSort={oldSort}
          reliefSought={reliefSought}
        />
      </div>
    </AppLayout>
  )
}

export default ComplaintListPage
