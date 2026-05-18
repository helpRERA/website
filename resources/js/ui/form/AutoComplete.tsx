import React, { useCallback, useEffect, useRef, useState } from 'react'
import { handleHttpErrors } from '../alerts'
import CloseSolid from '../icons/CloseSolid'
import Input from './Input'
import axios from 'axios'
import useClick from '../../hooks/useClick'

export interface Properties<K extends keyof T, U extends number | string, T extends Record<K, U>> {
  dataKey: K
  label?: string
  data: T | null
  error?: string
  displayKey: K
  url: string
  setData: (value: T | null) => unknown
}

const AutoComplete = <K extends keyof T, U extends number | string, T extends Record<K, U>>({
  data,
  label,
  error,
  setData,
  dataKey,
  displayKey,
  url,
}: Properties<K, U, T>) => {
  const [textField, setTextField] = useState('')
  const [list, setList] = useState<T[]>([])
  const listRef = useRef<HTMLDivElement | null>(null)
  const [clickTarget] = useClick()

  useEffect(() => {
    if (listRef.current?.contains(clickTarget) !== true) {
      setList([])
    }
  }, [clickTarget])

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${url}${textField}`)
      setList(res.data)
    } catch (error) {
      handleHttpErrors(error)
    }
  }, [textField, url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      {data != null && (
        <div
          className='bg-accent-light flex items-center justify-between px-3 py-2
            text-sm text-gray-800'
        >
          <span>
            {label}: {data[displayKey]}
          </span>
          <div
            className='cursor-pointer rounded-full p-1 hover:bg-gray-50'
            onClick={() => setData(null)}
          >
            <CloseSolid />
          </div>
        </div>
      )}
      {data == undefined && (
        <div
          className='relative w-full'
          ref={listRef}
        >
          <div className='flex flex-col'>
            <Input
              label={label}
              data={textField}
              setData={setTextField}
            />
          </div>
          {list.length > 0 && (
            <div className='bg-accent-light absolute top-full z-10 w-full rounded pt-2 shadow'>
              <>
                {list.map((item: T) => {
                  return (
                    <div
                      key={item[dataKey]}
                      className='flex cursor-pointer flex-wrap p-2 text-sm hover:bg-gray-200 hover:font-semibold'
                      onClick={() => setData(item)}
                    >
                      {item[displayKey]}
                    </div>
                  )
                })}
              </>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default AutoComplete
