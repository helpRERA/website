import React from 'react'
import { FormFieldProp } from '../ui_interfaces'

export default function TextArea({ label, data, error, setData, placeholder, disabled }: FormFieldProp) {
  return (
    <>
      <label className="text-gray-800 text-sm tracking-normal mb-1">
        {label}
      </label>
      <textarea
        value={data}
        onChange={e => setData(e.target.value)}
        placeholder={placeholder}
        name="description"
        disabled={disabled}
        className="border border-gray-300 bg-accent-light pl-3 py-3 shadow-sm disabled:bg-gray-100 rounded-lg
            text-sm focus:outline-none focus:border-indigo-700 text-gray-800"
      >

      </textarea>
      {error && <div className="error-text">{error}</div>}
    </>
  )
}
