import { UserProfile } from '../../DataStructures/krera_interfaces'
import React from 'react'
import usePromoterInfo from '../ExploreProject/usePromoterInfo'
import useProjectsState from '../ExploreProject/useProjectsState'
import Button from '../../ui/button/Button'

interface Props {
  promoter: UserProfile
}

export default function PromoterCard({ promoter }: Props) {
  const {
    promoterName,
    promoterAddress,
    promoterDistrict,
    promoterLandmark,
    promoterPhone,
    promoterEmail,
    promoterPinCode,
  } = usePromoterInfo(promoter)

  const { totalProjects, ongoingProjects, completedProjects } = useProjectsState(
    promoter.project ?? []
  )

  const openProjectDetail = () => {
    window.open(`/promoter/${promoter.ID}`, '_blank')
  }

  const openProjectExplorer = () => {
    window.open(`/explore-projects?search=${promoterName}`, '_blank')
  }

  return (
    <div className='flex flex-col gap-2 rounded-md bg-primary-50  p-4 shadow outline-8 hover:shadow-xl md:grid-cols-2 md:p-8'>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-5'>
        <h1 className='text-xl capitalize md:col-span-4 md:col-start-2 lg:text-2xl'>
          {promoterName}
        </h1>
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-5'>
        <div className='flex flex-col gap-5'>
          <div className='w-full'>
            <img
              src={
                promoter.logo?.LogoImagefileName == null
                  ? '/placeholder.png'
                  : '/promoter-images/' + promoter.UserID
              }
              alt={promoterName}
              className={` h-auto w-full rounded object-cover`}
              loading='lazy'
              decoding='async'
            />
          </div>
        </div>
        <div className='flex flex-col gap-5  md:col-span-4'>
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
            <span>
              <b>Phone</b>: {promoterPhone}
            </span>
            {promoterEmail != null && promoterEmail != '' && (
              <span>
                <b>Email</b>: {promoterEmail}
              </span>
            )}
          </div>
          <div className='grid grid-cols-3 gap-2 sm:grid-cols-2 md:grid-cols-3'>
            <div className='flex items-center gap-2'>
              <span className='flex-shrink-1 text-2xl font-semibold'>{totalProjects}</span>
              <div className='flex flex-grow items-center pl-1'>
                Registered
                <br />
                Projects
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='flex-shrink-1 text-2xl font-semibold'>{completedProjects}</span>
              <div className='flex flex-grow items-center pl-1'>
                Completed
                <br />
                Projects
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='flex-shrink-1 text-2xl font-semibold'>{ongoingProjects}</span>
              <div className='flex flex-grow items-center pl-1'>
                Inprogress
                <br />
                Projects
              </div>
            </div>
          </div>
          <div className='flex items-center justify-end gap-4'>
            {/* <a
              className='link'
              href={`/explore-projects?search=${promoterName}`}
              target='_blank'
              rel='noreferrer'
            >
              View Projects
            </a> */}
            {/* <a
              className='link'
              href={`/promoter/${promoter.ID}`}
              target='_blank'
              rel='noreferrer'
            >
              More Info
            </a> */}
            <Button
              label='Projects'
              type='border'
              buttonType='button'
              onClick={openProjectExplorer}
            />
            <Button
              label='More Info'
              buttonType='button'
              onClick={openProjectDetail}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
