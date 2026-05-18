import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import useChartColorScheme from './useChartColorScheme'
import { ChartTableRow, MeasureUnit } from './chart-interfaces'
import useWindowResize from '../hooks/useWindowResize'
import { formatNumber } from '../Components/DataDashboard/ProjectAreaChart'

interface Props {
  dataset: ChartTableRow[]
  measurementUnits: MeasureUnit[]
  xAxisKey: string
  xLabel?: string
  yLabel?: string
  yOneLabel?: string
  showLegend?: boolean
  colorScheme?: string
}

const AreaChartWrapper = ({
  dataset,
  xAxisKey,
  xLabel,
  yLabel,
  yOneLabel,
  measurementUnits,
  showLegend = true,
  colorScheme = 'default',
}: Props) => {
  const keys = useMemo(() => {
    if (dataset.length === 0) return []
    return Object.keys(dataset[0]).filter((key) => key !== xAxisKey)
  }, [dataset, xAxisKey])

  const getAxis = (key: string) => {
    const unit = measurementUnits.find((m) => m.measurement === key)
    return unit == null ? 'left' : unit.axis
  }

  const uniqueUnits = useMemo(() => {
    const units: string[] = []
    measurementUnits.map((unit) => {
      if (!units.includes(unit.unit)) {
        units.push(unit.unit)
      }
    })
    return units
  }, [measurementUnits])

  const solidColors = useChartColorScheme(colorScheme)
  const width = useWindowResize()
  const isBigScreen = width > 500

  const margins = isBigScreen
    ? { top: 5, right: 30, left: 20, bottom: 30 }
    : { top: 0, right: 10, left: 10, bottom: 0 }

  return (
    <ResponsiveContainer
      width='100%'
      height='100%'
    >
      <AreaChart
        width={730}
        height={250}
        data={dataset}
        margin={margins}
      >
        {/* <defs>
          {solidColors.map((color, index) => (
            <linearGradient
              id={`color${index}`}
              key={color}
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='5%'
                stopColor={color}
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor={color}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
        </defs> */}
        <XAxis
          dataKey={xAxisKey}
          height={60}
          tick={{ fontSize: 10 }}
          angle={-45}
          // tickMargin={10}
          textAnchor='end'
          tickFormatter={(value) =>
            value && value.length > 10 ? value.slice(0, 10) + '...' : value
          }
        >
          {isBigScreen && (
            <Label
              value={xLabel}
              position='insideEnd'
              style={{ fontSize: 12, fontWeight: '600' }}
              dy={20}
            />
          )}
        </XAxis>
        <YAxis
          yAxisId='left'
          tick={{ fontSize: 10 }}
          hide={!isBigScreen}
        >
          <Label
            value={yLabel}
            position='outside'
            angle={-90}
            dx={-30}
            style={{ fontSize: 12, fontWeight: '600' }}
          />
        </YAxis>
        {uniqueUnits.length > 1 && (
          <YAxis
            yAxisId='right'
            orientation='right'
            tick={{ fontSize: 10 }}
            hide={!isBigScreen}
          >
            <Label
              value={yOneLabel}
              position='outside'
              angle={-90}
              dx={40}
              style={{ fontSize: 12, fontWeight: '600' }}
            />
          </YAxis>
        )}
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        <Tooltip
          content={({ label, payload }) => {
            if (payload && payload.length > 0) {
              payload.sort((a, b) => (b.value as number) - (a.value as number)) // Sort payload in descending order
              return (
                <div
                  style={{
                    backgroundColor: 'white',
                    opacity: 0.8,
                    boxShadow: '2px 2px 5px 2px rgba(0, 0, 0, 0.5)',
                    padding: '10px',
                  }}
                  className='rounded-lg'
                >
                  <p className='text-sm font-semibold'>{`${yLabel} For ${label} `}</p>
                  <div className='p-2'>
                    {payload.map((entry, index) => (
                      <p
                        key={`tooltip-${index}`}
                        style={{ color: entry.stroke }}
                        className='text-xs font-semibold'
                      >
                        {`${entry.dataKey}: ${formatNumber(Number(entry.value))}`}
                      </p>
                    ))}
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        {showLegend && keys.length < 5 && isBigScreen && (
          <Legend
            layout='horizontal'
            align='center'
            verticalAlign='top'
            wrapperStyle={{ fontSize: 12, padding: 10 }}
          />
        )}
        {keys.map((key, index) => (
          <Area
            type='monotone'
            dataKey={key}
            stroke={solidColors[index % solidColors.length]}
            strokeWidth={2}
            fill={solidColors[index % solidColors.length]}
            key={key}
            yAxisId={getAxis(key)}
            fillOpacity={0.3}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartWrapper
