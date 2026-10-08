import { Link, usePage } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import { NavMenuRecords } from '../../../DataStructures/ui_builder_interfaces'
import { localization } from '../../../Localization/localization'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import { navSections } from '../../AdminPages/NavEditor/NavEditor'
import NavbarLinks from './NavbarLinks'

interface Properties {
  nav: NavMenuRecords[]
  lang?: Language
}

const DesktopDropdown = ({ nav, lang = 'en' }: Properties) => {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [fitsHeader, setFitsHeader] = useState(false)
  const url = usePage().url

  useEffect(() => {
    const menu = menuRef.current
    const container = menu?.parentElement
    if (!menu || !container) return

    // Keep enlarged labels intact; use the hamburger when they no longer fit.
    const updateFit = () => {
      const fits = menu.getBoundingClientRect().width <= container.clientWidth
      setFitsHeader(fits)
      if (!fits) setOpenSection(null)
    }
    const observer = new ResizeObserver(updateFit)
    observer.observe(menu)
    observer.observe(container)
    updateFit()
    return () => observer.disconnect()
  }, [])

  useEffect(() => { setOpenSection(null) }, [url])

  useEffect(() => {
    if (!openSection) return
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpenSection(null)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        menuRef.current?.querySelector<HTMLButtonElement>('button[aria-expanded="true"]')?.focus()
        setOpenSection(null)
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [openSection])

  return (
    <div ref={menuRef} className={`flex w-max shrink-0 items-center text-gray-700 ${fitsHeader ? '' : 'invisible pointer-events-none'}`}>
      <Link as='a' href='/' className='nav-item hidden px-4 lg:px-5 text-[#0f2c59] hover:text-[#0b1e3b] md:inline-flex h-[80px] flex-col items-center justify-center'>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mb-1' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M11.47 3.84a.75.75 0 011.06 0l8.99 9a.75.75 0 11-1.06 1.06l-1.21-1.22v6.57a2.25 2.25 0 01-2.25 2.25h-3a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75h-3a2.25 2.25 0 01-2.25-2.25v-6.57l-1.21 1.22a.75.75 0 11-1.06-1.06l8.99-9z' />
        </svg>
        <div className='h-[3px] w-6 bg-[#0f2c59] rounded-full'></div>
      </Link>
      {navSections
        .filter((navSection) => !['ABOUT K-RERA', 'CONTACT US'].includes(navSection.value))
        .map((navSection) => {
          const navRecord = nav.find((record) => record.section === navSection.value)

          return (
            <div
              className='nav-item hidden shrink-0 whitespace-nowrap px-2 2xl:px-4 text-center text-sm leading-relaxed font-medium transition-colors hover:text-[#0f2c59] hover:bg-gray-50 md:inline-flex md:items-center md:justify-center h-[80px] cursor-pointer'
              key={navSection.value}
            >
              {navRecord && navRecord.items ? (
                <button
                  type='button'
                  aria-label={`Toggle ${navSection.value} menu`}
                  aria-expanded={openSection === navSection.value}
                  aria-controls={`header-menu-${navSection.value.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setOpenSection((previous) => previous === navSection.value ? null : navSection.value)}
                  className='flex h-full w-full min-w-0 items-center justify-center gap-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#085484]'
                >
                  <span className='whitespace-nowrap'>
                    <Localization text={localization[navSection.value]} language={lang} />
                  </span>
                  <svg className='h-4 w-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M19 9l-7 7-7-7' />
                  </svg>
                </button>
              ) : (
                <Link
                  as='a'
                  className='whitespace-nowrap'
                  href={navSection.url}
                >
                  <Localization text={localization[navSection.value]} language={lang} />
                </Link>
              )}
              {navRecord && navRecord.items && openSection === navSection.value && (
                <div id={`header-menu-${navSection.value.replace(/\s+/g, '-').toLowerCase()}`} className='absolute left-1/2 top-full z-[9999] w-[950px] max-w-[calc(100%-2rem)] -translate-x-1/2 pt-1 text-left'>
                  <div className='max-h-[calc(100dvh-140px)] overflow-y-auto overscroll-contain rounded-xl border border-gray-100 shadow-xl' data-lenis-prevent='true'>
                    <NavbarLinks
                      nav={nav}
                      section={navSection.value}
                      lang={lang}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default DesktopDropdown
