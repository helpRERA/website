import React, { useMemo } from 'react'
import { Link } from '@inertiajs/react'
import { getIndianDate } from '../../../libs/dates'
import useProjectImages from '../../ProjectDetails/ProjectImages/useProjectImages'
import { ProjectListItem } from '../ExploreProject'
import ProjectStatusPill from '../Common/ProjectStatusPill'
import Localization from '../../../ui/Localization'
import { localization } from '../../../Localization/localization'
import { Language } from '../../../ui/ui_interfaces'
import usePromoterInfo from '../usePromoterInfo'
import { PROJECT_TYPE_PLOT } from '../ProjectFilterForm/ProjectFilterForm'
import AvailabilityProgressLine from '../AvailabilityProgressLine'

interface Properties {
  project: ProjectListItem
  lang?: Language
  today: string
}

const ProjectCard = ({ project, today, lang = 'en' }: Properties) => {
  const images = useProjectImages(project.images ?? [])

  const completed = useMemo(() => {
    return project.documents.length > 0
  }, [project])

  const { promoterName } = usePromoterInfo(project.promoter ?? null)

  const isDefault = Number(project.IsDefault) === 1



  return (
    <Link
      href={`/projects/${project.ID}?lang=${lang}`}
      as='a'
      className={`flex w-full cursor-pointer flex-col lg:flex-row gap-6 rounded-xl p-6 shadow-sm border transition-shadow hover:shadow-md ${isDefault ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-white'
        }`}
    >
      {/* Left Column - Image */}
      <div className='flex w-full shrink-0 flex-col lg:w-[320px]'>
        <img
          src={images[0]?.ID == null ? '/placeholder.png' : `/uploaded-images/${images[0]?.ID}`}
          alt={project.Name}
          className='aspect-[16/9] h-[180px] w-full rounded-lg object-cover object-center'
          loading='lazy'
          decoding='async'
        />
        {project.images != null && project.images.length > 1 && (
          <div className='mt-2 flex justify-end'>
            <span className='text-xs text-gray-500'>+{project.images.length - 1} more photos</span>
          </div>
        )}
      </div>

      {/* Middle Column - Details */}
      <div className='flex w-full flex-col lg:flex-grow border-b border-gray-100 pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6'>
        <div className='flex items-center gap-2 flex-wrap'>
          <h1 className='text-[22px] font-medium uppercase text-[#085484] tracking-wide'>
            {project.Name}
          </h1>
          {isDefault && (
            <span className='inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-[11px] font-semibold text-red-700 whitespace-nowrap'>
              <svg className='h-3.5 w-3.5' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.598c.75 1.334-.213 2.98-1.742 2.98H3.48c-1.53 0-2.493-1.646-1.743-2.98L8.257 3.1zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
              </svg>
              Defaulted
            </span>
          )}
        </div>

        {isDefault && project.DefaultReason && (
          <p className='mt-1 text-[12px] text-red-600'>{project.DefaultReason}</p>
        )}

        <div className='mt-2 flex flex-col gap-1.5 text-[13px] text-gray-600'>
          <div className='flex items-center gap-2'>
            <svg className='h-4 w-4 shrink-0 text-gray-700' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z' clipRule='evenodd' />
            </svg>
            <span className='font-medium text-gray-700 uppercase'>{promoterName}</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg className='h-4 w-4 shrink-0 text-[#085484]' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
            </svg>
            <span className='text-gray-500'>
              {project?.village?.Villagename == null ? '' : `${project?.village?.Villagename}, `}
              {project?.taluk?.SubDistrictname == null ? '' : `${project?.taluk?.SubDistrictname} `}
              {project?.district?.Districtname}
            </span>
          </div>
        </div>

        <div className='mt-6 flex flex-col gap-2 text-[13px]'>
          <div className='flex items-center gap-6'>
            <span className='text-gray-500 w-[150px]'>Total Area</span>
            <span className='font-semibold text-gray-800'>{project.Area} sqm</span>
          </div>
          {project.PType != PROJECT_TYPE_PLOT && (
            <div className='flex items-center gap-2'>
              <span className='text-gray-500'>Number of Building:</span>
              <span className='text-gray-600'>{project.buildings_count}</span>
            </div>
          )}
          <div className='flex items-center gap-2'>
            <span className='text-gray-500'>Proposed Completion On:</span>
            <span className='text-gray-600'>{getIndianDate(project.ProposedDateOfCompletion)}</span>
          </div>
        </div>
      </div>

      {/* Right Column - Badges & Actions */}
      <div className='flex w-full shrink-0 flex-col lg:w-[280px]'>
        <div className='flex flex-col h-full justify-between'>
          {/* Top Section */}
          <div className='flex flex-col gap-6'>
            <div className='flex flex-wrap gap-2'>
              {project.PType != PROJECT_TYPE_PLOT && (
                <>
                  <span className='whitespace-nowrap rounded-full bg-[#085484] px-4 py-1.5 text-[11px] font-medium text-white'>
                    {project.NumberOfResidentialUnits} Residential Units
                  </span>
                  <span className='whitespace-nowrap rounded-full bg-[#f0f5fa] px-4 py-1.5 text-[11px] font-medium text-[#085484]'>
                    {project.NumberOfCommercialUnits} Commercial Units
                  </span>
                </>
              )}
            </div>

            <div className='w-full'>
              <AvailabilityProgressLine
                project={project}
                lang={lang}
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className='mt-6 flex items-end justify-between'>
            <div className='flex flex-col'>
              <div className='flex items-center gap-1.5 mb-1.5 text-gray-500 text-xs'>
                <svg className='h-4 w-4 text-[#085484]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
                <span>Certificate</span>
              </div>
              <div className='inline-flex items-center justify-center rounded-full border border-[#085484] bg-white px-4 py-1.5 text-[11px] font-medium text-gray-600'>
                {project.certificate_info?.CertificateNo}
              </div>
            </div>

            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#085484] text-white shadow-md hover:bg-[#06426a] transition-colors'>
              <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard