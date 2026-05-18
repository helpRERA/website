import React from 'react'
import PencilSolid from '../icons/PencilSolid'
import { router } from '@inertiajs/react'
import ButtonBorderIcon from './ButtonBorderIcon'

interface Properties {
  link?: string
  onClick?: () => unknown
}

export default function EditButton({ link, onClick }: Properties) {
  const handleClick = () => {
    if (link != null) {
      router.get(link)
    }
    if (onClick != null) {
      onClick()
    }
  }

  return (
    <ButtonBorderIcon
      onClick={handleClick}
      type='info'
    >
      <PencilSolid />
    </ButtonBorderIcon>
  )
}
