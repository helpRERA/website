import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
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
    <>
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
      <div className='min-h-screen w-full'>{children}</div>
      <Footer
        language={lang}
        blockData={footer}
      />
    </>
  )
}

export default AppLayout
