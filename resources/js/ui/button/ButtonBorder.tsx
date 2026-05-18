import React from 'react'
import { ClickHandler } from '../ui_interfaces'

interface Props {
  label: string
  onClick?: ClickHandler
  type?: string
  processing?: boolean
  disabled?: boolean
}

export const chooseColor = (type: string): [string, string] => {
  switch (type) {
    case 'accent': {
      return [
        'bg-transparent border-accent-dark text-accent-dark focus:ring-accent-dark hover:bg-accent-hover',
        'text-accent-dark',
      ]
    }
    case 'secondary': {
      return ['bg-gray-100 hover:bg-gray-200 focus:ring-gray-200 text-gray-700', 'text-gray-500']
    }
    case 'info': {
      return [
        'transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
        'text - blue - 500',
      ]
    }
    case 'danger': {
      return ['bg-red-500 hover:bg-red-400 focus:ring-red-400 text-white', 'text-red-500']
    }
    default: {
      return ['bg-button-muted border-textbox-field', 'text-textbox-field']
    }
  }
}

export default function ButtonBorder({
  label,
  onClick,
  type = 'primary',
  processing = false,
  disabled = false,
}: Props) {
  const [buttonStyle, svgStyle] = chooseColor(type)

  return (
    <>
      {!processing && (
        <button
          onClick={onClick}
          disabled={disabled}
          className={`px-10 py-2 text-left border-2
            text-textbox-field text-sm focus:ring-1 uppercase rounded-lg tracking-wider
            flex items-center justify-center focus:outline-none transition duration-150 ease-in-out ${buttonStyle}`}
        >
          {label}
        </button>
      )}
      {processing && (
        <span className={svgStyle}>
          <svg
            className='spinner_svg w-8 h-8'
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
