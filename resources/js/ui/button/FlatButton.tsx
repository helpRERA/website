import React from 'react'
import { ClickHandler } from '../ui_interfaces'
import Spinner from '../Spinner'
import { chooseColor } from './Button'
;('../Spinner')

interface Properties {
  label: string
  onClick?: ClickHandler
  theme?: string
  processing?: boolean
  disabled?: boolean
  type?: 'reset' | 'submit' | 'button'
}

const FlatButton = ({
  label,
  onClick,
  theme = 'primary',
  processing = false,
  disabled = false,
  type = 'submit',
}: Properties) => {
  const [buttonStyle, svgStyle] = chooseColor(theme)

  return (
    <>
      {!processing && (
        <button
          type={type}
          className={`${buttonStyle} transition ease-in duration-300 text-lg
           py-3 rounded w-full`}
          onClick={onClick}
          disabled={disabled}
        >
          {label}
        </button>
      )}
      {processing && <Spinner svgStyle={svgStyle} />}
    </>
  )
}

export default FlatButton
