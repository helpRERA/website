import React from 'react'
import { router } from '@inertiajs/react'
import ButtonBorderIcon from './ButtonBorderIcon'
import { PlusIcon } from '@heroicons/react/20/solid'

interface Props {
  link?: string
  onClick?: () => unknown
}

export default function AddButton({ link, onClick }: Props) {
  const handleClick = () => {
    if (link != null) {
      router.get(link)
      return
    }
    if (onClick != null) {
      onClick()
    }
  }

  return (
    <ButtonBorderIcon onClick={handleClick}>
      <PlusIcon className='h-6 w-6' />
    </ButtonBorderIcon>
  )
}
