import { useMemo } from 'react'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import ProjectList from '../../Components/ProjectList/ProjectList'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'
import { District } from '../../DataStructures/krera_interfaces'
import { Language, Paginator } from '../../ui/ui_interfaces'

export interface ProjectListData {
  Project: string
  PromoterName: string
  ProjectType: string
  ProjectStartDate: string
  DateOfCompletion: string | null
  CertiNo: string
  Certificate_Date: string
  lastModifiedDate: string
  Total: string
  Sold: string
  Status: string
  District: string
  Village: string
  Taluka: string
}

interface Properties {
  projects: Paginator<ProjectListData>
  districts: District[]
  lang?: Language
  oldProjectName?: string
  oldRegistrationNumber?: string
  oldDistrict?: string
  oldTaluk?: string
  oldVillage?: string
  oldPincode?: string
  oldWorkStatus?: string
  oldFrom?: string
  oldTo?: string
}

const ProjectListPage = ({
  projects,
  districts,
  lang = 'en',
  oldProjectName = '',
  oldRegistrationNumber = '',
  oldDistrict = '',
  oldTaluk = '',
  oldVillage = '',
  oldPincode = '',
  oldWorkStatus = '',
  oldFrom = '',
  oldTo = '',
}: Properties) => {
  const links = useMemo(() => {
    return {
      title: { english: 'Projects', malayalam: '' },
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
              name: { english: 'Projects', malayalam: '' },
              link: '/projects',
              external: false,
            },
          },
        ],
      },
    }
  }, [])

  return (
    <AppLayout>
      <PageTitle block={links} />
      <AppLayoutPadding>
        <ProjectList
          projects={projects}
          districts={districts}
          lang={lang}
          oldProjectName={oldProjectName}
          oldRegistrationNumber={oldRegistrationNumber}
          oldDistrict={oldDistrict}
          oldTaluk={oldTaluk}
          oldVillage={oldVillage}
          oldPincode={oldPincode}
          oldWorkStatus={oldWorkStatus}
          oldFrom={oldFrom}
          oldTo={oldTo}
        />
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default ProjectListPage
