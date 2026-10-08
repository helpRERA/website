import React, { RefObject } from 'react'
import { ProjectDetailData } from '../../../../Pages/ProjectDetails'
import { Language } from '../../../../ui/ui_interfaces'
import Localization from '../../../../ui/Localization'
import { localization } from '../../../../Localization/localization'

interface Properties {
  reference: RefObject<HTMLDivElement>
  project: ProjectDetailData
  lang?: Language
}

const ProjectQuickFact = ({ reference, project, lang = 'en' }: Properties) => {
  return (
    <div className='mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-4 mb-10' ref={reference}>
      {/* Title */}
      <h3 className='text-lg font-medium text-[#085484]'>
        <Localization
          text={localization['Quick Facts']}
          language={lang}
        />
      </h3>

      {/* Area details */}
      <div className='flex flex-col gap-4 mt-2 mb-2'>
        <p
          className='text-[16px] font-medium text-[#555555]'
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          <Localization
            text={localization['Total Floor Area Under Residential Use']}
            language={lang}
          />
          <span className='ml-1'>
            : {project.TotalFloorAreaUnderResidentialUse == '.00'
              ? 0
              : project.TotalFloorAreaUnderResidentialUse}{' '}
            sqm
          </span>
        </p>
        <p
          className='text-[16px] font-medium text-[#555555]'
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          <Localization
            text={localization['Total Floor Area Under Other Use']}
            language={lang}
          />
          <span className='ml-1'>
            : {project.TotalFloorAreaUnderOtherUse == '.00'
              ? 0
              : project.TotalFloorAreaUnderOtherUse}{' '}
            sqm
          </span>
        </p>
      </div>

      {/* Facilities Grid */}
      <div className='flex flex-col gap-1.5 mt-2'>
        {/* Header row */}
        <div className='grid grid-cols-2 gap-2'>
          <div className='bg-[#085484] text-white text-center py-2.5 px-4 rounded-sm text-sm font-medium'>
            Common Amenities
          </div>
          <div className='bg-[#085484] text-white text-center py-2.5 px-4 rounded-sm text-sm font-medium'>
            Proposed - Percentage
          </div>
        </div>

        {/* Data rows */}
        {project.facilities?.map((facility) => {
          return (
            <div key={facility.ID.toString()} className='grid grid-cols-2 gap-2'>
              <div
                className='border border-gray-200 text-center py-2.5 px-4 rounded-sm text-[16px] font-medium text-[#555555] bg-white'
                style={{ fontFamily: "'Urbanist', sans-serif" }}
              >
                {facility.FDetailName}
              </div>
              <div
                className='border border-gray-200 text-center py-2.5 px-4 rounded-sm text-[16px] font-medium text-[#555555] bg-white'
                style={{ fontFamily: "'Urbanist', sans-serif" }}
              >
                {facility.Available} - {facility.Percent}%
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default ProjectQuickFact
