import React, { useMemo, useState } from 'react'
import { Language } from '../../../../ui/ui_interfaces'
import { BlockImage } from '../../../../DataStructures/ui_builder_interfaces'
import { BlocKFieldInfo } from '../../PageBuilder/BlockEditor'
import { BlockConfiguration } from '../../DefaultBlockData'
import RegisteredList from './RegisteredList'
import HomeMapLegend from './HomeMapLegend'

export interface DistrictCoordinate {
  id: number
  DistrictName: string
  Latitude: number
  Longitude: number
}

interface Properties {
  language?: Language
  registeredProjects?: number
  registeredAgents?: number
  complaintsCount?: number
  promotersCount?: number
  currentDate?: string
  editMode?: boolean
  blockData?: ProjectMapBlockInterface
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

export interface ProjectMapBlockInterface extends BlockConfiguration {
  dependencies: string[]
  legends?: BlockImage | null
}

export const projectsMapBlock: ProjectMapBlockInterface = {
  dependencies: ['registeredProjects', 'registeredAgents', 'complaintsCount', 'promotersCount'],
  legends: {
    url: '/legend.png',
    caption: 'map legend',
  },
}

const ProjectsMapBlock = ({
  language = 'en',
  registeredAgents,
  registeredProjects,
  complaintsCount,
  promotersCount,
  blockData,
  editMode = false,
  onFieldEdit,
}: Properties) => {
  const [selectedCoordinate, setSelectedCoordinate] = useState<DistrictCoordinate | null>(null)
  const [isMapBlured, setIsMapBlured] = useState(true)

  const mapUrl = useMemo(() => {
    if (selectedCoordinate === null) {
      return 'https://www.google.com/maps/d/u/0/embed?mid=1b7XgfHUlohrz3QzlOrsdSB9zqOAzkss&ehbc=2E312F&ll=11.721786267422855%2C77.02623916002112&z=7'
    }
    return `https://www.google.com/maps/d/u/0/embed?mid=1b7XgfHUlohrz3QzlOrsdSB9zqOAzkss&ehbc=2E312F&ll=${selectedCoordinate.Latitude}%2C${selectedCoordinate.Longitude}&z=10`
  }, [selectedCoordinate])

  const handleMapBlur = () => {
    setIsMapBlured(true)
  }

  return (
    <div
      className={`flex h-full w-full flex-col ${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      {/* Registered List Overview
      <div className='bg-primary-800 px-4 pt-8 pb-8 md:col-span-4 lg:col-span-4'>
        <RegisteredList
          language={language}
          registeredProjects={registeredProjects}
          registeredAgents={registeredAgents}
          complaintsCount={complaintsCount}
          promotersCount={promotersCount}
        />
      </div> */}
      <div className='relative md:col-span-2 lg:col-span-3'>
        <HomeMapLegend
          setSelectedCoordinates={setSelectedCoordinate}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          language={language}
          blockData={blockData}
        />
        <iframe
          id='iframe'
          className='w-full'
          src={mapUrl}
          width={425}
          height={250}
          style={{ border: 0, height: 700 }}
          allowFullScreen
          title='maps'
          onMouseLeave={handleMapBlur}
        />
        {isMapBlured && (
          <>
            <div
              onClick={() => setIsMapBlured(false)}
              className='absolute inset-0 z-10 h-full w-full bg-gray-900 bg-opacity-30'
            ></div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProjectsMapBlock
