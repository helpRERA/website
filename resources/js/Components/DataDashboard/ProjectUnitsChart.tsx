import { District, Project } from '../../DataStructures/krera_interfaces'
import { MeasureUnit } from '../../rechart/chart-interfaces'
import React, { useMemo } from 'react'
import BarWrapper from '../../rechart/BarWrapper'
import VisualizationToggle from './VisualizationToggle'
import DashboardDataTable from './DashboardDataTable'
import dayjs from 'dayjs'

interface Properties {
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
    | 'NumberOfResidentialUnits'
    | 'NumberOfCommercialUnits'
    | 'ProjectYear'
  >[]
  selectedYear: string
  today: string
  selectedDistrict: District | null
}

const areaUnits: MeasureUnit[] = [
  {
    axis: 'left',
    unit: 'unit',
    measurement: 'Residential Units',
  },
  {
    axis: 'left',
    unit: 'unit',
    measurement: 'Commercial Units',
  },
]

export default function ProjectUnitsChart({
  registeredProjects,
  selectedYear,
  selectedDistrict,
  today,
}: Properties) {
  const [showChart, setShowChart] = React.useState(true)

  //get last 7 years using dayjs
  const last7Years = useMemo(() => {
    const currentYear = selectedYear == '' ? dayjs(today).year() : Number(selectedYear)

    return Array.from({ length: 6 }, (_, index) => {
      return currentYear - (5 - index)
    })
  }, [selectedYear, today])

  const registeredProjectsInCurrentYear = useMemo(() => {
    return registeredProjects.filter((project) => {
      if (project.ProjectYear == null) {
        return false
      }
      return selectedYear == '' || project.ProjectYear == selectedYear
    }).length
  }, [selectedYear, registeredProjects])

  //calculate total area under residential area and other use by year
  const unitsPerYear = useMemo(() => {
    const totalArea = last7Years.map((year) => {
      return {
        year,
        'Residential Units': 0,
        'Commercial Units': 0,
      }
    })

    registeredProjects.forEach((project) => {
      if (project.ProjectYear == null) {
        return
      }
      const projectYear = Number(project.ProjectYear)
      totalArea.forEach((year) => {
        if (
          year.year === projectYear &&
          project.NumberOfResidentialUnits != null &&
          project.NumberOfResidentialUnits != '.00'
        ) {
          year['Residential Units'] += Number(project.NumberOfResidentialUnits)
        }
        if (
          year.year === projectYear &&
          project.NumberOfCommercialUnits != null &&
          project.NumberOfCommercialUnits != '.00'
        ) {
          year['Commercial Units'] += Number(project.NumberOfCommercialUnits)
        }
      })
    })

    return totalArea
  }, [registeredProjects, last7Years])

  return (
    <div className='grid grid-cols-1 gap-5'>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
        <div className='col-span-full'>
          <h2 className='text-xl font-bold'>Units Registered</h2>
          <p className='text-sm font-semibold'>
            {selectedDistrict == null ? 'All Districts' : selectedDistrict.Districtname}
            {selectedYear == '' ? '' : `, ${selectedYear}`}
          </p>
        </div>
        <div className='col-span-full'>
          <VisualizationToggle
            showChart={showChart}
            setShowChart={setShowChart}
          />
        </div>
        <div className='h-96 overflow-auto md:col-span-2'>
          {showChart && (
            <BarWrapper
              xLabel='Year'
              yLabel='# Units'
              xAxisKey='year'
              measurementUnits={areaUnits}
              dataset={unitsPerYear}
              stacked={true}
            />
          )}
          {!showChart && (
            <DashboardDataTable
              records={unitsPerYear}
              keys={['year', 'Residential Units', 'Commercial Units']}
              primaryKey='year'
            />
          )}
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-4xl font-bold'>{registeredProjectsInCurrentYear}</h2>
          <p className='text-center text-sm font-semibold'>
            Projects Registered
            <br /> {selectedYear == '' ? ' ' : `In ${selectedYear}`}
          </p>
        </div>
      </div>
    </div>
  )
}
