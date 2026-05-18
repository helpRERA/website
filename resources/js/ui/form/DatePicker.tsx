import React from 'react'
import { FormFieldProp } from '../ui_interfaces'

export default function DatePicker({
  label,
  data,
  error,
  setData,
  placeholder,
  disabled = false,
  password = false,
}: FormFieldProp) {
  return (
    <>
      <label className='text-gray-800 text-sm leading-tight tracking-normal mb-1'>{label}</label>
      <input
        type='date'
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder={placeholder}
        className='border border-gray-300  px-3 py-3 shadow-sm rounded disabled:bg-gray-100
            text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800'
        disabled={disabled}
      />
      {error && <div className='error-text'>{error}</div>}
    </>
  )
}
