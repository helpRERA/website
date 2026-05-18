import { useMemo } from 'react'
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
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
  xLabel?: string
  yLabel?: string
  yOneLabel?: string
  showLegend?: boolean
  colorScheme?: string
}

const LineWrapper = ({
  dataset,
  xLabel,
  yLabel,
  yOneLabel,
  measurementUnits,
  showLegend = true,
  colorScheme = 'default',
}: Props) => {
  const keys = useMemo(() => {
    if (dataset.length === 0) return []
    return Object.keys(dataset[0]).filter((key) => key !== 'name')
  }, [dataset])

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
      <LineChart
        width={500}
        height={300}
        data={dataset}
        margin={margins}
      >
        {showLegend && keys.length < 5 && isBigScreen && (
          <Legend
            layout='horizontal'
            align='center'
            verticalAlign='top'
            wrapperStyle={{ fontSize: 12, padding: 10 }}
          />
        )}
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
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
              dy={50}
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
              dx={30}
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
                >
                  <p>{`${yLabel} For ${label} `}</p>
                  {payload.map((entry, index) => (
                    <p
                      key={`tooltip-${index}`}
                      style={{ color: entry.stroke }}
                    >
                      {`${entry.dataKey}: ${Number(entry.value).toFixed(2)}`}
                    </p>
                  ))}
                </div>
              )
            }
            return null
          }}
        />
        {keys.map((key, index) => (
          <Line
            key={key}
            type='monotone'
            dataKey={key}
            stroke={solidColors[index]}
            activeDot={{ r: 8 }}
            yAxisId={getAxis(key)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineWrapper
