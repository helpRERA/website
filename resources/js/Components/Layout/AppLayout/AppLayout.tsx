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
        <button className='flex h-12 w-12 items-center justify-center rounded-l-md bg-[#0f2c59] shadow-lg transition hover:bg-[#0b1e3b] p-2.5'>
          <img src="/svg/access.svg" alt="Accessibility" className="w-full h-full object-contain" />
        </button>
        <button className='flex h-12 w-12 items-center justify-center rounded-l-md bg-[#0f2c59] shadow-lg transition hover:bg-[#0b1e3b] p-2.5'>
          <img src="/svg/search.svg" alt="Search" className="w-full h-full object-contain" />
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
