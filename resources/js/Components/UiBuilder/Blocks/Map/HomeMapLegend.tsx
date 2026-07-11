import React, { useEffect, useState } from 'react'
import { BlocKFieldInfo } from '../../PageBuilder/BlockEditor'
import EditLabel from '../../../../ui/button/EditLabel'
import { Language } from '../../../../ui/ui_interfaces'
import { DistrictCoordinate, ProjectMapBlockInterface } from './ProjectMapsBlock'
import MapDistrictExplore from './MapDistrictExplore'
import { ArrowsPointingInIcon, ArrowsPointingOutIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/outline'
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
    <div className='absolute top-20 right-2 z-20 flex w-[320px] flex-col rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:right-10'>
      <div className='mb-5 flex flex-row items-center justify-between'>
        <div className='flex items-center gap-3'>
          <AdjustmentsVerticalIcon className='h-5 w-5 text-gray-500' />
          <p className='text-[15px] font-normal text-gray-800'>Filter by District</p>
        </div>
        <button
          onClick={() => setShowPins((old) => !old)}
          className='text-gray-600 hover:text-gray-900'
        >
          {showPins && <ArrowsPointingInIcon className='h-5 w-5' />}
          {!showPins && <ArrowsPointingOutIcon className='h-5 w-5' />}
        </button>
      </div>
      <div className='mb-2 flex flex-col'>
        <MapDistrictExplore setDistrict={setSelectedCoordinates} />
      </div>
      {showPins && (
        <div className='mb-6 mt-3 flex flex-col gap-4 px-2'>
          {[
            'Residential',
            'Vilas (Plots & Buildings)',
            'Mixed (Commercial & Residential)',
            'Plots',
            'Shops/Office Space',
          ].map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-primary-900">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span className='text-sm font-normal text-gray-700'>{item}</span>
            </div>
          ))}
        </div>
      )}
      <div className='mt-1'>
        <Link
          as='a'
          href='/explore-projects'
          className='flex w-full items-center justify-center rounded-xl bg-primary-900 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2'
        >
          Explore Projects
        </Link>
      </div>
    </div>
  )
}

export default HomeMapLegend
