import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import { District, Project, ProjectStatusType } from '../../DataStructures/krera_interfaces'
import ProjectUnitsChart from '../../Components/DataDashboard/ProjectUnitsChart'
import React, { useCallback, useMemo, useState } from 'react'
import ProjectAreaChart from '../../Components/DataDashboard/ProjectAreaChart'
import MapCustomControl from '../../leaflet/MapCustomControl'
import DashboardTopSection from '../../Components/DataDashboard/DashboardTopSection'
import CloseSolid from '../../ui/icons/CloseSolid'
import ProjectCumulativeArea from '../../Components/DataDashboard/ProjectCumulativeArea'
import { Link } from '@inertiajs/react'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import SelectList from '../../ui/form/SelectList'

export interface ApartmentTypeSummary {
  type: string
  count: string
  District: string
  ProjectType: string
  ProjectYear: string
}

interface Props {
  registeredProjects: Pick<
    Project,
    | 'ID'
    | 'District'
    | 'PType'
    | 'ProjectStartDate'
    | 'ProjectEndDate'
    | 'TotalFloorAreaOfProjectProposedForRegistration'
    | 'TotalFloorAreaUnderResidentialUse'
    | 'TotalFloorAreaUnderOtherUse'
    | 'apartments'
    | 'project_type'
    | 'NumberOfResidentialUnits'
    | 'NumberOfCommercialUnits'
    | 'Area'
    | 'ProjectType'
    | 'ProjectYear'
  >[]
  districts: District[]
  today: string
  promotersCount: number
  complaintsCount: number
  years: { year: string }[]
  projectTypes: ProjectStatusType[]
  apartmentTypeSummary: ApartmentTypeSummary[]
}

