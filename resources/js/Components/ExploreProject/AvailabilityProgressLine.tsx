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
          <div className='gap-2'>
            <span className=''>
              <Localization
                text={localization['Available Units']}
                language={lang}
              />
              :{' '}
            </span>
            <b className='text-xl'>
              <span>{availability.getAvailableUnits()}</span>/
              <span className='text-slate-700'>{availability.totalUnits}</span>
            </b>
          </div>

          <ProgressLine
            progressColor='bg-amber-200'
            backgroundColor='bg-teal-500'
            progress={availability.getBookedPercentage() ?? 0}
          />
        </div>
      )}
    </>
  )
}
