import React, { useCallback, useEffect, useState } from 'react'
import SelectList from '../../../../ui/form/SelectList'
import axios from 'axios'
import { DistrictCoordinate } from './ProjectMapsBlock'

interface Properties {
  setDistrict: (district: DistrictCoordinate | null) => void
}

const MapDistrictExplore = ({ setDistrict }: Properties) => {
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const [districts, setDistricts] = useState<DistrictCoordinate[]>([])

  const fetchData = useCallback(() => {
    axios
      .get('/district-coordinates')
      .then((result) => setDistricts(result.data))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (selectedDistrict === '') {
      setDistrict(null)
      return
    }
    const item = districts.find((district) => district.DistrictName === selectedDistrict)
    setDistrict(item ?? null)
  }, [selectedDistrict, districts, setDistrict])

  return (
    <div className='relative w-full'>
      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        className='w-full appearance-none rounded-xl border-0 bg-[#f4f5f6] py-3 pl-4 pr-10 text-sm text-gray-700 outline-none ring-1 ring-transparent hover:bg-[#eceef0] focus:bg-white focus:ring-2 focus:ring-primary-900'
      >
        <option value='' disabled>
          Select District
        </option>
        {districts.map((item) => (
          <option
            key={item.DistrictName}
            value={item.DistrictName}
          >
            {item.DistrictName}
          </option>
        ))}
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    </div>
  )
}

export default MapDistrictExplore
