import { Link } from '@inertiajs/react'
import { NavMenuRecords } from '../../../DataStructures/ui_builder_interfaces'
import { localization } from '../../../Localization/localization'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import { navSections } from '../../AdminPages/NavEditor/NavEditor'
import NavbarLinks from './NavbarLinks'

interface Properties {
  nav: NavMenuRecords[]
  hoverDropdown: (section: string) => void
  lang?: Language
}

console.log(navSections)
const DesktopDropdown = ({ nav, hoverDropdown, lang = 'en' }: Properties) => {
  return (
    <div className='hidden w-full items-center text-gray-700 lg:flex'>
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
              onMouseOver={() => {
                hoverDropdown(navSection.value)
              }}
              className={`nav-item hidden ${navSection.value === 'APPELLATE TRIBUNAL' ? 'shrink-0 whitespace-nowrap' : 'min-w-0 flex-1 whitespace-normal'} px-2 2xl:px-4 text-center text-sm leading-relaxed font-medium transition-colors hover:text-[#0f2c59] hover:bg-gray-50 md:inline-flex md:items-center md:justify-center h-[80px] cursor-pointer`}
              key={navSection.value}
            >
              <Link
                as='a'
                className={navSection.value === 'APPELLATE TRIBUNAL' ? 'whitespace-nowrap' : 'min-w-0 max-w-full [overflow-wrap:anywhere]'}
                href={`${navSection.url}`}
              >
                <Localization text={localization[navSection.value]} language={lang} />
              </Link>
              {navRecord && navRecord.items && (
                <div className='nav-list absolute left-1/2 top-full z-[9999] w-[950px] max-w-[calc(100%-2rem)] -translate-x-1/2 pt-1 text-left'>
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
