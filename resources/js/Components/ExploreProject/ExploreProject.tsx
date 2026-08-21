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
  IsDefault?: number 
  DefaultReason?: string | null
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
      <div className='relative flex min-h-[475px] w-full flex-col items-center justify-center bg-[url("/imge/newhome.webp")] bg-cover bg-center'>
        <div className='absolute inset-0 bg-black/40'></div>
        <div className='z-10 flex flex-col items-center text-white pb-20'>
          <h1 className='text-3xl font-bold md:text-4xl lg:text-5xl'>
            <Localization
              text={localization['Explore Projects']}
              language={lang}
            />
          </h1>
          <div className='mt-2 text-sm font-medium'>
            <span>Home</span> <span className='mx-2'>&gt;</span> <span>Explore Projects</span>
          </div>
        </div>
      </div>

      <div className='cmpad relative z-20 mx-auto -mt-36 md:-mt-40 flex w-full flex-col pb-10'>
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

        <div className='mt-10 flex flex-col items-center justify-between gap-4 md:flex-row'>
          <div className='text-[15px] text-gray-500'>
            Showing Results for {projects.total} K-rera registered projects
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-[14px] text-gray-600'>Sort By:</span>
            <div className='w-[140px]'>
              <SelectList
                label={""}
                list={sortBy}
                dataKey='id'
                displayKey='label'
                setData={sortChange}
                data={sort}
                className='rounded-full'
              />
            </div>
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
      </div>
    </>
  )
}

export default ExploreProject
