import React, { useMemo } from 'react'
import { ProjectDetailData } from '../../../Pages/ProjectDetails'
import useProjectAddress from '../useProjectAddress'
import { Language } from '../../../ui/ui_interfaces'
import Localization from '../../../ui/Localization'
import { localization } from '../../../Localization/localization'

interface Properties {
  project: ProjectDetailData
  lang?: Language
}

const ProjectHospitals = ({ project, lang = 'en' }: Properties) => {
  const city = useProjectAddress(project)

  const link = useMemo(() => {
    return `https://maps.google.com/maps?q=hospitals%20near%20${city},kerala&z=12&output=embed`
  }, [city])

  return (
    <div className='my-5 flex h-[400px] w-full flex-col'>
      <span className='pb-3 text-sm font-bold md:text-base'>
        {' '}
        <Localization
          text={localization['Hospitals Nearby']}
          language={lang}
        />
      </span>
      <iframe
        src={link}
        height='450'
      ></iframe>
    </div>
  )
}

export default ProjectHospitals
