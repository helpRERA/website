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

  const last7Years = useMemo(() => {
    const currentYear = selectedYear == '' ? dayjs(today).year() : Number(selectedYear)

    return Array.from({ length: 6 }, (_, index) => {
      return currentYear - (5 - index)
    })
  }, [selectedYear, today])

  //calculate total area under residential area and other use by year
  const totalAreaYear = useMemo(() => {
    const totalArea = last7Years.map((year) => {
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
  }, [registeredProjects, last7Years])

  return (
    <div className='grid grid-cols-1 gap-5'>
      <div className='col-span-full'>
        <h2 className='text-xl font-bold'>Cumulative Project Area</h2>
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
