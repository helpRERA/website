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
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
        <div>
          <h2 className='text-[#085484] font-semibold text-lg md:text-[22px]' style={{ fontFamily: "'Urbanist', sans-serif" }}>
            Project Area Added
          </h2>
        </div>
        <div className='flex flex-col items-center justify-center rounded-[16px] border border-gray-100 bg-[#FCFCFD] px-5 py-3 shadow-sm'>
          <h2 className='text-[20px] text-gray-700 font-medium' style={{ fontFamily: "'Urbanist', sans-serif" }}>
            {formatNumber(proposedAreaInCurrentYear)?.toLocaleString('en-IN', {
              maximumFractionDigits: 1,
            })}
          </h2>
          <p className='text-sm text-gray-500' style={{ fontFamily: "'Urbanist', sans-serif" }}>
            Total Floor Area Proposed In {selectedYear == '' ? 'Total' : selectedYear}
          </p>
        </div>
      </div>

      <div>
        <VisualizationToggle
          showChart={showChart}
          setShowChart={setShowChart}
        />
      </div>
      
      <div className='h-80 w-full overflow-auto'>
        {showChart && (
          <AreaChart
            xLabel=''
            yLabel=''
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
