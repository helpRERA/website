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
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid'
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

  return (
    <Link
      href={`/projects/${project.ID}?lang=${lang}`}
      as='a'
      className='flex w-full cursor-pointer flex-wrap rounded-xl bg-primary-50 p-3 text-black shadow outline-8 hover:shadow-xl md:p-10'
    >
      <div className='flex w-full flex-col gap-3 md:w-1/3 xl:w-1/3'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2'>
          {images.map((image, index) => {
            return (
              <div
                key={image.ID?.toString() + ' ' + index + ' ' + project.ID.toString()}
                className={`${index === 1 ? 'hidden sm:block' : ''}`}
              >
                <img
                  src={image.ID == null ? '/placeholder.png' : `/uploaded-images/${image.ID}`}
                  alt={project.Name}
                  className={`aspect-[4/3] h-auto w-full rounded object-cover object-center`}
                  loading='lazy'
                  decoding='async'
                />
              </div>
            )
          })}
        </div>
        {project.images != null && (
          <>
            <div
              className={`hidden  ${project.images.length > 2 ? 'sm:flex' : 'hidden'} justify-end`}
            >
              <span className='text-xs underline'>{project.images.length - 2} more images</span>
            </div>
            <div
              className={`${project.images.length > 1 ? 'flex' : 'hidden'} justify-end sm:hidden`}
            >
              <span className='text-xs underline'>{project.images.length - 1} more images</span>
            </div>
          </>
        )}
      </div>
      <div className='flex w-full flex-col gap-5 pt-5 md:w-2/3 md:pt-0 md:pl-4 xl:w-2/3'>
        <div className='md:col-span-3'>
          <h1 className='text-xl capitalize lg:text-2xl'>{project.Name}</h1>
        </div>
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-3'>
          <div className='flex flex-col gap-4'>
            <span className='font-semibold'>{promoterName}</span>
            <span className=''>{project.certificate_info?.CertificateNo}</span>
            <div className='flex flex-wrap gap-3'>
              {project.PType != PROJECT_TYPE_PLOT && (
                <>
                  <span className='flex justify-center rounded-full bg-highlight-500 px-2 py-1 text-sm'>
                    {project.NumberOfResidentialUnits}{' '}
                    <Localization
                      text={localization['Residential Units']}
                      language={lang}
                    />
                  </span>
                  <span className='flex justify-center rounded-full bg-alert-500 px-2 py-1 text-sm'>
                    {project.NumberOfCommercialUnits}{' '}
                    <Localization
                      text={localization['Commercial Units']}
                      language={lang}
                    />
                  </span>
                </>
              )}
              <ProjectStatusPill
                completed={completed}
                today={today}
                proposedDate={project.ProposedDateOfCompletion}
              />
            </div>
            <div className=''>
              {project.PType != PROJECT_TYPE_PLOT && (
                <span>
                  <Localization
                    text={localization['Number Of Buildings']}
                    language={lang}
                  />{' '}
                  <b>{project.buildings_count}</b>
                </span>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <span className=''>
              <b>
                {project?.district?.Districtname}{' '}
                {project.taluk == null ? '' : `, ${project?.taluk?.SubDistrictname}`}
              </b>
            </span>
            <span>
              <Localization
                text={localization['Proposed Completion On']}
                language={lang}
              />{' '}
              <br />
              <b>{getIndianDate(project.ProposedDateOfCompletion)}</b>
            </span>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col gap-5'>
              <AvailabilityProgressLine
                project={project}
                lang={lang}
              />
              <span className=''>
                <b className=''>{project.Area}sqm</b>{' '}
                <Localization
                  text={localization['Total Area']}
                  language={lang}
                />
              </span>
            </div>
          </div>
        </div>
        <div className='flex items-end justify-end text-blue-600 underline hover:text-blue-500'>
          <span className='text-sm '>More Info &nbsp;</span>
          <ChevronDoubleRightIcon className='h-4 w-4' />
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
