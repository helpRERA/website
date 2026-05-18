import React, { useEffect, useState } from 'react'

const convertDMS = (coordinate: string[]) => {
  if (coordinate.length !== 4) {
    return ''
  }
  const degrees = Number.parseFloat(coordinate[0])
  const minutes = Number.parseFloat(coordinate[1])
  const seconds = Number.parseFloat(coordinate[2])
  const decimal = degrees + minutes / 60 + seconds / 3600
  return decimal.toString()
}

/**
 * takes in a coordinate and returns the latitude and longitude
 * latitude if not in decimal will be in format 12°34'56"N
 * longitude if not in decimal will be in format 12°34'56"E
 * @param lat
 * @param lng
 * @returns
 */
const convertCoordinate = (lat: string, lng: string) => {
  let latDecimal = lat
  let lngDecimal = lng

  if (lat.includes('°')) {
    const latSplit = lat.split(/["'°]/)
    latDecimal = convertDMS(latSplit)
  }
  if (lng.includes('°')) {
    const lngSplit = lng.split(/["'°]/)
    lngDecimal = convertDMS(lngSplit)
  }
  return [latDecimal, lngDecimal]
}

/**
 * takes in a coordinate and returns the latitude and longitude
 * if coordinate in degrees,minutes,seconds, convert to decimal
 * if coordinate in decimal, return as is
 *
 * @returns
 */
const useCoordinates = (lat: string | null, lng: string | null) => {
  const [latitude, setLatitude] = useState<string | null>(null)
  const [longitude, setLongitude] = useState<string | null>(null)

  useEffect(() => {
    if (lat != null && lng != null) {
      const formattedLat = lat.replace(',', '')
      const formattedLng = lng.replace(',', '')
      const [latitude, longitude] = convertCoordinate(formattedLat, formattedLng)
      if (Number.isNaN(Number.parseFloat(latitude)) || Number.isNaN(Number.parseFloat(longitude))) {
        setLatitude('')
        setLongitude('')
        return
      }
      setLatitude(latitude)
      setLongitude(longitude)
      return
    }
    setLatitude('')
    setLongitude('')
  }, [lat, lng])

  return [latitude, longitude]
}

export default useCoordinates
