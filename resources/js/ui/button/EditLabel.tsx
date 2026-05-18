import { MouseEvent } from 'react'

interface Properties {
  onClick: (event: MouseEvent<HTMLElement>) => void
  label?: string
}

const EditLabel = ({ onClick, label = 'Edit' }: Properties) => {
  return (
    <span
      onClick={onClick}
      className='cursor-pointer font-normal text-info-600 hover:font-semibold hover:text-info-500'
    >
      [{label}]
    </span>
  )
}

export default EditLabel
