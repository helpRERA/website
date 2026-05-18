import React from 'react'
import AppLayout from '../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../Components/Layout/AppLayout/AppLayoutPadding'
import ExploreProject, { ProjectListItem } from '../Components/ExploreProject/ExploreProject'
import { District, Facility } from '../DataStructures/krera_interfaces'
import { Language, Paginator } from '../ui/ui_interfaces'

export interface ExploreProjectProperties {
  projects: Paginator<ProjectListItem>
  districts: District[]
  amenities: Pick<Facility, 'FDetailName'>[]
  oldSearch: string
  oldDistrict: string
  oldTaluk: string
  oldVillage: string
  oldProjectType: string
  oldBuildingType: string
  oldAmenities: string
  oldMinimumUnits: number
  oldMaximumUnits: number
  oldMinimumAvailableUnits: number
  oldMaximumAvailableUnits: number
  oldStatus: string
  oldSortOrder: string
  oldSortBy: string
  today: string
  lang?: Language
}

const ExploreProjectsPage = ({
  projects,
  districts,
  amenities,
  oldSearch,
  oldDistrict,
  oldTaluk,
  oldVillage,
  oldProjectType,
  oldBuildingType,
  oldAmenities,
  oldMinimumUnits,
  oldMaximumUnits,
  oldMinimumAvailableUnits,
  oldMaximumAvailableUnits,
  oldStatus,
  oldSortOrder,
  oldSortBy,
  today,
  lang = 'en',
}: ExploreProjectProperties) => {
  return (
    <AppLayout>
      <AppLayoutPadding>
        <ExploreProject
          projects={projects}
          districts={districts}
          amenities={amenities}
          oldSearch={oldSearch}
          oldDistrict={oldDistrict}
          oldTaluk={oldTaluk}
          oldVillage={oldVillage}
          oldProjectType={oldProjectType}
          oldBuildingType={oldBuildingType}
          oldAmenities={oldAmenities}
          oldMinimumUnits={oldMinimumUnits}
          oldMaximumUnits={oldMaximumUnits}
          oldMinimumAvailableUnits={oldMinimumAvailableUnits}
          oldMaximumAvailableUnits={oldMaximumAvailableUnits}
          oldStatus={oldStatus}
          oldSortBy={oldSortBy}
          oldSortOrder={oldSortOrder}
          lang={lang}
          today={today}
        />
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default ExploreProjectsPage
