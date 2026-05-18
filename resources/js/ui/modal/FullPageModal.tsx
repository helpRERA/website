import React from 'react'
import Button from '../button/Button'
import CloseSolid from '../icons/CloseSolid'

interface Properties {
  title: string
  children: React.ReactNode
  setShowModal: (show: boolean) => void
}

const FullPageModal = ({ title, children, setShowModal }: Properties) => {
  return (
    <div className='flex h-screen w-screen flex-col'>
      <div className='sticky top-0 flex w-full items-start justify-between bg-white p-2'>
        <h3>{title}</h3>
        <div
          onClick={() => setShowModal(false)}
          className='cursor-pointer rounded transition
                  duration-150 ease-in-out hover:bg-gray-200'
        >
          <CloseSolid />
        </div>
      </div>
      <div className='py-15 flex flex-grow p-2'>{children}</div>
    </div>
  )
}

export default FullPageModal
