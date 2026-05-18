import React, { useCallback, useEffect, useState } from 'react'
import { FeatureData } from './Map'
import { toast } from 'react-toastify'

export const choroplethColors = [
  '#d9ed92',
  '#b5e48c',
  '#76c893',
  '#52b69a',
  '#1a759f',
  '#1e6091',
  '#184e77',
  '#001d3d',
]

interface KeyValue {
  key: string
  value: string | number
}

export interface ChoroplethStep {
  step: string
  min: number
  max: number
  color: string
}

/**
 * steps on legend is not round when difference between min and max is 8
 *
 * @param min
 * @param max
 * @returns
 */
const getSteps = (min: number, max: number): ChoroplethStep[] => {
  const roundDecimals = max - min >= 8
  const minRounded = roundDecimals ? Math.floor(min) : min
  const maxRounded = roundDecimals ? Math.ceil(max) : max
  const stepValue = (maxRounded - minRounded) / 8
  const step = roundDecimals ? Math.ceil(stepValue) : stepValue
  let stepStartValue = minRounded
  const steps: ChoroplethStep[] = []
  for (let i = 0; i < 8; i++) {
    const minStepSize = stepStartValue
    stepStartValue = stepStartValue + step
    const maxStepSize = stepStartValue
    steps.push({
      step: `${roundDecimals ? minStepSize : minStepSize.toFixed(2)} -
                ${roundDecimals ? maxStepSize : maxStepSize.toFixed(2)}`,
      min: minStepSize,
      max: maxStepSize,
      color: choroplethColors[i],
    })
  }
  return steps
}

const findChoroplethKey = (data: FeatureData): string | null => {
  const keys = Object.keys(data)
  const keyIndex = keys.findIndex((key: string) => {
    return key != 'district' && key != 'OBJECTID'
  })
  if (keyIndex !== -1) {
    return keys[keyIndex]
  }
  return null
}

const LazyMap = React.lazy(() => import('./Map'))

interface Props {
  title: string
  features: (Record<'district', string> | Record<string, number | undefined>)[]
  handleDistrictChange: (district: string | null) => void
}

const MapCustomControl = ({ features, title, handleDistrictChange }: Props) => {
  const [choropleth, setChoropleth] = useState<string | null>('project_count')

  const [steps, setSteps] = useState<ChoroplethStep[]>([])
  const [properties, setProperties] = useState<KeyValue[]>([])

  useEffect(() => {
    if (choropleth == null) {
      setSteps([])
      return
    }
    let min: number | null = null
    let max: number | null = null
    features.map((feature: any) => {
      if (max == null || Number(feature[choropleth]) > max) {
        max = feature[choropleth]
      }
      if (min == null || Number(feature[choropleth]) < min) {
        min = feature[choropleth]
      }
    })
    setSteps(getSteps(min == null ? 0 : Number(min), max == null ? 0 : Number(max)))
  }, [choropleth, features])

  const districtChange = useCallback(
    (feature: Record<'district', string> | Record<string, number | null> | null) => {
      if (feature == null || feature.district == null) {
        handleDistrictChange(null)

        return
      }
      handleDistrictChange((feature.district as string | null) ?? null)
      toast(`District selected: ${feature.district}`, {
        type: 'info',
        position: 'bottom-center',
        autoClose: 5000,
      })
    },
    [handleDistrictChange]
  )

  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null)

  const onDistrictHover = useCallback(
    (feature: Record<'district', string> | Record<string, number | null> | null) => {
      setProperties([])
      if (feature == null || feature.district == null) {
        setHoveredDistrict(null)
        return
      }
      setProperties(() => {
        const keys = Object.keys(feature).filter((key) => {
          return key !== 'OBJECTID' && key !== 'district'
        })
        return keys.map((key) => {
          return {
            key,
            value: feature[key as keyof typeof feature] as string | number,
          }
        })
      })
      setHoveredDistrict(feature.district as string)
    },
    []
  )

  return (
    <div className='relative w-full pt-20 md:pt-16'>
      <div className='absolute left-2 top-1 z-[500] lg:left-6'>
        <h2 className='text-xl font-bold'>Project Distribution</h2>
        <p className='text-sm'>
          This is an interactive representation of district-wise project registrations for a given
          year. Please use filters section to view data for a different year.
        </p>
        {properties.map((property) => (
          <p
            className='hover:text-skin-button-base cursor-pointer text-sm font-semibold hover:underline'
            key={property.key}
          >
            {hoveredDistrict}, Projects: {property.value == null ? '' : property.value}
          </p>
        ))}
      </div>
      <div className='absolute bottom-5 z-[500] md:right-2'>
        {steps.map((step) => {
          return (
            <div
              className='flex items-center gap-2 text-sm'
              key={step.color}
            >
              <i
                className='h-4 w-4'
                style={{ background: step.color }}
              ></i>
              {step.step}
            </div>
          )
        })}
      </div>
      {choropleth != null && (
        <LazyMap
          districtChange={districtChange}
          features={features as FeatureData[]}
          title={title}
          choropleth={choropleth}
          steps={steps}
          onDistrictHover={onDistrictHover}
        />
      )}
    </div>
  )
}

export default MapCustomControl
