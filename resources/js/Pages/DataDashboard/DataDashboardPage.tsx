import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import { District, Project, ProjectStatusType } from '../../DataStructures/krera_interfaces'
import ProjectUnitsChart from '../../Components/DataDashboard/ProjectUnitsChart'
import React, { useCallback, useMemo, useState } from 'react'
import ProjectAreaChart from '../../Components/DataDashboard/ProjectAreaChart'
import MapCustomControl from '../../leaflet/MapCustomControl'
import DashboardTopSection from '../../Components/DataDashboard/DashboardTopSection'
import ProjectCumulativeArea from '../../Components/DataDashboard/ProjectCumulativeArea'
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
    | 'Name'
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
  registeredAgents: number
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
  registeredAgents,
  years,
  projectTypes,
  apartmentTypeSummary,
}: Readonly<Props>) {
  const [selectedDistrict, setSelectedDistrict] = React.useState<District | null>(null)
  const [selectedYear, setSelectedYear] = useState(years.length > 0 ? years[0].year : '')
  const [selectedProjectType, setSelectedProjectType] = useState('')
  const [projectName, setProjectName] = useState('')

  const handleDistrictChange = useCallback(
    (district: string | null) => {
      if (district == null || district === '') {
        setSelectedDistrict(null)
      } else {
        const districtRecord = districts.find((d) => d.Districtname === district)
        setSelectedDistrict(districtRecord ?? null)
      }
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
        (selectedProjectType == '' || project.ProjectType == selectedProjectType) &&
        (projectName == '' || (project.Name && project.Name.toLowerCase().includes(projectName.toLowerCase())))
      )
    })
  }, [registeredProjects, selectedDistrict, selectedProjectType, projectName])

  const unitsRegistered = useMemo(() => {
    return filteredProjects.reduce((acc, p) => {
      return acc + Number(p.NumberOfResidentialUnits || 0) + Number(p.NumberOfCommercialUnits || 0)
    }, 0)
  }, [filteredProjects])

  return (
    <AppLayout>
      <div className='relative flex h-[320px] md:min-h-[475px] w-full flex-col items-center justify-center bg-[url("/imge/newhome.webp")] bg-cover bg-center'>
        <div className='absolute inset-0 bg-black/40'></div>
        <div className='z-10 flex flex-col items-center text-white pt-12 md:pt-16 pb-10 md:pb-4'>
          <h1 className='text-3xl font-bold md:text-4xl lg:text-5xl' style={{ fontFamily: "'Urbanist', sans-serif" }}>
            Statistics
          </h1>
          <div className='mt-2 text-sm font-medium flex gap-2 items-center text-gray-200'>
            <a href='/' className='hover:text-white transition-colors'>Home</a>
            <span>&gt;</span>
            <span className='text-white'>Statistics</span>
          </div>
        </div>
      </div>

      <div className='cmpad relative z-20 mx-auto -mt-24 flex w-full flex-col pb-10 md:-mt-28'>
        <div className='w-full'>
          <div className='mb-8 rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
            <h2 
              className='mb-6 text-[#085484] font-medium text-xl md:text-[27px]' 
              style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 500 }}
            >
              Data Dashboard
            </h2>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-[#0463A0]'>Project Name</label>
                <input
                  type='text'
                  className='w-full h-[42px] rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#0463A0] focus:outline-none focus:ring-1 focus:ring-[#0463A0]'
                  placeholder='Enter Project Name'
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-[#0463A0]'>Project Type</label>
                <SelectList
                  list={projectTypes}
                  dataKey='Id'
                  displayKey='TypeName'
                  setData={setSelectedProjectType}
                  data={selectedProjectType}
                  showAllOption
                  allOptionText='Select Project Type'
                  className='rounded-lg border-gray-300 py-2.5 text-sm h-[42px]'
                />
              </div>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-[#0463A0]'>District</label>
                <select
                  className='w-full h-[42px] rounded-lg border border-gray-300 bg-white p-2.5 text-sm focus:border-[#0463A0] focus:outline-none focus:ring-1 focus:ring-[#0463A0]'
                  value={selectedDistrict?.Districtname || ''}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                >
                  <option value=''>Select District</option>
                  {districts.map((d) => (
                    <option key={d.Districtcode} value={d.Districtname}>
                      {d.Districtname}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-[#0463A0]'>Year</label>
                <SelectList
                  list={years}
                  dataKey='year'
                  displayKey='year'
                  setData={setSelectedYear}
                  data={selectedYear}
                  showAllOption
                  allOptionText='Select Year'
                  className='rounded-lg border-gray-300 py-2.5 text-sm h-[42px]'
                />
              </div>
            </div>
            <div className='mt-6 flex gap-4'>
              <button
                className='rounded-md bg-[#0463A0] px-8 py-2 text-sm font-semibold text-white hover:bg-blue-800'
                onClick={() => {}}
              >
                Search
              </button>
              <button
                className='rounded-md border border-[#0463A0] bg-white px-8 py-2 text-sm font-semibold text-[#0463A0] hover:bg-gray-50'
                onClick={() => {
                  setProjectName('')
                  setSelectedProjectType('')
                  handleDistrictChange(null)
                  setSelectedYear('')
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div className='mb-8'>
            <h2 
              className='mb-4 text-[#085484] font-medium text-lg md:text-[22px]' 
              style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 500 }}
            >
              Summary Stats
            </h2>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              <div className='flex flex-col justify-center rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
                <div className='mb-4'>
                  <img src='/svg/rgagent.svg' alt='Registered Agents' className='h-7 w-7 object-contain' />
                </div>
                <h3 className='text-3xl font-bold text-gray-800'>{registeredAgents}</h3>
                <p className='text-sm text-gray-500'>Registered Agents</p>
              </div>
              <div className='flex flex-col justify-center rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
                <div className='mb-4'>
                  <img src='/svg/rgprojects.svg' alt='Registered Projects' className='h-7 w-7 object-contain' />
                </div>
                <h3 className='text-3xl font-bold text-gray-800'>{registeredProjects.length}</h3>
                <p className='text-sm text-gray-500'>Registered Projects</p>
              </div>
              <div className='flex flex-col justify-center rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
                <div className='mb-4'>
                  <img src='/svg/rgpromoter.svg' alt='Registered Promoters' className='h-7 w-7 object-contain' />
                </div>
                <h3 className='text-3xl font-bold text-gray-800'>{promotersCount}</h3>
                <p className='text-sm text-gray-500'>Registered Promoters</p>
              </div>
              <div className='flex flex-col justify-center rounded-xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)]'>
                <div className='mb-4'>
                  <img src='/svg/complaintsfiled.svg' alt='Complaints Filed' className='h-7 w-7 object-contain' />
                </div>
                <h3 className='text-3xl font-bold text-gray-800'>{complaintsCount}</h3>
                <p className='text-sm text-gray-500'>Complaints Filed</p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
            <div className='flex flex-col gap-6 lg:col-span-4'>
              <div className='rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
                <MapCustomControl
                  features={districtChoropleth}
                  title='Select a District'
                  handleDistrictChange={handleDistrictChange}
                />
              </div>
            </div>
            <div className='flex flex-col gap-6 lg:col-span-8'>
              <div className='flex flex-col md:flex-row md:items-center justify-between rounded-[20px] md:rounded-l-[12px] border-l-[6px] border-[#085484] bg-[#F9FAFB] p-6 gap-4 md:gap-0'>
                <div className='flex-1'>
                  <p className='text-sm text-gray-500'>Selected District</p>
                  <h3 className='text-xl font-bold text-[#0463A0]'>
                    {selectedDistrict?.Districtname || 'All Districts'}
                  </h3>
                </div>
                <div className='hidden md:block h-10 w-px bg-gray-200'></div>
                <div className='flex-1 md:px-6'>
                  <p className='text-sm text-gray-500'>Projects Registered</p>
                  <h3 className='text-xl font-bold text-[#0463A0]'>{filteredProjects.length}</h3>
                </div>
                <div className='hidden md:block h-10 w-px bg-gray-200'></div>
                <div className='flex-1 md:px-6'>
                  <p className='text-sm text-gray-500'>Units Registered</p>
                  <h3 className='text-xl font-bold text-[#0463A0]'>{unitsRegistered.toLocaleString()}</h3>
                </div>
              </div>

              <div className='rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
                <h2 className='mb-4 text-[#085484] font-semibold text-lg md:text-[22px]' style={{ fontFamily: "'Urbanist', sans-serif" }}>Project Categorization Count</h2>
                <DashboardTopSection
                  registeredProjects={filteredProjects}
                  selectedYear={selectedYear}
                  selectedDistrict={selectedDistrict}
                  apartmentTypeSummary={apartmentTypeSummary}
                  selectedProjectType={selectedProjectType}
                />
              </div>

              <div className='rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
                <ProjectUnitsChart
                  registeredProjects={filteredProjects}
                  selectedYear={selectedYear}
                  selectedDistrict={selectedDistrict}
                  today={today}
                />
              </div>

              <div className='rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
                <ProjectAreaChart
                  registeredProjects={filteredProjects}
                  districts={districts}
                  today={today}
                  selectedYear={selectedYear}
                  selectedDistrict={selectedDistrict}
                />
              </div>

              <div className='rounded-[20px] bg-white p-6 border border-[#E5E7EB]'>
                <ProjectCumulativeArea
                  registeredProjects={filteredProjects}
                  districts={districts}
                  today={today}
                  selectedYear={selectedYear}
                  selectedDistrict={selectedDistrict}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
