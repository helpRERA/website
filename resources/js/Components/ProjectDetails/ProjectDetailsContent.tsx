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
  extensionOrder,
  registrationOrder,
  lastModified,
  projectHash,
  hasForm6,
  today,
}: Properties) => {
  const { promoterName } = usePromoterInfo(project.promoter ?? null)

  const encodedCertificateUrl = useMemo(() => {
    return encodeURIComponent(project.certificate_info.CertificateNo ?? '')
  }, [project.certificate_info])

  return (
    <>
      <div className='flex flex-col lg:flex-row gap-8 w-full mt-6'>
        {/* Left: Images */}
        <div className='w-full lg:w-1/2 flex'>
          <ProjectImagesList project={project} />
        </div>
        
        {/* Right: Project Info */}
        <div className='flex flex-col w-full lg:w-1/2'>
          <h1 className='text-[32px] font-medium text-[#085484] uppercase tracking-wide'>
            {project.Name}
          </h1>
          
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
              <span className='text-gray-500 uppercase text-[12px] leading-relaxed'>
                {project.ProjectAddress} {project?.village?.Villagename == null ? '' : `, ${project?.village?.Villagename}`}
                <br />
                {project?.taluk?.SubDistrictname == null ? '' : `${project?.taluk?.SubDistrictname}`}
                <br />
                {project?.district?.Districtname}
              </span>
            </div>
            
            <div className='mt-2 flex items-center justify-between max-w-[420px]'>
              <span className='text-gray-500 text-[15px]'>Total Area</span>
              <span className='text-[22px] font-medium text-gray-700'>
                {project.TotalFloorAreaUnderResidentialUse ? `${project.TotalFloorAreaUnderResidentialUse} sqm` : 'N/A'}
              </span>
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
                    className='rounded-full border border-gray-400 px-6 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 text-center'
                  >
                    {project.certificate_info.CertificateNo}
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
                    className='rounded-full border border-gray-400 px-6 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 text-center'
                  >
                    {project.certificate_info.CertificateNo}
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
          extensionCertificate={extensionCertificate}
          extensionOrder={extensionOrder}
          lastModified={lastModified}
          projectHash={projectHash}
          registrationOrder={registrationOrder}
          today={today}
        />
      </div>
    </>
  )
}
export default ProjectDetailsContent
