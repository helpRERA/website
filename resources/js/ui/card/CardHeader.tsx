import { Link, router } from '@inertiajs/react'
import React from 'react'
import AddButton from '../button/AddButton'
import BackButton from '../button/BackButton'

interface Properties {
  title: string
  back?: string
  add?: string
  onAdd?: () => void
}

const CardHeader = ({ title, back, add, onAdd }: Properties) => {
  return (
    <div className='mb-2 flex w-full items-center gap-x-2 lg:gap-x-4'>
      {back != undefined && <BackButton link={back} />}

      <h4 className='text-xl font-medium text-gray-900'>{title}</h4>

      {add != null && (
        <div className='ml-auto self-end'>
          <AddButton link={add} />
        </div>
      )}
      {onAdd != null && (
        <div className='ml-auto self-end'>
          <AddButton onClick={onAdd} />
        </div>
      )}
    </div>
  )
}

export default CardHeader
