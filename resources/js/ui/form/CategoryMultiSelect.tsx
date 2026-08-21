import React, { useEffect, useRef, useState } from 'react'

interface Category {
  value_one: string
}

interface Properties {
  label?: string
  data: string[] | string | null
  setData: (value: string[]) => void
  list: Category[]
  error?: string
}

export default function CategoryMultiSelect({
  label,
  data,
  setData,
  list,
  error,
}: Properties) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Always convert data into an array
  const selectedCategories: string[] = Array.isArray(data)
    ? data
    : data
      ? [data]
      : []

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setData(
        selectedCategories.filter((item) => item !== category)
      )
    } else {
      setData([
        ...selectedCategories,
        category,
      ])
    }
  }

  const displayValue =
    selectedCategories.length > 0
      ? selectedCategories.join(', ')
      : `Select ${label}`

  return (
    <div className='relative' ref={containerRef}>
      {label && (
        <label className='standard-label'>
          {label}
        </label>
      )}

      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='flex w-full items-center justify-between rounded-lg border border-[#DDDDDD] bg-white px-4 py-2 text-left text-[14px] text-gray-700 focus:border-[#085484] focus:outline-none'
      >
        <span
          className={
            selectedCategories.length === 0
              ? 'text-gray-400'
              : 'text-gray-700'
          }
        >
          {displayValue}
        </span>

        <svg
          className={`h-4 w-4 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
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
      </button>

      {open && (
        <div className='absolute z-50 mt-1 w-full rounded-lg border border-[#DDDDDD] bg-white shadow-lg'>
          <div className='max-h-60 overflow-y-auto py-2'>
            {list.map((item) => {
              const checked = selectedCategories.includes(
                item.value_one
              )

              return (
                <label
                  key={item.value_one}
                  className='flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-50'
                >
                  <input
                    type='checkbox'
                    checked={checked}
                    onChange={() =>
                      toggleCategory(item.value_one)
                    }
                    className='h-4 w-4 rounded border-gray-300'
                  />

                  <span className='text-[14px] text-gray-700'>
                    {item.value_one}
                  </span>
                </label>
              )
            })}
          </div>

          {selectedCategories.length > 0 && (
            <div className='border-t border-gray-200 px-4 py-2'>
              <button
                type='button'
                onClick={() => setData([])}
                className='text-sm text-gray-500 hover:text-gray-700'
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className='error-text'>
          {error}
        </div>
      )}
    </div>
  )
}