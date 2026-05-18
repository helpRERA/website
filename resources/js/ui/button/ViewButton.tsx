import React from 'react'
import EyeSolid from '../icons/EyeSolid'
import { router } from '@inertiajs/react'

interface Properties {
  link?: string
  onClick?: () => unknown
}

export default function ViewButton({ link, onClick }: Properties) {
  const handleClick = () => {
    if (link != null) {
      router.get(link)
    }
    if (onClick != null) {
      onClick()
    }
  }

  return (
    <button
      onClick={handleClick}
      className='rounded-[100%] bg-primary p-2 text-center
        text-base font-semibold text-white shadow transition duration-200
        ease-in hover:bg-primary-hover focus:ring-2 focus:ring-accent-dark focus:ring-offset-1'
    >
      <EyeSolid />
    </button>
  )
}
