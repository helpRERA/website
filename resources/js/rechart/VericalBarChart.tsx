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
import { useMemo } from 'react'
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
  stacked?: boolean
}

const VericalBarChart = ({
  dataset,
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
      <BarChart
        width={500}
        height={300}
        data={dataset}
        layout='vertical'
        margin={margins}
      >
        {showLegend && (
          <Legend
            layout='horizontal'
            align='center'
            verticalAlign='top'
            wrapperStyle={{ fontSize: 12, padding: 10 }}
          />
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
                      style={{ color: entry.color }}
                    >
                      {`${entry.dataKey}: ${Number(entry.value).toFixed(2)}`}
                    </p>
                  ))}
                </div>
              )
            }
            return null
          }}
          cursor={{ fill: '#FDB84F', fillOpacity: 0.3 }}
        />
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          xAxisId='left'
          orientation='bottom'
          type='number'
          height={60}
          tick={{ fontSize: 10 }}
          angle={-45}
          textAnchor='end'
          hide={!isBigScreen}
        >
          {isBigScreen && (
            <Label
              value={yLabel}
              position='insideEnd'
              style={{ fontSize: 12, fontWeight: '600' }}
              dy={10}
            />
          )}
        </XAxis>
        {uniqueUnits.length > 1 && (
          <XAxis
            xAxisId='right'
            type='number'
            height={60}
            tick={{ fontSize: 10 }}
            angle={45}
            textAnchor='end'
            orientation='top'
            hide={!isBigScreen}
          >
            {isBigScreen && (
              <Label
                value={yOneLabel}
                position='outside'
                style={{ fontSize: 12, fontWeight: '600' }}
                dy={-10}
              />
            )}
          </XAxis>
        )}
        <YAxis
          dataKey='name'
          type='category'
          // tick={{ fontSize: 10, angle: -60 }}
          orientation='left'
          tickMargin={10}
          textAnchor='end'
          tickFormatter={(value) =>
            value && value.length > 10 ? value.slice(0, 10) + '...' : value
          }
        >
          {isBigScreen && (
            <Label
              value={xLabel}
              style={{ fontSize: 12, fontWeight: '600' }}
              position='insideEnd'
              angle={-90}
              dx={-30}
            />
          )}
        </YAxis>
        <Tooltip />
        {keys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={solidColors[index]}
            fillOpacity={0.9}
            xAxisId={getAxis(key)}
            stackId={stacked ? 'stack' : undefined}
            activeBar={<Rectangle />}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VericalBarChart
