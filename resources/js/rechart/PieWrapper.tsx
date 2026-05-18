import { useEffect, useMemo, useRef, useState } from 'react'
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts'
import useChartColorScheme from './useChartColorScheme'
import { ChartTableRow } from './chart-interfaces'
import Modal from '../ui/modal/Modal'

interface Props {
  chartValues: ChartTableRow[]
  showLegend?: boolean
  colorScheme?: string
  label?: string
  chartKey?: string
}

interface CustomLabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: CustomLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      style={{ fontSize: '10px' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor='middle'
        fill={fill}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle
        cx={ex}
        cy={ey}
        r={2}
        fill={fill}
        stroke='none'
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

interface LegendProps {
  payload: {
    color: string
    type: string
    value: string
    payload: { name: string; value: number; color: string }[]
  }[]
}

// Custom legend component
const CustomLegend = ({ payload }: LegendProps) => {
  return (
    <ul style={{ display: 'grid', justifyContent: 'center', listStyle: 'none', padding: 4 }}>
      {payload.map(
        (
          entry: {
            value: string
            color: string
          },
          index: number
        ) => {
          return (
            <li
              key={`entry-${index}`}
              style={{
                marginRight: 10,
                color: 'black',
                fontSize: '12px',
                lineHeight: '12px',
                padding: 4,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  backgroundColor: entry.color,
                  marginRight: 5,
                  paddingTop: 1,
                }}
              />

              {entry.value}
            </li>
          )
        }
      )}
    </ul>
  )
}

const PieWrapper = ({
  label,
  chartValues,
  showLegend = false,
  colorScheme = 'default',
  chartKey,
}: Props) => {
  const valueKey = useMemo(() => {
    if (chartValues.length === 0) {
      return ''
    }
    const keys = Object.keys(chartValues[0]).filter((key) => key !== 'name')

    if (keys.length === 0) {
      return ''
    }

    return keys[0]
  }, [chartValues])

  const [outerRadius, setOuterRadius] = useState(90)

  const solidColors = useChartColorScheme(colorScheme)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current != null) {
      const clientWidth = containerRef.current.clientWidth
      setOuterRadius(clientWidth > 1000 ? 160 : 90)
    }

    //on resize
    const onResize = () => {
      const clientWidth = containerRef.current?.clientWidth ?? 0
      setOuterRadius(clientWidth > 1000 ? 160 : 90)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  // Function to open the legend modal
  const openModal = () => setIsModalOpen(true)

  // Function to close the legend modal
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <ResponsiveContainer
        width='100%'
        height='100%'
        ref={containerRef}
      >
        <PieChart
          width={400}
          height={300}
        >
          {/* {showLegend && (
            <Legend
              layout='horizontal'
              align='start'
              verticalAlign='bottom'
              // wrapperStyle={{ fontSize: 8, padding: 10 }}
              content={CustomLegend}
            />
          )} */}

          <Pie
            data={chartValues}
            dataKey={valueKey}
            // activeShape={renderActiveShape}
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={80}
            fill='#8884d8'
            // label={renderCustomizedLabel}
          >
            <Label
              value={label}
              position='center'
              fill='#000'
              style={{ fontSize: '10px', fontWeight: 'bold' }}
              width={100}
            />
            {chartValues.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={solidColors[index % solidColors.length]}
              />
            ))}
          </Pie>
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
                    <div className='p-2'>
                      {payload.map((entry, index) => (
                        <p
                          key={`tooltip-${index}`}
                          style={{ color: entry.color }}
                          className='text-xs font-semibold'
                        >
                          {`${entry.name}: ${Number(entry.value)}`}
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
        </PieChart>
      </ResponsiveContainer>
      <div className='absolute bottom-0 flex w-full justify-center'>
        <button
          className='link text-xs'
          onClick={openModal}
        >
          Show Legend
        </button>
      </div>
      {/* Legend modal */}
      {isModalOpen && (
        <Modal
          setShowModal={setIsModalOpen}
          title='Legend'
        >
          <CustomLegend
            payload={chartValues.map((entry, index) => ({
              value: entry.name,
              color: solidColors[index % solidColors.length],
            }))}
          />
        </Modal>
      )}
    </>
  )
}

export default PieWrapper
