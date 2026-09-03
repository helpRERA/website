import React, { RefObject, useMemo } from 'react'
import { getDisplayDate } from '../../../../libs/dates'
import { ProjectDetailData, ProjectLastModified } from '../../../../Pages/ProjectDetails'
import BuildingsAccordion from './BuildingsAccordion'
import CompanyModal from '../CompanyModal'
import { Language } from '../../../../ui/ui_interfaces'
import AvailabilityProgressLine from '../../../ExploreProject/AvailabilityProgressLine'
import ProgressLine from '../../../../ui/ProgressLine'
interface Properties {
  reference: RefObject<HTMLDivElement>
  project: ProjectDetailData
  lang?: Language
  lastModified?: ProjectLastModified | null
  projectHash: string
  hasForm6: boolean
  today: string
}

const ProjectOverview = ({
  reference,
  project,
  lang = 'en',
  lastModified,
  projectHash,
  today,
  hasForm6,
}: Properties) => {
  const encodedProjectHash = useMemo(() => {
    return encodeURIComponent(projectHash)
  }, [projectHash])

  return (
    <div className='mx-auto flex w-full max-w-[1100px] flex-col gap-12 px-4' ref={reference}>
      {/* Top Info Row */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
        {/* Left: Project Info */}
        <div className='flex flex-col gap-4'>
          <h3 className='text-lg font-medium text-[#085484]'>Overview</h3>
          {lastModified != null && (
            <p className='text-sm text-gray-600 mt-2'>
              Information As Of: {lastModified.date}
              {lastModified.daysSinceLastModification > 100 && !hasForm6 && (
                <span className='text-red-500 block mt-1'>
                  Information on this property has not been updated for{' '}
                  {lastModified.daysSinceLastModification} days, and the Quarterly Progress Report is pending
                </span>
              )}
            </p>
          )}

          <p className='text-sm text-gray-600'>
            Proposed Completion On {getDisplayDate(project.ProposedDateOfCompletion)}
          </p>
        </div>

        {/* Right: Availability & Progress */}
        <div className='flex flex-col gap-6 md:border-l md:border-gray-200 md:pl-8'>

          <div className='flex flex-col md:flex-row items-center gap-6'>
            <div className='flex flex-col w-full md:w-1/2'>
              <ProgressLine
                progress={project.FinancialProgress ?? 0}
                progressColor='bg-[#085484]'
                backgroundColor='bg-yellow-200'
              />
              <div className='mt-2 text-xs text-gray-500'>
                Financial Progress: <span className='font-medium text-gray-700'>{project.FinancialProgress ?? '0'}%</span>
              </div>
            </div>

            <div className='flex flex-col w-full md:w-1/2'>
              <ProgressLine
                progress={project.PhysicalProgress ?? 0}
                progressColor='bg-[#085484]'
                backgroundColor='bg-yellow-200'
              />
              <div className='mt-2 text-xs text-gray-500'>
                Physical Progress: <span className='font-medium text-gray-700'>{project.PhysicalProgress ?? '0'}</span>
              </div>
            </div>
          </div>

          <AvailabilityProgressLine project={project} lang={lang} />
        </div>
      </div>

      {/* Buttons Row */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <CompanyModal project={project} lang={lang} />

        <a
          className='flex items-center justify-center gap-3 rounded-lg bg-[#085484] px-6 py-4 text-center text-sm font-medium text-white transition hover:bg-[#06426a] shadow-sm'
          href={`https://reraonline.kerala.gov.in/PrintPreview/PrintPreview?q=${encodedProjectHash}`}
          target='_blank'
          rel='noreferrer'
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span className="text-left">Complete Project Details</span>
        </a>
        <a
          className='flex items-center justify-center gap-3 rounded-lg bg-[#085484] px-6 py-4 text-center text-sm font-medium text-white transition hover:bg-[#06426a] shadow-sm'
          href={`https://reraonline.kerala.gov.in/ProjectStatusPublic/ProjectStatusPublic?qpr=${encodedProjectHash}`}
          target='_blank'
          rel='noreferrer'
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          <span className="text-left">Quarterly Progress Report</span>
        </a>
      </div>

      {/* Accordions */}
      <div className='mt-4 flex flex-col gap-4'>
        {project.buildings.map((building) => {
          return (
            <BuildingsAccordion
              key={building.ID.toString()}
              building={building}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ProjectOverview
