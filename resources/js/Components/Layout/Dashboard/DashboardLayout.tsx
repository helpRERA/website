import React, { useCallback, useEffect, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import ApplicationLogo from '../../Common/ApplicationLogo'
import BarsTwoOutline from '../../../ui/icons/BarsTwoOutline'
import DashboardSidebar from './DashboardSidebar'
import { ToastContainer } from 'react-toastify'
import { showError, showSuccess } from '../../../ui/alerts'
import { LaravelFlash } from '../../../ui/ui_interfaces'
import { motion } from 'framer-motion'

interface Properties {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Properties) => {
  const [showSidebar, setShowSidebar] = useState(false)

  const { flash } = usePage().props as unknown as { flash?: LaravelFlash }

  const toggle = useCallback(() => {
    setShowSidebar((old) => !old)
  }, [])

  const logout = () => {
    console.log(showSidebar)
  }

  useEffect(() => {
    if (flash?.error != null) {
      showError(flash.error)
    }
    if (flash?.message != null) {
      showSuccess(flash.message)
    }
  }, [flash])

  return (
    <div className='min-h-screen bg-gray-100'>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <nav
        className='fixed inset-0 z-50 flex h-20 items-center justify-between
        bg-primary-700 px-2 shadow lg:px-10'
      >
        <Link href='/'>
          <ApplicationLogo className='block h-9 w-auto fill-current text-gray-800' />
        </Link>
        <div
          className='cursor-pointer rounded p-2 text-white transition duration-300 hover:bg-gray-400 hover:text-primary-700'
          onClick={toggle}
        >
          <BarsTwoOutline />
        </div>
      </nav>
      <DashboardSidebar
        showSideBar={showSidebar}
        setShowSideBar={setShowSidebar}
        logout={logout}
      />
      <div
        className={`w-full pt-20 transition-[padding] duration-300 ${
          showSidebar ? 'lg:pl-72' : 'pl-0'
        }`}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 100 }}
          transition={{ duration: 0.3 }}
        >
          <main className='w-full pb-10'>{children}</main>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardLayout
