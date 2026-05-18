import React from 'react'

interface Props {
  label?: string
  data?: string | number
  error?: string
  setData: (value: number) => unknown
  disabled?: boolean
  readonly?: boolean
  min: number
  max: number
  step: number
}

const Slider = ({
  label,
  data,
  error,
  setData,
  disabled = false,
  readonly = false,
  min,
  max,
  step,
}: Props) => {
  return (
    <div className='flex flex-col'>
      <label className='text-gray-800 text-sm tracking-normal mb-1'>
        {label}: {data}
      </label>
      <input
        className='w-full cursor-pointer accent-primary rounded-full'
        type='range'
        min={min}
        max={max}
        step={step}
        value={data}
        onChange={(e) => setData(Number(e.target.value))}
        disabled={disabled}
        readOnly={readonly}
      />
      <div className='flex justify-between'>
        <span className='text-sm'>{min}</span>
        <span className='text-sm'>{max}</span>
      </div>
      {error && <div className='error-text'>{error}</div>}
    </div>
  )
}

export default Slider
