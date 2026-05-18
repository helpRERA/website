import React, { RefObject, useMemo } from 'react'
import { getDisplayDate } from '../../../../libs/dates'
import { ProjectDetailData, ProjectLastModified } from '../../../../Pages/ProjectDetails'
import BuildingsAccordion from './BuildingsAccordion'
import CompanyModal from '../CompanyModal'
import ProjectStatusPill from '../../../ExploreProject/Common/ProjectStatusPill'
import BorderedPill from '../../../../ui/Pills/BorderedPill'
import { Language } from '../../../../ui/ui_interfaces'
import Localization, { displayText } from '../../../../ui/Localization'
import { localization } from '../../../../Localization/localization'
import { ExtensionCert, OrderFile } from '../../../../DataStructures/krera_interfaces'
import Tooltip from '../../../../ui/Tooltip/Tooltip'
import { Link } from '@inertiajs/react'
import usePromoterInfo from '../../../ExploreProject/usePromoterInfo'
import ProgressLine from '../../../../ui/ProgressLine'
import AvailabilityProgressLine from '../../../ExploreProject/AvailabilityProgressLine'
import { PROJECT_TYPE_PLOT } from '../../../ExploreProject/ProjectFilterForm/ProjectFilterForm'

interface Properties {
  reference: RefObject<HTMLDivElement>
  project: ProjectDetailData
  lang?: Language
  extensionOrder: OrderFile | null
  registrationOrder: OrderFile | null
  extensionCertificate: ExtensionCert | null
  lastModified?: ProjectLastModified | null
  projectHash: string
  hasForm6: boolean
  today: string
}

