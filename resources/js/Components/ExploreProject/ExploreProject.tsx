import React, { useCallback, useEffect, useState } from 'react'
import ProjectList from './ProjectList/ProjectList'
import SelectList from '../../ui/form/SelectList'
import Pagination from '../../ui/table/Pagination'
import ProjectFilterForm from './ProjectFilterForm/ProjectFilterForm'
import { ExploreProjectProperties } from '../../Pages/ExploreProjectsPage'
import { Certificate, Project, ProjectDocument } from '../../DataStructures/krera_interfaces'
import { router } from '@inertiajs/react'
import Localization, { displayText } from '../../ui/Localization'
import { localization } from '../../Localization/localization'
import FullSpinnerWrapper from '../../ui/FullSpinnerWrapper'

export interface ProjectListItem extends Project {
  booked_count: number
  apartment_count: number
  documents: Pick<ProjectDocument, 'ID' | 'DocID' | 'ProjectId' | 'DocumentName'>[]
  certificate_info?: Pick<Certificate, 'CertificateNo'>
  today: string
}

const sortBy = [
  {
    id: 5,
    label: 'Newest',
    field: 'certificatePID',
    order: 'desc',
  },
  {
    id: 6,
    label: 'Oldest',
    field: 'certificatePID',
    order: 'asc',
  },
  {
    id: 1,
    field: 'Name',
    label: 'Name (A-Z)',
    order: 'asc',
  },
  {
    id: 2,
    field: 'Name',
    label: 'Name (Z-A)',
    order: 'desc',
  },
  {
    id: 3,
    field: 'ProposedDateOfCompletion',
    label: 'Proposed Date Of Completion (Low To High)',
    order: 'asc',
  },
  {
    id: 4,
    field: 'ProposedDateOfCompletion',
    label: 'Proposed Date Of Completion (High To Low)',
    order: 'desc',
  },
]

const ExploreProject = ({
  projects,
  districts,
  amenities,
  oldSearch,
  oldDistrict,
  oldTaluk,
  oldVillage,
  oldBuildingType,
  oldProjectType,
  oldAmenities,
  oldMinimumUnits,
  oldMaximumUnits,
  oldMinimumAvailableUnits,
  oldMaximumAvailableUnits,
  oldStatus,
  oldSortBy,
  oldSortOrder,
  today,
  lang = 'en',
}: ExploreProjectProperties) => {
  const [sort, setSort] = useState('1')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (oldSortBy && oldSortOrder) {
      const oldSort = sortBy.find((item) => item.field === oldSortBy && item.order === oldSortOrder)
      if (oldSort != null) {
        setSort(oldSort.id.toString())
      }
    }
  }, [oldSortBy, oldSortOrder])

  const sortChange = useCallback((value: string) => {
    setSort(value)
    const sortItem = sortBy.find((item) => item.id.toString() === value)
    if (sortItem != null) {
      setLoading(true)
      router.get(
        '/explore-projects',
        {
          sort_by: sortItem.field,
          sort_order: sortItem.order,
        },
        {
          onFinish: () => {
            setLoading(false)
          },
        }
      )
    }
  }, [])

  return (
    <>
      <div className='flex flex-col'>
        <div className='my-7 flex flex-col'>
          <h1 className='flex w-full justify-start py-3 text-lg font-extrabold md:text-xl lg:text-2xl'>
            <Localization
              text={localization['Explore Projects']}
              language={lang}
            />
          </h1>
        </div>
        <div className='flex flex-col lg:flex-row'>
          {/*Form*/}
          <ProjectFilterForm
            districts={districts}
            oldSearch={oldSearch}
            amenities={amenities}
            oldDistrict={oldDistrict}
            oldTaluk={oldTaluk}
            oldVillage={oldVillage}
            oldBuildingType={oldBuildingType}
            oldProjectType={oldProjectType}
            oldAmenities={oldAmenities}
            oldMinimumUnits={oldMinimumUnits}
            oldMaximumUnits={oldMaximumUnits}
            oldMinimumAvailableUnits={oldMinimumAvailableUnits}
            oldMaximumAvailableUnits={oldMaximumAvailableUnits}
            oldStatus={oldStatus}
            oldSortBy={oldSortBy}
            oldSortOrder={oldSortOrder}
            today={today}
            lang={lang}
            setLoading={setLoading}
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <div className='flex flex-col'>
          <SelectList
            label={`${displayText(localization['Sort By'], lang)}`}
            list={sortBy}
            dataKey='id'
            displayKey='label'
            setData={sortChange}
            data={sort}
          />
        </div>
      </div>
      <FullSpinnerWrapper processing={loading}>
        <ProjectList
          projects={projects}
          lang={lang}
          today={today}
        />
        <div className='my-8'>
          <Pagination pagination={projects} />
        </div>
      </FullSpinnerWrapper>
    </>
  )
}

export default ExploreProject
