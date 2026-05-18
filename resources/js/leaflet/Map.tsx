import React, { useEffect, useRef } from 'react'
import * as L from 'leaflet'
// import 'leaflet/dist/leaflet.css';
// import {Class, GeoJSON} from "leaflet";
import geoJson from './geoJson'
import { choroplethColors, ChoroplethStep } from './MapCustomControl'

function getColor(d: number, steps: ChoroplethStep[]) {
  const dataIndex = steps.findIndex((step: ChoroplethStep) => {
    return d >= step.min && d <= step.max
  })
  if (dataIndex === -1) {
    return choroplethColors[0]
  }
  return choroplethColors[dataIndex]
}

export interface FeatureData {
  district: string
  OBJECTID: number

  [key: string]: number | string
}

interface Props {
  features: FeatureData[]
  title: string
  districtChange: (data: FeatureData) => void
  onDistrictHover: (data: FeatureData | null) => void
  choropleth: string
  steps: ChoroplethStep[]
}

const Map = ({ features, title, districtChange, onDistrictHover, steps, choropleth }: Props) => {
  const mapRef = useRef<any>(null)
  const infoRef = useRef<any>(null)

  useEffect(() => {
    mapRef.current = L.map('map', {
      keyboard: false,
      dragging: false,
      zoomControl: false,
      boxZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      // tap: false,
      touchZoom: false,
      attributionControl: false,
    }).setView([10.5, 76.2], 7)

    return () => {
      if (mapRef.current != null && mapRef.current.remove != null) {
        mapRef.current.off()
        mapRef.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (mapRef.current == null) {
      return
    }
    if (infoRef.current != null) {
      infoRef.current.update(title)
    }

    const json: any = JSON.parse(JSON.stringify(geoJson))

    json.features.map((feature: any) => {
      if (feature == null) {
        return
      }
      features.map((data: any) => {
        if (feature.properties != null && feature.properties.district == data.district) {
          feature.properties = { ...feature.properties, ...data }
        }
      })
    })

    const jsonLayer = L.geoJSON(json, {
      onEachFeature: (feature: any, layer: any) => {
        layer.on('click', (e: any) => {
          districtChange(layer.feature.properties)
        })
        layer.on('mouseover', (e: any) => {
          const district = e.target
          layer.setStyle({
            weight: 5,
            color: 'white',
            dashArray: '',
            fillOpacity: 0.7,
          })
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront()
          }
          onDistrictHover(layer.feature.properties)
        })
        layer.on('mouseout', function (e: any) {
          jsonLayer.resetStyle(e.target)
          onDistrictHover(null)
        })
      },
      style: (feature: any) => {
        const value = feature == null ? 0 : feature.properties[choropleth]
        return {
          fillColor: getColor(value, steps),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
        }
      },
    }).addTo(mapRef.current)

    return () => {
      jsonLayer.clearLayers()
    }
  }, [features, steps, choropleth, districtChange, title, onDistrictHover])

  return <div id='map'></div>
}

export default Map
