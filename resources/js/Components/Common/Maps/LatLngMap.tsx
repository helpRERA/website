import React, { useMemo } from 'react'
import useCoordinates from '../../../hooks/useCoordinates'

interface Properties {
  lat: string | null
  long: string | null
  city?: string
}

const LatLngMap = ({ lat, long, city }: Properties) => {
  const [latitude, longitude] = useCoordinates(lat, long)

  const location = useMemo(() => {
    if (latitude == null && longitude == null) {
      return ''
    }
    if (latitude == '' && longitude == '') {
      return city
    }
    return `${latitude},${longitude}`
  }, [latitude, longitude, city])

  console.log(location)

  return (
    <>
      {location != '' && (
        <iframe
          src={`https://maps.google.com/maps?q=${location}&z=11&output=embed`}
          className='h-[30rem] w-full'
        ></iframe>
      )}
    </>
  )
}

export default LatLngMap
