import React, { useMemo } from 'react'
import UnitAvailability from './calculate-availability'
import Localization from '../../ui/Localization'
import { localization } from '../../Localization/localization'
import ProgressLine from '../../ui/ProgressLine'
import { Language } from '../../ui/ui_interfaces'

interface Props {
  project: {
    PType: string | null
    booked_count: number
    apartment_count: number
    booked_plots: number | null
    plot_count: number | null
  }
  lang?: Language
}

export default function AvailabilityProgressLine({ project, lang }: Props) {
  const availability = useMemo(() => {
    return new UnitAvailability(project)
  }, [project])

  return (
    <>
      {availability.isValid() && (
        <div className='flex flex-col'>
          <ProgressLine
            progressColor='bg-[#085484]'
            backgroundColor='bg-gray-200'
            progress={availability.getAvailablePercentage() ?? 0}
          />
          <div className='mt-2 flex items-center justify-between'>
            <span className='text-xs text-gray-500'>
              <Localization
                text={localization['Available Units']}
                language={lang}
              />
            </span>
            <span className='text-xs font-medium text-gray-700'>
              {availability.getAvailableUnits()}/{availability.totalUnits}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
