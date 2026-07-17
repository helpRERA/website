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

      {/* Blue Informational Card */}
      <div className='mt-8 w-full rounded-2xl bg-[#085484] px-6 py-12 text-center shadow-lg flex flex-col items-center justify-center gap-4 text-white mb-8'>
        <h4 className='text-[28px] font-semibold' style={{ fontFamily: "'Urbanist', sans-serif" }}>Make Safe & Informed Property Decisions</h4>
        <p className='text-sm text-blue-100 max-w-2xl'>
          Access verified project details, check developer credentials, and ensure your investment is secure with trusted information from K-RERA.
        </p>
        <a
          href='/explore-projects'
          className='mt-4 inline-flex items-center justify-center gap-3 rounded-full bg-white pl-6 pr-1.5 py-1.5 text-sm font-semibold text-[#085484] transition-colors hover:bg-gray-100 shadow-sm'
        >
          Verify a Project Now
          <div className='flex items-center justify-center rounded-full bg-[#085484] text-white p-1.5'>
            <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </div>
        </a>
      </div>
    </div>
  )
}

export default ProjectQuickFact
