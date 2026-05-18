import React, { useCallback, useState } from 'react'
import OptionSolid from '../icons/OptionSolid';

interface Props {
  dropdowns: string[];
  onSelect: (action: string) => unknown;
}

const Option = ({ dropdowns, onSelect }: Props) => {

  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => {
    setOpen(open => !open)
  }, [])


  const selectDropdown = (option: string) => {
    setOpen(open => !open)
    onSelect(option)
  }

  return (
    <div className="relative">
      <button
        className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:bg-gray-200 flex justify-center
          w-24 rounded  text-sm font-medium leading-none text-gray-800  items-center
         cursor-pointer"
        onClick={toggle}
      >
        <OptionSolid />
      </button>
      {open &&
        <div className="flex flex-col absolute top-100  w-64 left-[-10rem] p-2 shadow rounded bg-gray-100 z-30">
          {
            dropdowns.map(dropdown => {
              return (
                <div
                  key={dropdown}
                  className="flex flex-wrap p-2 hover:bg-gray-200 text-sm cursor-pointer"
                  onClick={() => selectDropdown(dropdown)}
                >
                  {dropdown}
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default Option
