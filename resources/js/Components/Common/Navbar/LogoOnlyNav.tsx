import React from 'react'

const LogoOnlyNav = () => {
  return (
    <div className='sticky top-0 flex w-full flex-col bg-gray-800 p-2'>
      <img
        src='/imge/logo.png'
        alt='Krera'
        className='h-auto w-1/2 sm:w-1/3'
      />
    </div>
  )
}

export default LogoOnlyNav
