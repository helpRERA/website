import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { ReactLenis } from '@studio-freight/react-lenis'
import { showError, showSuccess } from '../../../ui/alerts'
import { Language, LaravelFlash } from '../../../ui/ui_interfaces'
import { FooterDataInterface } from '../../AdminPages/FooterEditor/FooterEditor'
import Navbar from '../../Common/Navbar/Navbar'
import Footer from '../../Home/Footer/Footer'
import MetaTags from '../../Common/MetaTags'

interface Properties {
  children: React.ReactNode
}

const AppLayout = ({ children }: Properties) => {
  const { lang = 'en', footer } = usePage().props as unknown as {
    lang: Language
    footer: FooterDataInterface
  }

  const { flash } = usePage().props as unknown as { flash?: LaravelFlash }

  useEffect(() => {
    if (flash?.error != null) {
      showError(flash.error)
    }
    if (flash?.message != null) {
      showSuccess(flash.message)
    }
  }, [flash])

  return (
    <ReactLenis root>
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
      <MetaTags />
      <Navbar />

      {/* Floating Action Buttons */}
      <div className='fixed right-0 top-1/3 z-[9999] flex flex-col gap-2'>
        <button className='flex h-12 w-12 items-center justify-center rounded-l-md bg-[#0f2c59] text-white shadow-lg transition hover:bg-[#0b1e3b]'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 14l-4-4 4-4' />
          </svg>
        </button>
        <button className='flex h-12 w-12 items-center justify-center rounded-l-md bg-[#0f2c59] text-white shadow-lg transition hover:bg-[#0b1e3b]'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
        </button>
      </div>

      <div className='min-h-screen w-full'>{children}</div>
      <Footer
        language={lang}
        blockData={footer}
      />
    </ReactLenis>
  )
}

export default AppLayout
