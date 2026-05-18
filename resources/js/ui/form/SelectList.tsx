import React, { useMemo } from 'react'
import { FormFieldProp as FormFieldProperty } from '../ui_interfaces'

export interface Properties<
  K extends keyof T,
  G extends keyof T,
  U extends number | string,
  V extends number | string | null,
  T extends Record<K, U> & Record<G, V>
> extends FormFieldProperty {
  list: T[]
  dataKey: K
  displayKey: G
  showAllOption?: boolean
  allOptionText?: string
}

export default function SelectList<
  K extends keyof T,
  G extends keyof T,
  U extends number | string,
  V extends number | string | null,
  T extends Record<K, U> & Record<G, V>
>({
  data,
  label,
  error,
  setData,
  list,
  dataKey,
  displayKey,
  showAllOption = false,
  allOptionText = 'All',
}: Properties<K, G, U, V, T>) {
  const value = useMemo(() => {
    const index = list.findIndex((item) => {
      return item[dataKey] == data
    })
    return index === -1 ? '' : data
  }, [data, dataKey, list])

  return (
    <>
      <label className='standard-label'>{label}</label>
      <select
        name='type'
        value={value}
        onChange={(e) => setData(e.target.value)}
        className='bg-accent-light appearance-none rounded-lg border border-gray-300 py-3 pl-3 text-sm text-gray-800
            shadow-sm focus:border-indigo-700 focus:outline-none disabled:bg-gray-100'
      >
        {showAllOption && <option value=''>{allOptionText}</option>}
        {!showAllOption && label != null && (
          <option
            value=''
            disabled
          >
            Select {label}
          </option>
        )}
        {list.map((item: T) => {
          return (
            <option
              value={item[dataKey]}
              key={item[dataKey]}
            >
              {item[displayKey]}
            </option>
          )
        })}
      </select>
      {error && <div className='error-text'>{error}</div>}
    </>
  )
}
