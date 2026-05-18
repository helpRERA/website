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
    <div className='text-skin-inverted relative z-[9999] w-full bg-gray-50 lg:hidden'>
      {showDropdown && (
        <>
          <div className='absolute top-full z-[9999] grid w-full grid-cols-2 bg-gray-50 shadow-md'>
            <form
              className='col-span-2 flex items-center justify-end gap-3 bg-white p-2'
              onSubmit={submitSearch}
            >
              <input
                type='text'
                name='search'
                placeholder='Search'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                autoComplete='off'
                className='h-11 w-full  rounded bg-neutral-200 px-4 py-1 text-gray-800 focus:outline-none'
              />
              <SearchButton />
            </form>
            <div className='flex flex-col bg-gray-300'>
              {navSections.map((section) => {
                const navRecord = nav.find((record) => record.section === section.value)
                return (
                  <div
                    onClick={() => {
                      // selectDropdown(section.value)
                      if (navRecord) {
                        selectDropdown(section.value)
                      } else {
                        router.get(section.url)
                      }
                    }}
                    onMouseOver={() => {
                      hoverDropdown(section.value)
                    }}
                    key={section.value}
                    className={
                      'text-skin-inverted flex  w-full items-center justify-between p-1 sm:p-2' +
                      ' break-words hover:cursor-pointer'
                    }
                  >
                    <Localization
                      text={localization[section.value]}
                      language={lang}
                    />
                    {selectedOption === section.value && (
                      <svg
                        className='ml-2 inline-block w-3'
                        fill='currentColor'
                        viewBox='0 0 12 12'
                      >
                        <path d='M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z'></path>
                      </svg>
                    )}
                  </div>
                )
              })}
            </div>
            <div className='flex flex-col gap-5'>
              {selectedOption != null && (
                <NavbarLinks
                  nav={nav}
                  section={selectedOption}
                  lang={lang}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MobileDropdown
