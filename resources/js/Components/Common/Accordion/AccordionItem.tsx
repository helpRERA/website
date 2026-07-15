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
      <div className={`rounded-md border border-gray-200 bg-white`}>
        <div
          className={`${
            open ? 'border-b border-gray-200' : ''
          } flex w-full cursor-pointer justify-between items-center px-5 py-4 transition-colors hover:bg-gray-50`}
          onClick={() => setOpen(!open)}
        >
          <div 
            className='flex items-center text-[15px] text-[#595959] font-normal'
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {title}
          </div>
          <ChevronDownIcon
            className={`${
              open ? 'rotate-180' : ''
            } h-5 w-5 shrink-0 text-black transition-transform duration-200 ease-linear`}
          />
        </div>
        {open && (
          <div className='flex flex-col gap-3 px-5 py-4 text-[13px] text-gray-500'>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default AccordionItem
