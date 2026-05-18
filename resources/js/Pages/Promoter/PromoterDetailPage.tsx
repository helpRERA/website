import React, { useMemo } from 'react'
import { UserProfile } from '../../DataStructures/krera_interfaces'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import usePromoterInfo from '../../Components/ExploreProject/usePromoterInfo'
import HighlightMetric from '../../Components/Promoter/HighlightMetric'
import Button from '../../ui/button/Button'
import MetricDisplay from '../../Components/Promoter/MetricDisplay'
import useProjectsState from '../../Components/ExploreProject/useProjectsState'
import PartnersAccordion from '../../Components/Promoter/PartnersAccordion'

interface Props {
  promoter: UserProfile
  today: string
}

export default function PromoterDetailPage({ promoter, today }: Props) {
  console.log(promoter)
  const {
    promoterName,
    promoterDistrict,
    promoterLandmark,
    promoterAddress,
    promoterPinCode,
    promoterPhone,
    promoterEmail,
  } = usePromoterInfo(promoter)

  const { totalProjects, ongoingProjects, completedProjects, expiredProjects } = useProjectsState(
    promoter.project ?? [],
    today
  )

  const links = useMemo(() => {
    return {
      title: { english: promoterName, malayalam: '' },
      links: {
        lastUUID: 2,
        items: [
          {
            id: 1,
            item: { name: { english: 'Home', malayalam: '' }, link: '/', external: false },
          },
          {
            id: 2,
            item: {
              name: { english: 'Promoters', malayalam: '' },
              link: '/promoters',
              external: false,
            },
          },
          {
            id: 3,
            item: {
              name: { english: promoterName, malayalam: '' },
              link: '/promoters/' + promoter.ID,
              external: false,
            },
          },
        ],
      },
    }
  }, [promoterName, promoter.ID])

  const openProjects = () => {
    window.open(`/explore-projects?search=${promoterName}`, '_blank')
  }

  const openLigations = () => {
    // window.open(`/complaint-list?search=${promoterName}`, '_blank')
    window.open(`/complaint-list`, '_blank')
  }

  const openCall = () => {
    window.open(`tel:${promoterPhone}`, '_blank')
  }

  const openWebsite = () => {
    window.open(`${promoter.CompWebsiteURL}`, '_blank')
  }
  return (
    <AppLayout>
      <PageTitle block={links} />
      <AppLayoutPadding>
        <div className='mb-5 mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='flex flex-col rounded-xl border-2 border-primary-400 bg-primary-50 shadow outline-8 md:flex-row md:p-4'>
            <div className='flex w-full gap-2 p-6 md:w-1/3 md:p-0'>
              <div className='w-full place-items-center'>
                <img
                  src={
                    promoter.logo == null
                      ? '/placeholder.png'
                      : '/promoter-images/' + promoter.UserID
                  }
                  alt={promoterName}
                  className={`h-auto w-1/2 rounded object-cover object-center md:w-full`}
                  loading='lazy'
                  decoding='async'
                />
              </div>
            </div>
            <div className='flex-grow-1 ml-4 flex flex-col p-2'>
              <div className='flex flex-col justify-center gap-2'>
                <div className=''>
                  <span className=''>{promoterAddress}</span>
                  <br />
                  <span className=''>{promoterDistrict}</span>
                  <br />
                  <span className=''>{promoterPinCode}</span>
                </div>
                {promoterLandmark != null && promoterLandmark != '' && (
                  <span className=''>
                    <b>Landmark: </b>
                    {promoterLandmark}
                  </span>
                )}
              </div>
              <div className='flex flex-col'>
                {promoterEmail != null && promoterEmail != '' && (
                  <span className=''>{promoterEmail}</span>
                )}
                <span className=''>{promoterPhone}</span>
              </div>
              <div className='flex flex-col gap-1'>
                {/* <span className='text-xs text-primary-600'>
                  REGISTRATION DATE: <br />
                  <b>{getIndianDate(promoter.CreatedOn)}</b>
                </span> */}
                <span className='text-xs'>
                  TYPE OF ENTERPRISE:&nbsp;
                  <span className='text-xs font-semibold'>
                    {promoter.InfoTypeValue == '1' ? 'Individual' : promoter.org_type?.TypeName}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className=' grid grid-cols-1 gap-10 p-12 md:grid-cols-2'>
            {promoter.CompWebsiteURL != null && promoter.CompWebsiteURL != '' ? (
              <Button
                label='WEBSITE'
                type='tertiary'
                buttonType='button'
                onClick={openWebsite}
                image='/website.svg'
              />
            ) : (
              <Button
                label='WEBSITE'
                type='disabled'
                buttonType='button'
                disabled
                image='/website.svg'
              />
            )}

            <Button
              label='Projects'
              buttonType='button'
              onClick={openProjects}
            />

            <Button
              label='CALL NOW'
              type='tertiary'
              buttonType='button'
              onClick={openCall}
              image='/phone.svg'
            />

            <Button
              label='COMPLAINTS'
              type='border'
              buttonType='button'
              onClick={openLigations}
              image='/search.svg'
            />
          </div>

          <div className='py-4'>
            <span className='font-semibold'>Address For Official Communicaion</span>
            <div className='flex-grow-1 flex flex-col '>
              <div className='flex flex-col justify-center gap-2'>
                <div className=''>
                  <span className=''>{promoterName}</span>
                  <br />
                  <span className=''>{promoterAddress}</span>
                  <br />
                  <span className=''>{promoterDistrict}</span>
                  <br />
                  <span className=''>{promoterPinCode}</span>
                </div>
                {promoterLandmark != null && promoterLandmark != '' && (
                  <span className=''>
                    <b>Landmark: </b>
                    {promoterLandmark}
                  </span>
                )}
              </div>
              <div className='flex flex-col'>
                {promoterEmail != null && promoterEmail != '' && (
                  <span className=''>{promoterEmail}</span>
                )}
                <span className=''>{promoterPhone}</span>
              </div>
            </div>
          </div>
          <div className='w-full rounded-xl border-2 border-primary-400 p-2 md:w-3/4 lg:w-full'>
            <span className='font-semibold'>K-RERA Registered Projects</span>
            <div className='grid grid-cols-2  space-y-5 pt-4'>
              <HighlightMetric
                value={totalProjects}
                label='Registered Projects'
                // labelLineTwo='Projects'
                valueStyle='text-3xl font-semibold'
              />
              <HighlightMetric
                value={completedProjects}
                label='Completed'
              />
              <HighlightMetric
                value={ongoingProjects}
                label='In-Progress'
              />
              <HighlightMetric
                value={expiredProjects}
                label='Schedule Expired'
              />
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5'>
              <span className='font-bold'>Promoter&apos;s Overall Track Record</span>
            </div>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
              <MetricDisplay
                value={promoter.track_record?.StateExperianceYearCount ?? ''}
                label='Years of experience of promoter / parent entity in the state'
              />
              <MetricDisplay
                value={promoter.track_record?.UTExperianceYearCount ?? ''}
                label='Years of experience of promoter / parent entity in other states/UTs'
              />
              <MetricDisplay
                value={promoter.experience?.length ?? ''}
                label='Projects completed till date'
              />
              <MetricDisplay
                value={promoter.track_record?.ProjectAreaConstructed ?? ''}
                label='Area constructed till date'
                unit='sq m'
              />
              <MetricDisplay
                value={promoter.track_record?.OngoingPoroject ?? ''}
                label='Ongoing Projects'
              />
              <MetricDisplay
                value={promoter.track_record?.AreatobeConstructed ?? ''}
                label='Proposed Area to be constructed'
                unit='sq m'
              />
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5'>
              <span className='font-bold'>Partner/Director/Member</span>
            </div>
            <PartnersAccordion partners={promoter.partners ?? []} />
          </div>
        </div>
      </AppLayoutPadding>
    </AppLayout>
  )
}
