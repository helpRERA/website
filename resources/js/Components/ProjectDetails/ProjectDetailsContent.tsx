import React, { useMemo } from 'react'
import ProjectDetailsScrollTabs from './ProjectDetailsScrollTabs'
import { ProjectDetailData, ProjectLastModified } from '../../Pages/ProjectDetails'
import ProjectImagesList from './Sections/ProjectImagesList'
import { Language } from '../../ui/ui_interfaces'
import { ExtensionCert, OrderFile } from '../../DataStructures/krera_interfaces'
import { DocumentsByType } from '../../DataStructures/data_interfaces'
import usePromoterInfo from '../ExploreProject/usePromoterInfo'
import { getDisplayDate } from '../../libs/dates'
import Tooltip from '../../ui/Tooltip/Tooltip'
import { Link } from '@inertiajs/react'
import ProjectStatusPill from '../ExploreProject/Common/ProjectStatusPill'
import { PROJECT_TYPE_PLOT } from '../ExploreProject/ProjectFilterForm/ProjectFilterForm'
interface Properties {
  project: ProjectDetailData
  lang?: Language
  documents: DocumentsByType[]
  orders: DocumentsByType[]
  extensionOrder: OrderFile | null
  registrationOrder: OrderFile | null
  extensionCertificate: ExtensionCert | null
  lastModified?: ProjectLastModified | null
  projectHash: string
  hasForm6: boolean
  today: string
}

