import { District, Project } from '../../DataStructures/krera_interfaces'
import { MeasureUnit } from '../../rechart/chart-interfaces'
import React, { useMemo } from 'react'
import AreaChart from '../../rechart/AreaChart'
import VisualizationToggle from './VisualizationToggle'
import DashboardDataTable from './DashboardDataTable'
import dayjs from 'dayjs'

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
    | 'Area'
    | 'ProjectYear'
  >[]
  districts: District[]
  today: string
  selectedYear: string
  selectedDistrict: District | null
}

const areaUnits: MeasureUnit[] = [
  {
    axis: 'left',
    unit: 'sqm',
    measurement: 'Total Area',
  },
  {
    axis: 'left',
    unit: 'sqm',
    measurement: 'Total Area Under Residential Use',
  },
  {
    axis: 'left',
    unit: 'sqm',
    measurement: 'Total Area Under Other Use',
  },
]

export const formatNumber = (value?: number | null) => {
  if (value == null) {
    return
  }
  if (isNaN(Number(value))) {
    return value
  }
  value = Number(value)
  let numericPart = value
  let prefix = ''
  if (value >= 10000000) {
    numericPart = value / 10000000
    prefix = ' Cr '
  } else if (value >= 100000) {
    numericPart = value / 100000
    prefix = ' L '
  } else if (value >= 1000) {
    numericPart = value / 1000
    prefix = ' K '
  }
  //if the number is integer, then don't show decimal
  if (numericPart % 1 === 0) {
    return `${numericPart.toFixed(0)}${prefix} sq m`
  }
  return `${numericPart.toFixed(2)}${prefix} sq m`
}

export default function ProjectAreaChart({
  registeredProjects,
  selectedYear,
  today,
  selectedDistrict,
}: Props) {
  const [showChart, setShowChart] = React.useState(true)

  //get last 7 years using dayjs
  const last7Years = useMemo(() => {
    const currentYear = selectedYear == '' ? dayjs(today).year() : Number(selectedYear)

    return Array.from({ length: 6 }, (_, index) => {
      return currentYear - (5 - index)
    })
  }, [selectedYear, today])

  const proposedAreaInCurrentYear = useMemo(() => {
    let totalProposedArea = 0
    registeredProjects
      .filter((project) => {
        if (project.ProjectYear == null) {
          return false
        }
        return project.ProjectYear == selectedYear || selectedYear == ''
      })
      .forEach((project) => {
        if (
          project.TotalFloorAreaOfProjectProposedForRegistration != null &&
          project.TotalFloorAreaOfProjectProposedForRegistration != '.00'
        ) {
          totalProposedArea += Number(project.TotalFloorAreaOfProjectProposedForRegistration)
        }
      })

    return totalProposedArea
  }, [registeredProjects, selectedYear])

  //calculate total area under residential area and other use by year
  const totalAreaYear = useMemo(() => {
    const totalArea = last7Years.map((year) => {
      return {
        year,
        'Total Land Area': 0,
        'Total Floor Area': 0,
      }
    })

    registeredProjects.forEach((project) => {
      if (project.ProjectStartDate == null) {
        return
      }
      const projectYear = Number(project.ProjectYear)
      totalArea.forEach((chartItem) => {
        if (chartItem.year === projectYear && project.Area != null && project.Area != '.00') {
          chartItem['Total Land Area'] += Number(project.Area)
        }
        if (
          chartItem.year === projectYear &&
          project.TotalFloorAreaOfProjectProposedForRegistration != null &&
          project.TotalFloorAreaOfProjectProposedForRegistration != '.00'
        ) {
          chartItem['Total Floor Area'] += Number(
            project.TotalFloorAreaOfProjectProposedForRegistration
          )
        }
      })
    })
    totalArea.forEach((item) => {
      item['Total Land Area'] = parseFloat(item['Total Land Area'].toFixed(2))
      item['Total Floor Area'] = parseFloat(item['Total Floor Area'].toFixed(2))
    })
    return totalArea
  }, [registeredProjects, last7Years])

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
      <div className='col-span-full'>
        <h2 className='text-xl font-bold'>Project Area Added</h2>
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
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-4xl font-bold'>
          {formatNumber(proposedAreaInCurrentYear)?.toLocaleString('en-IN', {
            maximumFractionDigits: 1,
          })}
          {/* {proposedAreaInCurrentYear.toLocaleString('en-IN', { maximumFractionDigits: 1 })} */}
        </h2>
        <p className='text-center text-xl'>
          Total Floor Area <br />
          Proposed In {selectedYear == '' ? 'To Date' : selectedYear}
        </p>
      </div>
      <div className='h-96 overflow-auto md:col-span-2'>
        {showChart && (
          <AreaChart
            xLabel='Year'
            yLabel='Area'
            xAxisKey='year'
            measurementUnits={areaUnits}
            dataset={totalAreaYear}
          />
        )}
        {!showChart && (
          <DashboardDataTable
            records={totalAreaYear}
            keys={['year', 'Total Land Area', 'Total Floor Area']}
            primaryKey='year'
            units={['', 'sq m', 'sq m']}
          />
        )}
      </div>
    </div>
  )
}
