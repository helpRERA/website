import { usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { ReactLenis } from '@studio-freight/react-lenis'
import { showError, showSuccess } from '../../../ui/alerts'
import { Language, LaravelFlash } from '../../../ui/ui_interfaces'
import { FooterDataInterface } from '../../AdminPages/FooterEditor/FooterEditor'
import Navbar from '../../Common/Navbar/Navbar'
import Footer from '../../Home/Footer/Footer'
import MetaTags from '../../Common/MetaTags'
import AccessibilityWidget from '../../Common/AccessibilityWidget/AccessibilityWidget'
import SearchWidget from '../../Common/SearchWidget/SearchWidget'

interface Properties {
  children: React.ReactNode
}

const AppLayout = ({ children }: Properties) => {
  const { lang = 'en', footer } = usePage().props as unknown as {
    lang: Language
    footer: FooterDataInterface
  }

  const { flash } = usePage().props as unknown as { flash?: LaravelFlash }

  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (flash?.error != null) {
      showError(flash.error)
    }
    if (flash?.message != null) {
      showSuccess(flash.message)
    }
  }, [flash])

  // Keep Lenis in sync with the accessibility "Reduce motion" toggle.
  // AccessibilityWidget sets data-reduce-motion on <html> and persists it
  // to localStorage, so this also picks up the saved preference on load.
  useEffect(() => {
    const sync = () =>
      setReduceMotion(document.documentElement.getAttribute('data-reduce-motion') === 'true')

    sync()

    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-reduce-motion'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: !reduceMotion }}>
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
        <AccessibilityWidget />
         <SearchWidget />
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