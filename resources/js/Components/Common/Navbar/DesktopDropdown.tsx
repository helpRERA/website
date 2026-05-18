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
    <div className='sticky top-0 z-[9999] hidden w-full items-center bg-primary-700 text-gray-200 shadow-lg lg:flex'>
      <Link
        as='a'
        href='/'
        className='nav-item hidden px-4 hover:cursor-pointer md:inline-block'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
          />
        </svg>
      </Link>
      {navSections.map((navSection) => {
        const navRecord = nav.find((record) => record.section === navSection.value)
        return (
          <div
            onMouseOver={() => {
              hoverDropdown(navSection.value)
            }}
            className={`nav-item break-word hidden p-2 px-4 py-3 text-sm font-medium
                         ${
                           navSection.value === 'STATISTICS'
                             ? 'bg-[#b5e48c] bg-opacity-60 hover:bg-opacity-80'
                             : 'hover:bg-primary-600'
                         } md:inline-block`}
            key={navSection.value}
          >
            <Link
              as='a'
              href={`${navSection.url}`}
            >
              <Localization
                text={localization[navSection.value]}
                language={lang}
              />
            </Link>
            {navRecord && navRecord.items && (
              <div className='nav-list absolute left-0 top-full z-[9999] w-full flex-wrap bg-gray-200 shadow-md'>
                <div className='grid w-full grid-cols-1 gap-3 break-words pb-5 md:grid-cols-4'>
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
