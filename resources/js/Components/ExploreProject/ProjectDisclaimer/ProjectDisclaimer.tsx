import { useEffect, useState } from 'react'
import Modal from '../../../ui/modal/Modal'
import Button from '../../../ui/button/Button'
interface Properties {
  className?: string
}

const ProjectDisclaimer = ({ className }: Properties) => {
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('disclaimer') !== 'true') {
      setShowDisclaimer(true)
    }
  }, [])

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false)
    localStorage.setItem('disclaimer', 'true')
  }

  return (
    <>
      <button
        type='button'
        onClick={() => setShowDisclaimer(true)}
        className={`rounded-md bg-[#e6f0f7] px-8 py-2.5 text-sm font-medium text-[#085484] transition-colors hover:bg-[#d4e5f0] ${className || ''}`}
      >
        Disclaimer
      </button>
      {showDisclaimer && (
        <Modal
          setShowModal={setShowDisclaimer}
          title='Disclaimer'
        >
          <div className='flex flex-col gap-5 p-2'>
            <p className='text-red-500'>
              Please note that the information displayed on this site is provided by the respective
              promoters to K-RERA, and as such, K-RERA does not assume any responsibility or
              liability for the accuracy or completeness of the information presented.
            </p>
            <div className='flex justify-end'>
              <Button
                label='I UNDERSTAND'
                onClick={handleDisclaimerAccept}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default ProjectDisclaimer
