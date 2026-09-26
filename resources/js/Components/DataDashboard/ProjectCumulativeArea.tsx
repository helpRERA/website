import { District, Project } from '../../DataStructures/krera_interfaces'
import { MeasureUnit } from '../../rechart/chart-interfaces'
import React, { useMemo } from 'react'
import AreaChart from '../../rechart/AreaChart'
import VisualizationToggle from './VisualizationToggle'
import DashboardDataTable from './DashboardDataTable'

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
    | 'ProjectYear'
  >[]
  districts: District[]
  today: string
  selectedYear: string
  selectedDistrict: District | null
}

const TOTAL_AREA_KEY = 'Total Area'
const TOTAL_AREA_UNDER_RESIDENTIAL_USE_KEY = 'Total Area Under Residential Use'
const TOTAL_AREA_UNDER_OTHER_USE_KEY = 'Total Area Under Other Use'

const areaUnits: MeasureUnit[] = [
  {
    axis: 'left',
    unit: 'sqm',
    measurement: TOTAL_AREA_KEY,
  },
  {
    axis: 'left',
    unit: 'sqm',
    measurement: TOTAL_AREA_UNDER_RESIDENTIAL_USE_KEY,
  },
  {
    axis: 'left',
    unit: 'sqm',
    measurement: TOTAL_AREA_UNDER_OTHER_USE_KEY,
  },
]

export default function ProjectCumulativeArea({
  registeredProjects,
  districts,
  today,
  selectedYear,
  selectedDistrict,
}: Props) {
  const [showChart, setShowChart] = React.useState(true)

  const chartYears = useMemo(() => {
    if (selectedYear !== '') return [Number(selectedYear)]
    return Array.from(new Set(registeredProjects
      .map((project) => Number(project.ProjectYear))
      .filter((year) => Number.isFinite(year) && year > 0)
    )).sort((a, b) => a - b)
  }, [selectedYear, registeredProjects])

  //calculate total area under residential area and other use by year
  const totalAreaYear = useMemo(() => {
    const totalArea = chartYears.map((year) => {
      return {
        year,
        [TOTAL_AREA_UNDER_RESIDENTIAL_USE_KEY]: 0,
        [TOTAL_AREA_UNDER_OTHER_USE_KEY]: 0,
        [TOTAL_AREA_KEY]: 0,
      }
    })

    registeredProjects.forEach((project) => {
      const projectYear = Number(project.ProjectYear)
      totalArea.forEach((chartItem) => {
        if (
          chartItem.year >= projectYear &&
          project.TotalFloorAreaUnderResidentialUse != null &&
          project.TotalFloorAreaUnderResidentialUse != '.00'
        ) {
          chartItem[TOTAL_AREA_UNDER_RESIDENTIAL_USE_KEY as keyof typeof chartItem] += Number(
            project.TotalFloorAreaUnderResidentialUse
          )
        }
        if (
          chartItem.year >= projectYear &&
          project.TotalFloorAreaUnderOtherUse != null &&
          project.TotalFloorAreaUnderOtherUse != '.00'
        ) {
          chartItem[TOTAL_AREA_UNDER_OTHER_USE_KEY as keyof typeof chartItem] += Number(
            project.TotalFloorAreaUnderOtherUse
          )
        }
        if (
          chartItem.year >= projectYear &&
          project.TotalFloorAreaOfProjectProposedForRegistration != null &&
          project.TotalFloorAreaOfProjectProposedForRegistration != '.00'
        ) {
          chartItem[TOTAL_AREA_KEY as keyof typeof chartItem] += Number(
            project.TotalFloorAreaOfProjectProposedForRegistration
          )
        }
      })
    })
    totalArea.forEach((item) => {
      item[TOTAL_AREA_UNDER_RESIDENTIAL_USE_KEY as keyof typeof item] = Number.parseFloat(
        item[TOTAL_AREA_UNDER_RESIDENTIAL_USE_KEY as keyof typeof item].toFixed(2)
      )
      item[TOTAL_AREA_UNDER_OTHER_USE_KEY as keyof typeof item] = Number.parseFloat(
        item[TOTAL_AREA_UNDER_OTHER_USE_KEY as keyof typeof item].toFixed(2)
      )
      item[TOTAL_AREA_KEY as keyof typeof item] = Number.parseFloat(
        item[TOTAL_AREA_KEY as keyof typeof item].toFixed(2)
      )
    })
    return totalArea
  }, [registeredProjects, chartYears])

  return (
    <div className='grid grid-cols-1 gap-5'>
      <div className='col-span-full'>
        <h2 className='text-[#085484] font-semibold mb-4 text-lg md:text-[22px]' style={{ fontFamily: "'Urbanist', sans-serif" }}>
          Cumulative Project Area
        </h2>
      </div>
      <div className='col-span-full'>
        <VisualizationToggle
          showChart={showChart}
          setShowChart={setShowChart}
        />
      </div>
      <div className='h-96 overflow-auto'>
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
            keys={[
              'year',
              TOTAL_AREA_UNDER_RESIDENTIAL_USE_KEY,
              TOTAL_AREA_UNDER_OTHER_USE_KEY,
              TOTAL_AREA_KEY,
            ]}
            primaryKey='year'
            units={['', 'sq m', 'sq m', 'sq m']}
          />
        )}
      </div>
    </div>
  )
}
