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
  className?: string
  multiple?: boolean
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
  className = '',
  multiple = false,
}: Properties<K, G, U, V, T>) {

  const value = useMemo(() => {
    if (multiple) {
      return Array.isArray(data) ? data : []
    }

    const index = list.findIndex((item) => {
      return item[dataKey] == data
    })

    return index === -1 ? '' : data
  }, [data, dataKey, list, multiple])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedValues = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      )

      setData(selectedValues)
    } else {
      setData(e.target.value)
    }
  }

  return (
    <>
      {label && <label className='standard-label'>{label}</label>}

      <div className='relative flex items-center w-full'>
        <select
          name={multiple ? 'category[]' : 'type'}
          multiple={multiple}
          value={value}
          onChange={handleChange}
          className={`appearance-none w-full border border-[#DDDDDD] py-1.5 px-4 text-[14px] text-gray-700 focus:border-[#085484] focus:outline-none disabled:bg-gray-100 bg-white transition-colors ${
            className ? className : 'rounded-lg'
          }`}
        >
          {!multiple && showAllOption && (
            <option value=''>{allOptionText}</option>
          )}

          {!multiple && !showAllOption && label != null && (
            <option value='' disabled>
              Select {label}
            </option>
          )}

          {list.map((item: T) => (
            <option
              value={String(item[dataKey])}
              key={String(item[dataKey])}
            >
              {String(item[displayKey])}
            </option>
          ))}
        </select>

        {!multiple && (
          <div className='pointer-events-none absolute right-3 flex items-center text-gray-600'>
            <svg
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        )}
      </div>

      {error && <div className='error-text'>{error}</div>}
    </>
  )
}