import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

interface Properties {
  children: React.ReactNode
  title: string
}

const AccordionItem = ({ title, children }: Properties) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className={`rounded-2xl border-2 p-2 shadow-md `}>
        <div
          className={`${
            open ? 'border-b-2' : ''
          } flex w-full justify-between text-sm font-medium text-overview_text `}
          onClick={() => setOpen(!open)}
        >
          <div className='flex flex-col gap-2 px-4 py-1 md:flex-row md:gap-10'>
            <span className='text-xs uppercase md:text-sm'>
              <b>{title}</b>
            </span>
          </div>
          <ChevronDownIcon
            className={`${
              open
                ? 'rotate-180 bg-gray-100 transition-transform duration-200 ease-linear'
                : 'transition-transform duration-200 ease-linear hover:bg-gray-100 '
            } ml-auto h-5 w-5 self-center rounded-lg text-overview_text `}
          />
        </div>
        {open && (
          <div className='flex flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500'>{children}</div>
        )}
      </div>
    </div>
  )
}

export default AccordionItem