const ProjectDetailsContent = ({
  project,
  lang = 'en',
  documents,
  orders,
  extensionCertificate,
  lastModified,
  projectHash,
  hasForm6,
  today,
}: Properties) => {
  const { promoterName } = usePromoterInfo(project.promoter ?? null)

  const isDefault = Number(project.IsDefault) === 1

  const encodedCertificateUrl = useMemo(() => {
    return encodeURIComponent(project.certificate_info.CertificateNo ?? '')
  }, [project.certificate_info])

  const projectAddress = useMemo(() => {
    return [
      project.Street,
      project.Locality,
      project.village?.Villagename,
      project.taluk?.SubDistrictname,
      project.district?.Districtname,
    ]
      .filter((part): part is string => part != null && part.trim() !== '')
      .join(', ')
  }, [project])

  return (
    <>
      <div className='flex flex-col lg:flex-row gap-8 w-full mt-6'>
        {/* Left: Images */}
        <div className='w-full lg:w-1/2 relative min-h-[350px]'>
          <div className='absolute inset-0'>
            <ProjectImagesList project={project} />
          </div>
        </div>
        
        {/* Right: Project Info */}
        <div className='flex flex-col w-full lg:w-1/2'>
          <div className='flex items-center gap-3 flex-wrap'>
            <h1 className='text-[32px] font-medium text-[#085484] uppercase tracking-wide'>
              {project.Name}
            </h1>
            {isDefault && (
              <span className='inline-flex items-center gap-1.5 rounded-full bg-red-100 px-4 py-1.5 text-[12px] font-semibold text-red-700 whitespace-nowrap'>
                <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.598c.75 1.334-.213 2.98-1.742 2.98H3.48c-1.53 0-2.493-1.646-1.743-2.98L8.257 3.1zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                </svg>
                Defaulted
              </span>
            )}
          </div>

          {isDefault && project.DefaultReason && (
            <p className='mt-2 text-[13px] text-red-600'>{project.DefaultReason}</p>
          )}
          
          <div className='mt-6 flex flex-col gap-5 text-sm'>
            <div className='flex items-start gap-3'>
              <svg className='w-5 h-5 text-gray-600 mt-0.5 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z' clipRule='evenodd' />
              </svg>
              <span className='uppercase text-gray-700 text-[15px] font-medium'>{promoterName}</span>
            </div>
            
            <div className='flex items-start gap-3 -mt-2'>
              <svg className='w-5 h-5 text-[#085484] shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
              </svg>
              <span className='text-gray-500 uppercase text-[12px] leading-5 break-words'>
                {projectAddress}
              </span>
            </div>
            
            <div className='mt-2 flex max-w-[520px] flex-col gap-2'>
              <div className='flex items-center justify-between gap-4'>
                <span className='text-gray-500 text-[15px]'>Total Floor Area Under Residential Use</span>
                <span className='shrink-0 text-[18px] font-medium text-gray-700'>
                  {project.TotalFloorAreaUnderResidentialUse ? `${project.TotalFloorAreaUnderResidentialUse} sqm` : 'N/A'}
                </span>
              </div>
              <div className='flex items-center justify-between gap-4'>
                <span className='text-gray-500 text-[15px]'>Total Floor Area Under Other Use</span>
                <span className='shrink-0 text-[18px] font-medium text-gray-700'>
                  {project.TotalFloorAreaUnderOtherUse ? `${project.TotalFloorAreaUnderOtherUse} sqm` : 'N/A'}
                </span>
              </div>
            </div>
            
            <div className='flex flex-col gap-1.5 mt-2'>
              <span className='text-[13px] text-gray-500'>Number of Building: {project.BuildingCount}</span>
              <span className='text-[13px] text-gray-500'>Proposed Completion On: {getDisplayDate(project.ProposedDateOfCompletion)}</span>
            </div>
            
            {/* Units & Status Pills */}
            <div className='mt-2 flex flex-wrap items-center gap-4'>
              {project.PType !== PROJECT_TYPE_PLOT && (
                <>
                  <span className='rounded-full bg-[#085484] px-8 py-2.5 text-[12px] font-medium text-white shadow-sm'>
                    {project.NumberOfResidentialUnits || 0} Residential Units
                  </span>
                  <span className='rounded-full bg-[#f4f7fb] text-[#085484] px-8 py-2.5 text-[12px] font-medium shadow-sm'>
                    {project.NumberOfCommercialUnits || 0} Commercial Units
                  </span>
                </>
              )}
              <ProjectStatusPill
                completed={hasForm6}
                proposedDate={project.ProposedDateOfCompletion}
                today={today}
              />
            </div>

            {/* Certificates */}
            <div className='mt-5 flex flex-wrap gap-6'>
              {project.certificate_info?.CertificateNo && (
                <div className='flex flex-col gap-1.5'>
                  <div className='flex items-center gap-1.5 text-[11px] text-gray-500'>
                    <svg className='w-3.5 h-3.5 text-[#085484]' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <span>Project Certificate</span>
                  </div>
                  <Link
                    as='a'
                    href={`/projects?registration_number=${encodedCertificateUrl}`}
                    className='inline-flex items-center justify-center gap-1.5 rounded-full border border-[#085484] px-6 py-1.5 text-[11px] font-medium text-[#085484] hover:bg-blue-50 text-center cursor-pointer'
                  >
                    {project.certificate_info.CertificateNo}
                    <svg className='h-3.5 w-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                    </svg>
                  </Link>
                </div>
              )}

              {extensionCertificate != null && (
                <div className='flex flex-col gap-1.5'>
                  <div className='flex items-center gap-1.5 text-[11px] text-gray-500'>
                    <svg className='w-3.5 h-3.5 text-[#085484]' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <span>Extension Certificate</span>
                  </div>
                  <a
                    href={`/extension-certificate/${project.ID}`}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex items-center justify-center gap-1.5 rounded-full border border-[#085484] px-6 py-1.5 text-[11px] font-medium text-[#085484] hover:bg-blue-50 text-center cursor-pointer'
                  >
                    View Certificate
                    <svg className='h-3.5 w-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                    </svg>
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      
      {/*Scrollable Right Section With Content*/}
      <div className='mt-12 w-full'>
        <ProjectDetailsScrollTabs
          projects={project}
          lang={lang}
          hasForm6={hasForm6}
          documents={documents}
          orders={orders}
          lastModified={lastModified}
          projectHash={projectHash}
          today={today}
        />
      </div>
    </>
  )
}
export default ProjectDetailsContent
