import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import useChartColorScheme from './useChartColorScheme'
import { ChartTableRow, MeasureUnit } from './chart-interfaces'
import useWindowResize from '../hooks/useWindowResize'

interface Props {
  dataset: ChartTableRow[]
  measurementUnits: MeasureUnit[]
  xAxisKey: string
  xLabel?: string
  yLabel?: string
  yOneLabel?: string
  showLegend?: boolean
  colorScheme?: string
  stacked?: boolean
}

const BarWrapper = ({
  dataset,
  xAxisKey,
  xLabel,
  yLabel,
  yOneLabel,
  measurementUnits,
  showLegend = true,
  colorScheme = 'default',
  stacked = false,
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

  const solidColors = ['#5085E6', '#228A62', '#F4D761', '#6B735C', '#CCBFBA', '#E27396']
  // useChartColorScheme(colorScheme)

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
      <BarChart
        width={500}
        height={300}
        data={dataset}
        margin={margins}
      >
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
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
            position='insideEnd'
            angle={-90}
            dx={-20}
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
                        style={{ color: entry.color }}
                        className='text-xs font-semibold'
                      >
                        {`${entry.dataKey}: ${Number(entry.value)}`}
                      </p>
                    ))}
                  </div>
                </div>
              )
            }
            return null
          }}
          cursor={{ fill: '#FDB84F', fillOpacity: 0.3 }}
        />
        {showLegend && (
          <Legend
            layout='horizontal'
            align='center'
            verticalAlign='top'
            wrapperStyle={{ fontSize: 12, padding: 10 }}
          />
        )}
        {keys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={solidColors[index + 1]}
            fillOpacity={0.9}
            yAxisId={getAxis(key)}
            barSize={15}
            stackId={stacked ? 'stack' : undefined}
            activeBar={<Rectangle />}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarWrapper
