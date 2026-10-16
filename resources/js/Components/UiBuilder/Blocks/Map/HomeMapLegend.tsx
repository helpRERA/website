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
    <div className='absolute top-[80px] inset-x-4 z-20 flex min-w-0 max-h-[600px] flex-col overflow-y-auto overscroll-contain rounded-3xl bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:left-auto sm:right-2 sm:w-[320px] sm:max-w-[calc(100%-3rem)] sm:p-6 md:right-10' data-lenis-prevent='true'>
      <div className='mb-5 flex shrink-0 flex-row items-center justify-between gap-2'>
        <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
          <AdjustmentsVerticalIcon className='h-[20px] w-[20px] shrink-0 text-gray-500' />
          <p className='min-w-0 break-words text-[15px] font-normal text-gray-800'>Filter by District</p>
        </div>
        <button
          onClick={() => setShowPins((old) => !old)}
          className='shrink-0 text-gray-600 hover:text-gray-900'
        >
          {showPins && <ArrowsPointingInIcon className='h-[20px] w-[20px] shrink-0' />}
          {!showPins && <ArrowsPointingOutIcon className='h-[20px] w-[20px] shrink-0' />}
        </button>
      </div>
      <div className='mb-2 flex shrink-0 flex-col'>
        <MapDistrictExplore setDistrict={setSelectedCoordinates} />
      </div>
      {showPins && (
        <div className='mb-6 mt-3 flex shrink-0 flex-col gap-4 px-2'>
          {[
            'Residential',
            'Vilas (Plots & Buildings)',
            'Mixed (Commercial & Residential)',
            'Plots',
            'Shops/Office Space',
          ].map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-[20px] w-[20px] shrink-0 text-primary-900">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span className='min-w-0 break-words text-sm font-normal text-gray-700'>{item}</span>
            </div>
          ))}
        </div>
      )}
      <div className='mt-1 shrink-0'>
        <Link
          as='a'
          href='/explore-projects'
          className='flex w-full min-w-0 items-center justify-center break-words rounded-xl bg-primary-900 px-2 py-3.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2'
        >
          Explore Projects
        </Link>
      </div>
    </div>
  )
}

export default HomeMapLegend
