import React, { useCallback, useMemo } from 'react'
import { Language } from '../ui_interfaces'

interface Properties {
  label?: string
  labelPrefix?: string
  min: number
  max: number
  step?: number
  rangeStart: number
  rangeEnd: number
  setRangeStart: (value: number) => void
  setRangeEnd: (value: number) => void
  error?: string
  readonly?: boolean
  disabled?: boolean
  infiniteEnd?: boolean
  lang?: Language
  infiniteMalLabel?: string
  finiteMalLabel?: string
}

const RangeSlider = ({
  label,
  labelPrefix = 'Having ',
  min,
  max,
  step = 1,
  rangeStart,
  rangeEnd,
  setRangeStart,
  setRangeEnd,
  disabled = false,
  readonly = false,
  infiniteEnd = false,
  infiniteMalLabel = 'കൂടുതൽ യൂണിറ്റുകൾ ഉള്ളത്',
  finiteMalLabel = 'യൂണിറ്റ് വരെ ',
  error,
  lang,
}: Properties) => {
  const startPercentage = useMemo(() => {
    return (rangeStart / max) * 100
  }, [rangeStart, max])

  const endPercentage = useMemo(() => {
    return (rangeEnd / max) * 100
  }, [rangeEnd, max])

  const startChange = useCallback(
    (value: string) => {
      if (Number(value) >= rangeEnd) {
        return
      }
      setRangeStart(Number(value))
    },
    [rangeEnd, setRangeStart]
  )

  const endChange = useCallback(
    (value: string) => {
      if (Number(value) <= rangeStart) {
        return
      }
      setRangeEnd(Number(value))
    },
    [rangeStart, setRangeEnd]
  )

  return (
    <>
      {!infiniteEnd ||
        (rangeEnd < max && lang === 'en' && (
          <label className='mb-1 text-sm tracking-normal text-gray-800'>
            {labelPrefix} <b>{rangeStart}</b> To <b>{rangeEnd}</b> {label}
          </label>
        ))}
      {!infiniteEnd ||
        (rangeEnd < max && lang === 'mal' && (
          <label className='mb-1 text-sm tracking-normal text-gray-800'>
            <b>{rangeStart}</b>
            {labelPrefix} <b> {rangeEnd} </b> {finiteMalLabel}
          </label>
        ))}
      {lang === 'en' && infiniteEnd && rangeEnd >= max && (
        <label className='mb-1 text-sm tracking-normal text-gray-800'>
          {labelPrefix} More Than <b>{rangeStart}</b> {label}
        </label>
      )}
      {lang === 'mal' && infiniteEnd && rangeEnd >= max && (
        <label className='mb-1 text-sm tracking-normal text-gray-800'>
          <b>{rangeStart}</b> {infiniteMalLabel}
        </label>
      )}

      <div className='relative w-full'>
        <div
          className='absolute top-0 bottom-0 m-auto h-1 w-full rounded transition-[background] duration-300'
          style={{
            background: `linear-gradient(to right, var(--color-accent-light) ${startPercentage}% , var(--color-accent-dark) ${startPercentage}% , var(--color-accent-dark) ${endPercentage}%, var(--color-accent-light) ${endPercentage}%)`,
          }}
        ></div>
        <input
          className='accent-primary absolute inset-0 w-full cursor-pointer rounded-full transition duration-300 '
          type='range'
          min={min}
          max={max}
          step={step}
          value={rangeStart}
          disabled={disabled}
          readOnly={readonly}
          onChange={(event) => startChange(event.target.value)}
        />
        <input
          className='accent-primary absolute inset-0 w-full cursor-pointer rounded-full transition duration-300'
          type='range'
          min={min}
          max={max}
          step={step}
          value={rangeEnd}
          disabled={disabled}
          readOnly={readonly}
          onChange={(event) => endChange(event.target.value)}
        />
      </div>
      {error && <div className='error-text'>{error}</div>}
    </>
  )
}

export default RangeSlider
