import React from 'react'
import { FormFieldProp } from '../ui_interfaces'

interface Props extends FormFieldProp {
  min: number
  max?: number
}

export default function NumberInput({
  label,
  data,
  error,
  setData,
  min,
  max,
  placeholder,
  disabled = false,
  readonly = false,
}: Props) {
  return (
    <>
      <label className='text-gray-800 text-sm tracking-normal mb-1'>{label}</label>
      <input
        type='number'
        min={min}
        max={max}
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder={placeholder}
        className='border border-gray-300 bg-accent-light pl-3 py-3 shadow-sm disabled:bg-gray-100 rounded-lg
            text-sm focus:outline-none focus:border-indigo-700 text-gray-800'
        disabled={disabled}
        readOnly={readonly}
      />
      {error && <div className='error-text'>{error}</div>}
    </>
  )
}
