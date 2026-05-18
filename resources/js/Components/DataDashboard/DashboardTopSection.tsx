import React, { useMemo } from 'react'
import { District, Project } from '../../DataStructures/krera_interfaces'
import PieWrapper from '../../rechart/PieWrapper'
import DashboardDataTable from './DashboardDataTable'
import VisualizationToggle from './VisualizationToggle'
import { ApartmentTypeSummary } from '../../Pages/DataDashboard/DataDashboardPage'

const countByProjectType = [
  {
    name: 'Plots',
    projects: 0,
  },
  {
    name: 'Shops/Office Space',
    projects: 0,
  },
  {
    name: 'Residential',
    projects: 0,
  },
  {
    name: 'Villas (Plots & Buildings)',
    projects: 0,
  },
  {
    name: 'Mixed (Residential & Commercial)',
    projects: 0,
  },
]

const projectTypeIndex = {
  15: 0,
  12: 1,
  13: 2,
  33: 3,
  16: 4,
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
    | 'ProjectYear'
  >[]
  selectedYear: string
  apartmentTypeSummary: ApartmentTypeSummary[]
  selectedDistrict: District | null
  selectedProjectType: string
}

export default function DashboardTopSection({
  registeredProjects,
  selectedYear,
  apartmentTypeSummary,
  selectedDistrict,
  selectedProjectType,
}: Props) {
  const [showChart, setShowChart] = React.useState(true)

  const projectTypeData = useMemo(() => {
    const data = countByProjectType.map((item) => {
      return { ...item }
    })

    registeredProjects
      .filter((project) => {
        if (project.ProjectYear == null) {
          return false
        }
        return project.ProjectYear == selectedYear || selectedYear == ''
      })
      .forEach((project) => {
        const projectType = project.PType
        if (projectType == null) {
          return
        }
        const index = projectTypeIndex[
          Number(projectType) as keyof typeof projectTypeIndex
        ] as unknown as number | undefined
        if (index == null) {
          return
        }
        if (data != null && data[index] != null && data[index].projects != null) {
          data[index].projects++
        }
      })

    return data
  }, [registeredProjects, selectedYear])

  const byApartmentType = useMemo(() => {
    const filtered = apartmentTypeSummary.filter(
      (apartmentType) =>
        (selectedDistrict == null || apartmentType.District === selectedDistrict?.Districtcode) &&
        (selectedProjectType == '' || apartmentType.ProjectType === selectedProjectType) &&
        (selectedYear == '' || selectedYear == apartmentType.ProjectYear)
    )

    const data: {
      name: string
      units: number
    }[] = []
    filtered.forEach((apartmentType) => {
      const alreadyAdded = data.findIndex((item) => item.name === apartmentType.type)

      if (alreadyAdded == -1) {
        data.push({
          name: apartmentType.type,
          units: Number(apartmentType.count),
        })
        return
      }

      data[alreadyAdded].units += Number(apartmentType.count)
    })

    if (data.length <= 5) {
      return data
    }
    // sort by units and include only 4 items in list rest are added as other
    data.sort((a, b) => b.units - a.units)
    const newItems: {
      name: string
      units: number
    }[] = []

    let otherUnits = 0

    data.forEach((item, index) => {
      if (index < 4 && item.name != 'Others') {
        newItems.push(item)
      } else {
        otherUnits += item.units
      }
    })

    if (otherUnits > 0) {
      newItems.push({
        name: 'Others',
        units: otherUnits,
      })
    }

    return newItems
  }, [apartmentTypeSummary, selectedDistrict, selectedProjectType, selectedYear])

  const areaTable = useMemo(() => {
    return byApartmentType.map((item) => {
      return {
        type: item.name,
        units: item.units,
      }
    })
  }, [byApartmentType])

  const typeTable = useMemo(() => {
    return projectTypeData.map((item) => {
      return {
        type: item.name,
        projects: item.projects,
      }
    })
  }, [projectTypeData])

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
      <div className='col-span-full'>
        <VisualizationToggle
          showChart={showChart}
          setShowChart={setShowChart}
        />
      </div>
      <div className='relative h-52 overflow-auto'>
        {showChart && (
          <PieWrapper
            chartValues={projectTypeData}
            label='Projects By Type'
            showLegend={true}
            chartKey='type'
          />
        )}
        {!showChart && (
          <div>
            <p className='mb-4 text-center text-sm font-semibold'>Projects</p>
            <DashboardDataTable
              records={typeTable}
              keys={['type', 'projects']}
              primaryKey='type'
            />
          </div>
        )}
      </div>
      <div className='relative h-52 overflow-auto'>
        {showChart && (
          <PieWrapper
            chartValues={byApartmentType}
            label='Residential Units By Unit Type'
            showLegend={true}
            chartKey='area'
          />
        )}
        {!showChart && (
          <div>
            <p className='mb-4 text-center text-sm font-semibold'>Unit Types</p>
            <DashboardDataTable
              records={areaTable}
              keys={['type', 'units']}
              primaryKey='area'
            />
          </div>
        )}
      </div>
    </div>
  )
}
