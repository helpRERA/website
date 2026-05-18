import { router } from '@inertiajs/react'
import React from 'react'
import TrashSolid from '../icons/TrashSolid'
import ButtonBorderIcon from './ButtonBorderIcon'

interface Properties {
  link?: string
  onClick?: () => unknown
}

export default function DeleteButton({ onClick, link }: Properties) {
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
      type='danger'
    >
      <TrashSolid />
    </ButtonBorderIcon>
  )
}
