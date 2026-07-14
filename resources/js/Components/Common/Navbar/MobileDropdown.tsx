import { router } from '@inertiajs/react'
import { NavMenuRecords } from '../../../DataStructures/ui_builder_interfaces'
import { localization } from '../../../Localization/localization'
import Localization from '../../../ui/Localization'
import SearchButton from '../../../ui/button/SearchButton'
import { Language } from '../../../ui/ui_interfaces'
import { navSections } from '../../AdminPages/NavEditor/NavEditor'
import DisplayBlockLink from '../../UiBuilder/DisplayBlockLink'
import NavbarLinks from './NavbarLinks'

interface Properties {
  nav: NavMenuRecords[]
  hoverDropdown: (section: string) => void
  showDropdown: boolean
  search: string
  setSearch: (value: string) => void
  selectDropdown: (section: string) => void
  selectedOption: string
  submitSearch: (event: React.FormEvent<HTMLFormElement>) => void
  lang?: Language
}

const MobileDropdown = ({
  nav,
  hoverDropdown,
  showDropdown,
  search,
  setSearch,
  submitSearch,
  selectDropdown,
  selectedOption,
  lang = 'en',
}: Properties) => {
  return (
    <div className='relative z-[9999] w-full text-skin-inverted'>
      {showDropdown && (
        <div 
          className='absolute left-0 top-[100%] z-[9999] flex w-full flex-col bg-white shadow-2xl md:flex-row border-t border-gray-100 rounded-b-lg overflow-hidden'
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          
          {/* Mobile Search Bar */}
          <div className='border-b border-gray-100 bg-white p-4 md:hidden shrink-0'>
            <form onSubmit={submitSearch} className='relative w-full'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                <svg className='h-4 w-4 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
              </div>
              <input 
                type='text' 
                name='search'
                placeholder='Search...'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                autoComplete='off' 
                className='h-11 w-full rounded-full border border-gray-200 bg-[#f8faff] pl-11 pr-4 text-[14px] text-gray-700 transition-all placeholder:text-gray-400 focus:border-[#105d8c] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#105d8c]' 
              />
              <button type="submit" className="hidden"></button>
            </form>
          </div>

          {/* Left Column (Sections List) */}
          <div className='flex min-h-0 w-full flex-col bg-[#f8faff] md:w-[320px] md:border-r md:border-gray-100 lg:w-[380px] overflow-y-auto overscroll-contain' data-lenis-prevent='true'>
            {/* Desktop Search Bar */}
            <div className='hidden border-b border-gray-100 p-6 md:block bg-[#f8faff] shrink-0'>
              <form onSubmit={submitSearch} className='relative w-full'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                  <svg className='h-4 w-4 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                </div>
                <input 
                  type='text' 
                  name='search'
                  placeholder='Search...'
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  autoComplete='off'
                  className='h-11 w-full rounded-full border border-gray-200 bg-white pl-11 pr-4 text-[14px] text-gray-700 shadow-sm transition-all placeholder:text-gray-400 focus:border-[#105d8c] focus:outline-none focus:ring-1 focus:ring-[#105d8c]' 
                />
                <button type="submit" className="hidden"></button>
              </form>
            </div>

            <div className='flex flex-col py-2'>
              {navSections.map((section) => {
                const navRecord = nav.find((record) => record.section === section.value)
                const isSelected = selectedOption === section.value

                return (
                  <div key={section.value} className='flex flex-col border-b border-gray-100/50 last:border-0 shrink-0'>
                    <div
                      onClick={() => {
                        if (navRecord) selectDropdown(section.value)
                        else router.get(section.url)
                      }}
                      onMouseOver={() => {
                        if (window.innerWidth >= 768 && navRecord) hoverDropdown(section.value)
                      }}
                      className={`group flex w-full cursor-pointer items-center justify-between px-6 py-4 transition-all duration-200 ${
                        isSelected ? 'bg-white shadow-[inset_4px_0_0_0_#105d8c]' : 'hover:bg-white hover:shadow-[inset_4px_0_0_0_#e5e7eb]'
                      }`}
                    >
                      <span className={`text-[15px] font-medium transition-colors ${isSelected ? 'text-[#105d8c]' : 'text-[#5a5a5a] group-hover:text-[#105d8c]'}`}>
                        <Localization text={localization[section.value]} language={lang} />
                      </span>
                      {navRecord && (
                        <svg 
                          className={`h-4 w-4 transition-transform duration-300 ${isSelected ? 'rotate-90 text-[#105d8c] md:rotate-0' : 'text-gray-400 group-hover:text-[#105d8c]'}`} 
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>

                    {/* Mobile Accordion Content (Only visible on mobile when selected) */}
                    {isSelected && navRecord && (
                      <div className='block bg-white md:hidden border-t border-gray-50'>
                        <NavbarLinks nav={nav} section={selectedOption} lang={lang} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column (Desktop Submenu Display) */}
          <div className='hidden min-h-0 flex-1 bg-white md:block overflow-y-auto overscroll-contain' data-lenis-prevent='true'>
            {selectedOption ? (
              <NavbarLinks nav={nav} section={selectedOption} lang={lang} />
            ) : (
              <div className='flex h-full min-h-[450px] flex-col items-center justify-center text-gray-400 opacity-60'>
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <p className='text-lg font-medium'>Select an option from the menu</p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  )
}

export default MobileDropdown