export default function DataDashboardPage({
  registeredProjects,
  districts,
  today,
  complaintsCount,
  promotersCount,
  years,
  projectTypes,
  apartmentTypeSummary,
}: Readonly<Props>) {
  const [selectedDistrict, setSelectedDistrict] = React.useState<District | null>(null)
  const [selectedYear, setSelectedYear] = useState(years.length > 0 ? years[0].year : '')
  const [selectedProjectType, setSelectedProjectType] = useState('')

  const handleDistrictChange = useCallback(
    (district: string | null) => {
      if (district == null || district === '') {
        setSelectedDistrict(null)
      }

      const districtRecord = districts.find((d) => d.Districtname === district)
      setSelectedDistrict(districtRecord ?? null)
    },
    [districts]
  )

  const districtChoropleth = useMemo(() => {
    const filteredByYear = registeredProjects.filter((project) => {
      if (project.ProjectYear == null) {
        return false
      }
      return selectedYear == '' || project.ProjectYear == selectedYear
    })

    return districts.map((district) => {
      return {
        district: district.Districtname,
        project_count: filteredByYear.filter((project) => {
          return (
            project.District === district.Districtcode &&
            (selectedProjectType == '' || project.ProjectType == selectedProjectType)
          )
        }).length,
      }
    })
  }, [districts, registeredProjects, selectedProjectType, selectedYear])

  const filteredProjects = useMemo(() => {
    return registeredProjects.filter((project) => {
      return (
        (selectedDistrict == null || project.District == selectedDistrict.Districtcode) &&
        (selectedProjectType == '' || project.ProjectType == selectedProjectType)
      )
    })
  }, [registeredProjects, selectedDistrict, selectedProjectType])

  const links = useMemo(() => {
    return {
      title: { english: 'Interactive Statistics', malayalam: '' },
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
              name: { english: 'Interactive Statistics', malayalam: '' },
              link: '/data-dashboard',
              external: false,
            },
          },
        ],
      },
    }
  }, [])

  return (
    <AppLayout>
      <div className='flex flex-col p-2'>
        <PageTitle block={links} />
        <AppLayoutPadding>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
            {/*Filters*/}
            <div
              className='mt-4 hidden grid-cols-10 justify-end gap-2 rounded-lg border-2
             border-primary-600 pr-1 lg:col-span-6 lg:col-start-7  lg:grid xl:col-span-7 xl:col-start-6'
            >
              <div className='col-span-1 flex w-full items-center justify-center rounded-l bg-slate-400 p-4'>
                <svg
                  fill='#0463A0'
                  height='30'
                  width='30'
                  version='1.1'
                  id='Capa_1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 210.68 210.68'
                >
                  <path
                    d='M205.613,30.693c0-10.405-10.746-18.149-32.854-23.676C154.659,2.492,130.716,0,105.34,0
	C79.965,0,56.021,2.492,37.921,7.017C15.813,12.544,5.066,20.288,5.066,30.693c0,3.85,1.476,7.335,4.45,10.479l68.245,82.777v79.23
	c0,2.595,1.341,5.005,3.546,6.373c1.207,0.749,2.578,1.127,3.954,1.127c1.138,0,2.278-0.259,3.331-0.78l40.075-19.863
	c2.55-1.264,4.165-3.863,4.169-6.71l0.077-59.372l68.254-82.787C204.139,38.024,205.613,34.542,205.613,30.693z M44.94,20.767
	C61.467,17.048,82.917,15,105.34,15s43.874,2.048,60.399,5.767c18.25,4.107,23.38,8.521,24.607,9.926
	c-1.228,1.405-6.357,5.819-24.607,9.926c-16.525,3.719-37.977,5.767-60.399,5.767S61.467,44.338,44.94,40.62
	c-18.249-4.107-23.38-8.521-24.607-9.926C21.56,29.288,26.691,24.874,44.94,20.767z M119.631,116.486
	c-1.105,1.341-1.711,3.023-1.713,4.761l-0.075,57.413l-25.081,12.432v-69.835c0-1.741-0.605-3.428-1.713-4.771L40.306,54.938
	C58.1,59.1,81.058,61.387,105.34,61.387c24.283,0,47.24-2.287,65.034-6.449L119.631,116.486z'
                  />
                </svg>
              </div>
              <div className='col-span-4 flex items-center gap-2 '>
                {selectedDistrict != null && (
                  <div className='flex items-center justify-between gap-2 rounded-full border border-gray-300  bg-[#b5e48c] px-4'>
                    <span>{selectedDistrict?.Districtname}</span>
                    <button
                      className='rounded-full p-1 hover:bg-gray-200 '
                      onClick={() => setSelectedDistrict(null)}
                    >
                      <CloseSolid />
                    </button>
                  </div>
                )}
                {selectedDistrict == null && (
                  <div className='flex items-center justify-between gap-2 rounded-full border border-gray-300 bg-[#b5e48c] bg-opacity-70 px-6 py-2'>
                    <span>All Districts</span>
                  </div>
                )}
              </div>
              <div className='col-span-2 flex flex-col justify-center'>
                <div className='flex flex-col'>
                  <SelectList
                    list={years}
                    dataKey='year'
                    displayKey='year'
                    setData={setSelectedYear}
                    data={selectedYear}
                    showAllOption
                    allOptionText='All Years'
                  />
                </div>
              </div>
              <div className='col-span-3 flex flex-col justify-center'>
                <div className='flex flex-col '>
                  <SelectList
                    list={projectTypes}
                    dataKey='Id'
                    displayKey='TypeName'
                    setData={setSelectedProjectType}
                    data={selectedProjectType}
                    showAllOption
                    allOptionText='All Project Types'
                  />
                </div>
              </div>
            </div>
            <div className='col-span-full hidden justify-end lg:flex '>
              <span className='text-xs'>Please select distrct from the map below</span>
            </div>

            <div className='flex flex-col gap-2 lg:col-span-5'>
              {/*Card*/}
              <div className='grid grid-cols-1 gap-5 pt-4 md:grid-cols-3 lg:pt-2'>
                <div className='col-span-full'>
                  <h2 className='text-xl font-bold'>Summary Stats</h2>
                  <p className='text-sm'>
                    Cumulative registrations in KRERA: Projects, promoters and complaint counts.
                  </p>
                </div>
                <Link
                  as='div'
                  href='/explore-projects'
                  className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded bg-primary-50 py-10 shadow-lg hover:bg-primary-100'
                >
                  <h2 className='text-2xl font-bold'>{registeredProjects.length}</h2>
                  <p className='text-center text-sm font-normal leading-6 text-gray-600 md:text-base'>
                    Registered Projects
                  </p>
                </Link>
                <Link
                  as='div'
                  href='/promoters'
                  className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded bg-primary-50 py-10 shadow-lg hover:bg-primary-100'
                >
                  <h2 className='text-2xl font-bold'>{promotersCount}</h2>
                  <p className='text-center text-sm font-normal leading-6 text-gray-600 md:text-base'>
                    Registered Promoters
                  </p>
                </Link>
                <Link
                  as='div'
                  href='/complaint-list'
                  className=' flex cursor-pointer flex-col items-center justify-center gap-2 rounded bg-primary-50 py-10 shadow-lg hover:bg-primary-100'
                >
                  <h2 className='text-2xl font-bold'>{complaintsCount}</h2>
                  <p className='text-center text-sm font-normal leading-6 text-gray-600 md:text-base'>
                    Registered Complaints
                  </p>
                </Link>
              </div>

              {/* filter for medium and small screens */}
              <div className='mt-4 grid md:grid-cols-5 lg:hidden'>
                <div
                  className='col-span-4 col-start-2 mt-2 grid grid-cols-7 justify-end gap-2 rounded-lg
                  border-2 border-primary-600 pr-1 lg:col-span-7 lg:col-start-9'
                >
                  <div className='col-span-1 flex w-full items-center justify-center rounded-l bg-slate-400 p-4'>
                    <svg
                      fill='#0463A0'
                      height='30'
                      width='30'
                      version='1.1'
                      id='Capa_1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 210.68 210.68'
                    >
                      <path
                        d='M205.613,30.693c0-10.405-10.746-18.149-32.854-23.676C154.659,2.492,130.716,0,105.34,0
	C79.965,0,56.021,2.492,37.921,7.017C15.813,12.544,5.066,20.288,5.066,30.693c0,3.85,1.476,7.335,4.45,10.479l68.245,82.777v79.23
	c0,2.595,1.341,5.005,3.546,6.373c1.207,0.749,2.578,1.127,3.954,1.127c1.138,0,2.278-0.259,3.331-0.78l40.075-19.863
	c2.55-1.264,4.165-3.863,4.169-6.71l0.077-59.372l68.254-82.787C204.139,38.024,205.613,34.542,205.613,30.693z M44.94,20.767
	C61.467,17.048,82.917,15,105.34,15s43.874,2.048,60.399,5.767c18.25,4.107,23.38,8.521,24.607,9.926
	c-1.228,1.405-6.357,5.819-24.607,9.926c-16.525,3.719-37.977,5.767-60.399,5.767S61.467,44.338,44.94,40.62
	c-18.249-4.107-23.38-8.521-24.607-9.926C21.56,29.288,26.691,24.874,44.94,20.767z M119.631,116.486
	c-1.105,1.341-1.711,3.023-1.713,4.761l-0.075,57.413l-25.081,12.432v-69.835c0-1.741-0.605-3.428-1.713-4.771L40.306,54.938
	C58.1,59.1,81.058,61.387,105.34,61.387c24.283,0,47.24-2.287,65.034-6.449L119.631,116.486z'
                      />
                    </svg>
                  </div>
                  <div className='col-span-2 flex items-center gap-2 '>
                    {selectedDistrict != null && (
                      <div className='flex items-center justify-between gap-2 rounded-full border border-gray-300 bg-[#b5e48c] px-4'>
                        <span>{selectedDistrict?.Districtname}</span>
                        <button
                          className='rounded-full p-1 hover:bg-gray-200 '
                          onClick={() => setSelectedDistrict(null)}
                        >
                          <CloseSolid />
                        </button>
                      </div>
                    )}
                    {selectedDistrict == null && (
                      <div className='flex items-center justify-between gap-2 rounded-full border border-gray-300 bg-[#b5e48c] px-6 py-2'>
                        <span>All Districts</span>
                      </div>
                    )}
                  </div>
                  <div className='col-span-2 flex flex-col  justify-center'>
                    <div className='flex flex-col'>
                      <SelectList
                        list={years}
                        dataKey='year'
                        displayKey='year'
                        setData={setSelectedYear}
                        data={selectedYear}
                        showAllOption
                        allOptionText='All Years'
                      />
                    </div>
                  </div>
                  <div className='col-span-2 flex flex-col justify-center'>
                    <div className='flex flex-col '>
                      <SelectList
                        list={projectTypes}
                        dataKey='Id'
                        displayKey='TypeName'
                        setData={setSelectedProjectType}
                        data={selectedProjectType}
                        showAllOption
                        allOptionText='All Project Types'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-full  flex justify-end lg:hidden '>
                <span className='text-xs'>Please select distrct from the map below</span>
              </div>

              {/* Pie chart */}
              <div className='col-span-full pt-4'>
                <h2 className='text-xl font-bold'>Project Categorization, Counts</h2>
                <p className='text-sm font-semibold'>
                  {selectedDistrict == null ? 'All Districts' : selectedDistrict.Districtname}
                  {selectedYear == '' ? '' : `, ${selectedYear} `}
                </p>
                <p className='py-1 text-sm'>
                  This visualization shows counts of new project registrations by unit types. The
                  second chart indicates the distribution of floor area in sqm among residential
                  projects registered in the selected year.{' '}
                </p>
                <DashboardTopSection
                  registeredProjects={filteredProjects}
                  selectedYear={selectedYear}
                  selectedDistrict={selectedDistrict}
                  apartmentTypeSummary={apartmentTypeSummary}
                  selectedProjectType={selectedProjectType}
                />
              </div>
            </div>
            <div className='flex flex-col gap-2 lg:col-span-7'>
              {/*Map*/}
              <MapCustomControl
                features={districtChoropleth}
                title='Registered Projects'
                handleDistrictChange={handleDistrictChange}
              />
            </div>
            <div className='flex flex-col lg:col-span-full'>
              <div className='mt-8 w-full'>
                <ProjectUnitsChart
                  registeredProjects={filteredProjects}
                  selectedYear={selectedYear}
                  selectedDistrict={selectedDistrict}
                  today={today}
                />
              </div>
              <ProjectAreaChart
                registeredProjects={filteredProjects}
                districts={districts}
                today={today}
                selectedYear={selectedYear}
                selectedDistrict={selectedDistrict}
              />
              <ProjectCumulativeArea
                registeredProjects={filteredProjects}
                districts={districts}
                today={today}
                selectedYear={selectedYear}
                selectedDistrict={selectedDistrict}
              />
              {/*<TreeMap*/}
              {/*  registeredProjects={filteredProjects}*/}
              {/*  selectedYear={Number(selectedYear)}*/}
              {/*  selectedDistrict={selectedDistrict}*/}
              {/*/>*/}
            </div>
          </div>
        </AppLayoutPadding>
      </div>
    </AppLayout>
  )
}
