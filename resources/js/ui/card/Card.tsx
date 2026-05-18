import React from 'react'
import Spinner from '../Spinner'

interface Props {
  processing?: boolean
  children?: React.ReactNode
  padding?: boolean
}

export default function Card({ children, processing = false, padding = true }: Props) {
  return (
    <div className={`block h-min w-full rounded bg-white ${padding ? 'p-2  md:p-4' : ''} shadow`}>
      {processing && (
        <div className='flex w-full justify-center'>
          <Spinner svgStyle='text-accent-dark' />
        </div>
      )}
      {!processing && <>{children}</>}
    </div>
  )
}
