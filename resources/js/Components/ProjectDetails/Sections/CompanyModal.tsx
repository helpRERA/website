import React, { Fragment, useMemo, useState } from 'react'
import { ProjectDetailData } from '../../../Pages/ProjectDetails'
import Modal from '../../../ui/modal/Modal'
import { Language } from '../../../ui/ui_interfaces'
import Localization, { displayText } from '../../../ui/Localization'
import { localization } from '../../../Localization/localization'
import usePromoterInfo from '../../ExploreProject/usePromoterInfo'
import DisplayEmail from '../../Common/DisplayEmail'

interface Properties {
  project: ProjectDetailData
  lang?: Language
}

const CompanyModal = ({ project, lang = 'en' }: Properties) => {
  const [isOpen, setIsOpen] = useState(false)
  const contactInformation = useMemo(() => {
    return `${displayText(localization['Contact Information'], lang)} `
  }, [lang])

  const {
    promoterName,
    promoterAddress,
    promoterEmail,
    promoterPhone,
    promoterLandmark,
    promoterPinCode,
    promoterDistrict,
  } = usePromoterInfo(project.promoter ?? null)

  return (
    <>
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='mx-2 flex items-center justify-center rounded-lg bg-primary-700 px-10 py-6 text-center
          text-sm uppercase tracking-wider text-white transition duration-150 ease-in-out hover:bg-primary-600
          focus:outline-none focus:ring-1 md:py-2'
      >
        <Localization
          text={localization['Contact Company']}
          language={lang}
        />
      </button>

      {isOpen && (
        <Modal
          title={contactInformation}
          setShowModal={setIsOpen}
          showClosButton={false}
        >
          <div className='flex flex-col p-2'>
            <div className='mt-2 flex flex-col gap-2'>
              <span className='text-sm text-gray-500'>{promoterName}</span>
              <span className='text-sm text-gray-500'>{promoterAddress}</span>
              <span className='text-sm text-gray-500'>
                {promoterDistrict},{promoterPinCode}
              </span>
              <span className='text-sm text-gray-500'>LandMark: {promoterLandmark}</span>
              <span className='text-sm text-gray-500'>
                <DisplayEmail email={promoterEmail} />
              </span>
              <span className='text-sm text-gray-500'>{promoterPhone}</span>
            </div>
            <div className='flex justify-end'>
              <button
                type='button'
                className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                onClick={() => setIsOpen(false)}
              >
                <Localization
                  text={localization['Close']}
                  language={lang}
                />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default CompanyModal
