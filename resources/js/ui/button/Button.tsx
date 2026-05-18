import React from 'react'
import { ClickHandler } from '../ui_interfaces'
import Spinner from '../Spinner'

interface Properties {
  label: string
  onClick?: ClickHandler
  type?: string
  processing?: boolean
  disabled?: boolean
  buttonType?: 'reset' | 'submit' | 'button'
  image?: string
}

export const chooseColor = (type: string): [string, string] => {
  switch (type) {
    case 'secondary': {
      return ['bg-gray-100 hover:bg-gray-200 focus:ring-gray-200 text-gray-700', 'text-gray-500']
    }

    case 'tertiary': {
      return [
        'bg-primary-100 border border-primary-200 hover:bg-primary-200 focus:ring-gray-200 text-gray-700',
        'text-gray-500',
      ]
    }
    case 'disabled': {
      return ['bg-gray-300 cursor-not-allowed focus:ring-gray-200 text-gray-700', 'text-gray-500']
    }
    case 'info': {
      return [
        'bg-indigo-500 hover:bg-indigo-400 focus:ring-indigo-400 text-white',
        'text-gray-indigo-500',
      ]
    }
    case 'danger': {
      return ['bg-red-500 hover:bg-red-400 focus:ring-red-400 text-white', 'text-red-500']
    }
    case 'border': {
      return [
        'bg-transparent border border-2 border-primary-700 text-accent-dark hover:bg-primary-200',
        'text-accent-dark',
      ]
    }
    default: {
      return [
        'bg-primary-700 text-white border border-2 border-primary-700 hover:bg-primary-600 focus:ring-1',
        'text-primary-700 ',
      ]
    }
  }
}

export default function Button({
  label,
  onClick,
  type = 'primary',
  processing = false,
  disabled = false,
  buttonType = 'submit',
  image,
}: Properties) {
  const [buttonStyle, svgStyle] = chooseColor(type)

  return (
    <>
      {!processing && (
        <button
          onClick={onClick}
          disabled={disabled}
          className={`flex items-center justify-center
            rounded-lg px-10 py-2 text-left text-sm
            uppercase tracking-wider transition duration-150
            ease-in-out focus:outline-none focus:ring-4 ${buttonStyle}`}
          type={buttonType}
        >
          {image && (
            <img
              src={image}
              alt='button icon'
              className='mr-2'
            />
          )}
          {label}
        </button>
      )}
      {processing && <Spinner svgStyle={svgStyle} />}
    </>
  )
}
