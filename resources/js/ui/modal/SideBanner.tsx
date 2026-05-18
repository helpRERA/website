import { XMarkIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Button from '../button/Button'

interface Properties {
  shown: boolean
  children: React.ReactNode
  setShow: (value: boolean) => void
  actionText?: string
  onAction?: () => unknown
}

const SideBanner = ({ children, setShow, shown, onAction, actionText }: Properties) => {
  const modalReference = React.useRef<HTMLDivElement>(null)

  // useClick(modalReference, () => setShow(false))

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          className='modal'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className='flex h-full w-4/5 flex-col gap-3 gap-y-6  bg-white p-2 sm:w-3/4 md:w-1/2 lg:w-2/5 '
            ref={modalReference}
          >
            <div className='mt-2 flex w-full  items-center justify-end'>
              <button
                className='rounded-md p-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800'
                onClick={() => setShow(false)}
              >
                <XMarkIcon className='h-6 w-6' />
              </button>
            </div>
            <div className='w-full flex-shrink overflow-auto'>{children}</div>
            {onAction != null && actionText != null && (
              <div className='flex w-full flex-col'>
                <Button
                  label={actionText}
                  onClick={onAction}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SideBanner
