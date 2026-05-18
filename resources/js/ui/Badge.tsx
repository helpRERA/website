import React from 'react'
import CloseSolid from './icons/CloseSolid'

interface Props {
  label: string;
  closeClick?: () => void;
}

const Badge = ({label, closeClick}: Props) => {
  return (
    <div className="flex justify-center items-center border border-textbox-field text-textbox-field rounded-lg p-2 gap-3 text-sm">
      {label}
      {closeClick &&
        <div
          onClick={closeClick}
          className="cursor-pointer hover:text-red-600 hover:bg-gray-200"
        >
          <CloseSolid />
        </div>
      }
    </div>
  )
}

export default Badge
