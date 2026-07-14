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
      {navSections.map((navSection, index) => {
        const navRecord = nav.find((record) => record.section === navSection.value)
        
        // Dynamic positioning to prevent screen overflow
        let positionClass = 'left-1/2 -translate-x-1/2'
        if (index <= 1) positionClass = 'left-0'
        if (index >= navSections.length - 2) positionClass = 'right-0'

        return (
          <div
            onMouseOver={() => {
              hoverDropdown(navSection.value)
            }}
            className={`nav-item relative hidden whitespace-nowrap px-4 lg:px-5 text-sm font-medium transition-colors
                         ${
                           navSection.value === 'STATISTICS'
                             ? 'text-[#0f2c59] hover:bg-gray-100'
                             : 'hover:text-[#0f2c59] hover:bg-gray-50'
                         } md:inline-flex md:items-center h-[80px] cursor-pointer`}
            key={navSection.value}
          >
            <Link
              as='a'
              href={`${navSection.url}`}
            >
              <Localization text={localization[navSection.value]} language={lang} />
            </Link>
            {navRecord && navRecord.items && (
              <div className={`nav-list absolute ${positionClass} top-[80px] z-[9999] w-max max-w-[950px] pt-1`}>
                <div className='overflow-hidden rounded-xl border border-gray-100 shadow-xl'>
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
