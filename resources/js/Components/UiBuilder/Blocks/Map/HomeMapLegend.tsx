import React, { useEffect, useState } from 'react'
import { BlocKFieldInfo } from '../../PageBuilder/BlockEditor'
import EditLabel from '../../../../ui/button/EditLabel'
import { Language } from '../../../../ui/ui_interfaces'
import { DistrictCoordinate, ProjectMapBlockInterface } from './ProjectMapsBlock'
import MapDistrictExplore from './MapDistrictExplore'
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid'
import useWindowResize from '../../../../hooks/useWindowResize'
import { Link } from '@inertiajs/react'
import Localization from '../../../../ui/Localization'
import { localization } from '../../../../Localization/localization'

interface Properties {
  registeredProjects?: number
  blockData?: ProjectMapBlockInterface
  onFieldEdit?: (field: BlocKFieldInfo) => void
  editMode?: boolean
  language?: Language
  setSelectedCoordinates: (district: DistrictCoordinate | null) => void
}

const HomeMapLegend = ({
  onFieldEdit,
  blockData,
  setSelectedCoordinates,
  editMode = false,
  language = 'en',
}: Properties) => {
  const [showPins, setShowPins] = useState(true)

  const width = useWindowResize()

  useEffect(() => {
    if (width < 1024) {
      setShowPins(false)
    } else {
      setShowPins(true)
    }
  }, [width])

  return (
    <div className='absolute top-20 right-2 z-20 flex flex-col bg-white p-4 md:right-10'>
      <div className='flex flex-row justify-between gap-7'>
        <p className='text-sm'>Filter Project By District</p>
        <button onClick={() => setShowPins((old) => !old)}>
          {showPins && (
            <>
              <ArrowsPointingInIcon className='h-6 w-6' />
            </>
          )}
          {!showPins && (
            <>
              <ArrowsPointingOutIcon className='h-6 w-6' />
            </>
          )}
        </button>
      </div>
      <div className='flex flex-col'>
        <MapDistrictExplore setDistrict={setSelectedCoordinates} />
      </div>
      {blockData?.legends != null && showPins && (
        <div className='w-full max-w-xs'>
          <img
            src={blockData.legends.url}
            alt={blockData.legends.caption}
            className='h-auto w-full object-cover'
          />
        </div>
      )}
      {editMode && onFieldEdit != null && (
        <EditLabel
          label='EDIT LEGEND IMAGE'
          onClick={() =>
            onFieldEdit({
              field: 'legends',
              fieldType: 'image',
              oldValue: null,
              action: 'INSERT',
            })
          }
        />
      )}
      <div className='my-2'>
        <Link
          as='a'
          href='/explore-projects'
          className='flex items-center justify-center rounded bg-primary-900 py-2 text-xs font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:py-4 sm:text-base'
        >
          <Localization
            text={localization['Project Explorer']}
            language={language}
          />
        </Link>
      </div>
    </div>
  )
}

export default HomeMapLegend
