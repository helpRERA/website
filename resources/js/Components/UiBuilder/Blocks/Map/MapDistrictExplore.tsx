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
    <SelectList
      list={districts}
      dataKey='DistrictName'
      displayKey='DistrictName'
      data={selectedDistrict}
      setData={setSelectedDistrict}
    />
  )
}

export default MapDistrictExplore