const ProjectOverview = ({
  reference,
  project,
  lang = 'en',
  extensionCertificate,
  extensionOrder,
  registrationOrder,
  lastModified,
  projectHash,
  today,
  hasForm6,
}: Properties) => {
  const residentialUnit = useMemo(() => {
    return `${project.NumberOfResidentialUnits} ${displayText(
      localization['Residential Units'],
      lang
    )} `
  }, [project, lang])

  const commercialUnit = useMemo(() => {
    return `${project.NumberOfCommercialUnits} ${displayText(
      localization['Commercial Units'],
      lang
    )} `
  }, [project, lang])

  const encodedCertificateUrl = useMemo(() => {
    return encodeURIComponent(project.certificate_info.CertificateNo ?? '')
  }, [project.certificate_info])

  const encodedProjectHash = useMemo(() => {
    return encodeURIComponent(projectHash)
  }, [projectHash])

  const { promoterName } = usePromoterInfo(project.promoter ?? null)

  console.log(project.FinancialProgress)
  console.log(project.PhysicalProgress)

  return (
    <div className='my-5 flex w-full flex-col gap-3'>
      <div
        className='absolute top-0'
        ref={reference}
      ></div>
      <div className='flex flex-col gap-5'>
      <h2>Certificates related to project:</h2>
        <div className='flex flex-wrap items-center gap-3'>
          <Link
            as='a'
            href={`/projects?registration_number=${encodedCertificateUrl}`}
            className='text-xs font-bold text-blue-500 underline hover:text-blue-400 md:text-sm'
          >
            {project.certificate_info.CertificateNo}
          </Link>
          {project.hsm != null && (
            <a
              href={`/signed-certificate/${project.hsm?.DgnID}`}
              className='tooltip-parent text-xs font-bold text-blue-500 underline hover:text-blue-400 md:text-sm'
              target='_blank'
              rel='noreferrer'
            >
              <img
                alt='Signed Certificate'
                src={'/svg/certificate.svg'}
                className='h-8 w-8'
              />
              <Tooltip text='Certificate' />
            </a>
          )}
          {extensionCertificate != null && (
            <a
              href={`/extension-certificate/${project.ID}`}
              className='tooltip-parent text-xs font-bold text-blue-500 underline hover:text-blue-400 md:text-sm'
              target='_blank'
              rel='noreferrer'
            >
              <img
                alt='Extension Certificate'
                src={'/svg/extension.svg'}
                className='h-8 w-8'
              />
              <Tooltip text='Extension Certificate' />
            </a>
          )}
       
        </div>
        <div>
        <h2>Orders related to project:</h2>
          {registrationOrder != null && (
            <a
              href={`/registration-order/${registrationOrder?.DocID}`}
              className='tooltip-parent text-xs font-bold text-blue-500 underline hover:text-blue-400 md:text-sm'
              
              target='_blank'
              rel='noreferrer'
         
            >
              <img
                alt='Registration Order'
                src={'/svg/order.svg'}
                className=''
                
              />
              <Tooltip text='Order' />
            </a>
          )}
          {extensionOrder != null && (
            <a
              href={`/extension-order/${extensionOrder?.DocID}`}
              className='tooltip-parent text-xs font-bold text-blue-500 underline hover:text-blue-400 md:text-sm'
              target='_blank'
              rel='noreferrer'
              style={{ left: "76px" }}
            >
              <img
                alt='Extension Order'
                src={'/svg/order.svg'}
                className=''
              />
              <Tooltip text='Order' />
            </a>
          )}
        </div>
        {lastModified != null && (
          <p className='text-xs font-bold md:text-sm'>
            Information As Of: {lastModified.date}
            <br />
            {lastModified.daysSinceLastModification > 100 && !hasForm6 && (
              <span className='text-red-500'>
                Information on this property has not been updated for{' '}
                {lastModified.daysSinceLastModification} days, and the Quarterly Progress Report is
                pending
              </span>
            )}
          </p>
        )}
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          {project.FinancialProgress != null && (
            <div className='flex flex-col'>
              <span className='text-sm'>
                Financial Progress:{' '}
                <b className='text-base'>
                  {Number.isNaN(Number(project.FinancialProgress))
                    ? '0'
                    : project.FinancialProgress}
                </b>
                %
              </span>
              <ProgressLine progress={project.FinancialProgress} />
            </div>
          )}
          {project.PhysicalProgress != null && (
            <div className='flex flex-col'>
              <span className='text-sm'>
                Physical Progress:{' '}
                <b className='text-base'>
                  {Number.isNaN(Number(project.PhysicalProgress)) ? '0' : project.PhysicalProgress}
                </b>
                
              </span>
              <ProgressLine progress={project.PhysicalProgress} />
            </div>
          )}
          <AvailabilityProgressLine
            project={project}
            lang={lang}
          />
        </div>
        <span className='text-xs md:text-sm'>By {promoterName}</span>
        <div className='flex flex-col'>
          <span className='text-xs md:text-sm'>
            {project.Street} {project.village != null && project.Street != null ? ', ' : ''}
            {project.village?.Villagename}
          </span>
          <div className='flex flex-wrap'>
            <span className='text-xs md:text-sm'> &nbsp;</span>
            <span className='text-xs md:inline-block md:text-sm'>
              {project.district?.Districtname}
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2 p-1 md:flex-row md:gap-6'>
        {project.PType != PROJECT_TYPE_PLOT && (
          <>
            <BorderedPill value={residentialUnit} />
            <BorderedPill value={commercialUnit} />
          </>
        )}
        <ProjectStatusPill
          completed={hasForm6}
          proposedDate={project.ProposedDateOfCompletion}
          today={today}
        />
      </div>
      <div className='flex flex-row gap-2'>
        <span className='text-xs md:text-sm'>
          {' '}
          <Localization
            text={localization['Proposed Completion On']}
            language={lang}
          />
        </span>
        <span className='text-xs font-semibold md:text-sm'>
          {getDisplayDate(project.ProposedDateOfCompletion)}
        </span>
      </div>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-3'>
        <CompanyModal
          project={project}
          lang={lang}
        />

        <a
          className='mx-2 flex items-center justify-center rounded-lg bg-primary-700 px-10 py-6 text-center
            text-sm uppercase tracking-wider text-white transition duration-150 ease-in-out hover:bg-primary-600
            focus:outline-none focus:ring-1 md:py-2'
          href={`https://reraonline.kerala.gov.in/PrintPreview/PrintPreview?q=${encodedProjectHash}`}
          target='_blank'
          rel='noreferrer'
        >
          Complete Project Details
        </a>
        <a
          className='mx-2 flex items-center justify-center rounded-lg bg-primary-700 px-10 py-6 text-center
            text-sm uppercase tracking-wider text-white transition duration-150 ease-in-out hover:bg-primary-600
            focus:outline-none focus:ring-1 md:py-2'
          href={`https://reraonline.kerala.gov.in/ProjectStatusPublic/ProjectStatusPublic?qpr=${encodedProjectHash}`}
          target='_blank'
          rel='noreferrer'
        >
          Quarterly Progress Report (QPR)
        </a>
      </div>
      <div className=''>
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
