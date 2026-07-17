import React from 'react'
import { FormFieldProp } from '../ui_interfaces'

export default function Input({
  label,
  data,
  error,
  setData,
  placeholder,
  disabled = false,
  password = false,
  readonly = false,
}: FormFieldProp) {
  return (
    <>
      <label className='mb-1 text-sm tracking-normal text-gray-800'>{label}</label>
      <input
        type={password ? 'password' : 'text'}
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder={placeholder}
        className='bg-accent-light rounded-lg border border-[#DDDDDD] py-3 pl-3 text-sm text-gray-800
            shadow-sm focus:border-indigo-700 focus:outline-none disabled:bg-gray-100'
        disabled={disabled}
        readOnly={readonly}
      />
      {error && <div className='error-text'>{error}</div>}
    </>
  )
}
