import React from 'react'
import { chooseColor } from './Button'

interface Props {
  onClick: () => unknown
  type?: string
  processing?: boolean
  disabled?: boolean
  children: React.ReactNode
  small?: boolean
}

export default function ButtonIcon({
  children,
  onClick,
  type = 'primary',
  processing = false,
  disabled = false,
  small = false,
}: Props) {
  const [buttonStyle, svgStyle] = chooseColor(type)

  return (
    <>
      {!processing && (
        <button
          onClick={onClick}
          disabled={disabled}
          className={`${small ? 'p-1' : 'px-6 py-3'} flex items-center
             justify-center rounded
            text-left text-sm font-semibold uppercase
            tracking-wider shadow-md transition duration-300 ease-in hover:bg-neutral-400 hover:shadow
            focus:ring-4
             ${buttonStyle}`}
        >
          {children}
        </button>
      )}
      {processing && (
        <span className={svgStyle}>
          <svg
            className='spinner_svg h-8 w-8'
            viewBox='0 0 100 100'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              className='spinner_circle'
              stroke='currentColor'
              cx='50'
              cy='50'
              r='45'
            />
          </svg>
        </span>
      )}
    </>
  )
}
