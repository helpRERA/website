import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { ResponsiveContainer, Tooltip, TooltipProps, Treemap } from 'recharts'
import { District, Project } from '../../DataStructures/krera_interfaces'
import useChartColorScheme from '../../rechart/useChartColorScheme'
import DashboardDataTable from './DashboardDataTable'
import VisualizationToggle from './VisualizationToggle'

interface TreeNodeItem {
  name: string
  children?: TreeNodeItem[]
  size?: number
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
  >[]
  selectedYear: number
  colorScheme?: string
  selectedDistrict: District | null
}

function findCategory(area: number): string {
  if (area < 100) {
    return '<100 sqm'
  } else if (area < 200) {
    return '100-200 sqm'
  } else if (area < 500) {
    return '200-500 sqm'
  } else {
    return '>500 sqm'
  }
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length > 0) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          opacity: 0.8,
          boxShadow: '2px 2px 5px 2px rgba(0, 0, 0, 0.5)',
          padding: '10px',
        }}
        className='rounded-lg p-2'
      >
        <p className='text-xs font-semibold'>{payload[0].payload.root.name}</p>
        <p className='text-xs font-semibold'>
          {`${payload[0].payload.name} : ${payload[0].value}`} Units
        </p>
      </div>
    )
  }

  return null
}

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, colors, data, name } = props as {
    data: TreeNodeItem[]
    colors: string[]
    root: TreeNodeItem
    depth: number
    x: number
    y: number
    width: number
    height: number
    index: number
    name: string
  }

  const color = useMemo(() => {
    let color = '#ffffff'
    if (depth === 1) {
      //find item in root's children
      data.forEach((item, index) => {
        if (item.name === name) {
          color = colors[index % colors.length]
        }
      })
    }
    return color
  }, [data, depth, colors, name])

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth === 1 ? color : '#ffffff00',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth !== 1 && height > 15 && width >= 75 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor='middle'
          fill='#ff7d00'
          stroke='none'
          fontSize={14}
        >
          {name}
        </text>
      )}
      {depth !== 1 && height > 100 && width > 0 && width < 75 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor='middle'
          fill='#ff7d00'
          stroke='none'
          fontSize={14}
          transform={`rotate(-90, ${x + width - 5}, ${y + height / 2})`}
        >
          {name}
        </text>
      )}
      {depth === 1 && (
        <text
          x={x + 4}
          y={y + 18}
          fill='#ff7d00'
          stroke='none'
          fontSize={16}
          fillOpacity={0.9}
          fontWeight={600}
        >
          {name}
        </text>
      )}
    </g>
  )
}

const COLORS = [
  '#d9ed92',
  '#b5e48c',
  '#76c893',
  '#52b69a',
  '#1a759f',
  '#1e6091',
  '#184e77',
  '#001d3d',
]

function uniqueApartmentTypes(
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
  >[]
): string[] {
  const items: string[] = []

  registeredProjects.forEach((project) => {
    project.apartments?.forEach((apartment) => {
      items.push(apartment?.apartment_type?.TypeName ?? '')
    })
  })

  return [...new Set(items)]
}

export default function TreeMap({
  registeredProjects,
  selectedYear,
  colorScheme = 'default',
  selectedDistrict,
}: Props) {
  const [showChart, setShowChart] = React.useState(true)

  const treeNodes = useMemo(() => {
    const items = uniqueApartmentTypes(registeredProjects)

    const tree = [...new Set(items)].map((item) => {
      return {
        name: item,
        children: [
          {
            name: '<100 sqm',
            size: 0,
          },
          {
            name: '100-200 sqm',
            size: 0,
          },
          {
            name: '200-500 sqm',
            size: 0,
          },
          {
            name: '>500 sqm',
            size: 0,
          },
        ],
      }
    })

    registeredProjects
      .filter((project) => {
        if (project.ProjectStartDate == null) {
          return false
        }
        const projectYear = dayjs(project.ProjectStartDate).year()
        return projectYear == selectedYear
      })
      .forEach((project) => {
        project.apartments?.forEach((apartment) => {
          const apartmentCount = Number(apartment.ApartmentNumber)
          const apartmentType = apartment.apartment_type?.TypeName ?? ''
          if (Number.isNaN(apartmentCount)) {
            return
          }
          //if the TotalArea is present then add it to children
          if (Number.isNaN(Number(apartment.TotalArea))) {
            return
          }
          const recordIndex = tree.findIndex((item) => item.name === apartmentType)
          if (recordIndex == -1) {
            return
          }
          const record = tree[recordIndex]
          const category = findCategory(Number(apartment.TotalArea))
          const categoryIndex = record.children?.findIndex((item) => item.name === category)
          if (categoryIndex != -1) {
            record.children[categoryIndex].size += apartmentCount
          }
        })
      })

    return tree
  }, [registeredProjects, selectedYear])

  const table = useMemo(() => {
    const records: {
      id: number
      'Unit Type': string
      Area: string
      Units: number
    }[] = []

    let index = 0
    treeNodes.map((node) => {
      node.children.forEach((item) => {
        records.push({
          id: index++,
          'Unit Type': node.name,
          Area: item.name,
          Units: item.size,
        })
      })
    })

    return records
  }, [treeNodes])

  const solidColors = useChartColorScheme(colorScheme)
  return (
    <div className=''>
      <div className='col-span-full'>
        <h2 className='text-xl font-bold'>Unit Type Distributions, Count</h2>
        <p className='text-sm font-semibold'>
          {selectedDistrict == null ? 'All Districts' : selectedDistrict.Districtname} ,{' '}
          {selectedYear}
        </p>
      </div>
      <div className='col-span-full p-2'>
        <VisualizationToggle
          showChart={showChart}
          setShowChart={setShowChart}
        />
      </div>
      <div className='h-96 w-full overflow-auto'>
        {showChart && (
          <ResponsiveContainer
            width='100%'
            height='100%'
          >
            <Treemap
              data={treeNodes}
              dataKey='size'
              aspectRatio={4 / 3}
              stroke='#fff'
              fill={solidColors[3]}
              content={
                <CustomizedContent
                  colors={COLORS}
                  data={treeNodes}
                />
              }
            >
              <Tooltip content={CustomTooltip} />
            </Treemap>
          </ResponsiveContainer>
        )}
        {!showChart && (
          <DashboardDataTable
            records={table}
            keys={['Unit Type', 'Area', 'Units']}
            primaryKey='id'
          />
        )}
      </div>
    </div>
  )
}
