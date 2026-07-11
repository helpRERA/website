import { Link, router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { NavMenuRecords } from '../../../DataStructures/ui_builder_interfaces'
import { Language } from '../../../ui/ui_interfaces'
import DesktopDropdown from './DesktopDropdown'
import MobileDropdown from './MobileDropdown'
import SearchButton from '../../../ui/button/SearchButton'

/**
 *on mobile h-12
 on md: h-20 & h-14
 */
const Navbar = () => {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedOption, setSelectedOption] = useState('HOME')

  const nav = usePage().props.nav as NavMenuRecords[]
  const lang = usePage().props.lang as Language | undefined

  const toggleDropdown = (): void => {
    setShowDropdown((previous) => {
      return !previous
    })
  }

  const hoverDropdown = (option: string): void => {
    setSelectedOption(option)
  }

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.get(`/search?search=${search}&lang=${lang}`)
  }

  const selectDropdown = (option: string): void => {
    setShowDropdown(true)
    setSelectedOption(option)
  }

  const langToggle = () => {
    router.reload({
      data: {
        lang: lang == null || lang == 'en' ? 'mal' : 'en',
      },
    })
  }

  const url = usePage().url
  const isHome = url === '/' || url.startsWith('/?lang=')

  return (
    <>
      <nav className={`top-0 z-[9999] w-full px-4 py-4 md:px-8 lg:px-12 lg:py-6 font-urbanist ${isHome ? 'absolute bg-transparent' : 'sticky bg-[#0f2c59]'}`}>
        <div className='flex h-[80px] items-center justify-between rounded-lg bg-white px-6 shadow-md md:px-10 lg:px-12'>
          <div className='flex h-full items-center py-2'>
            <Link as='a' href='/' className='flex h-full items-center'>
              <img src={'/logov2.svg'} alt='K-RERA Logo' className='h-[50px] w-auto object-contain' />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className='flex items-center lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => toggleDropdown()}
              className='h-8 w-8 cursor-pointer text-gray-800'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {showDropdown ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h7' />
              )}
            </svg>
          </div>

            <div className='hidden items-center lg:flex'>
              <DesktopDropdown nav={nav} hoverDropdown={hoverDropdown} lang={lang as Language} />
              
              {/* Language Pill */}
            <div
              onClick={langToggle}
              className='ml-6 flex cursor-pointer items-center overflow-hidden rounded-full border border-gray-200 bg-white p-1 shadow-sm md:ml-8 lg:ml-10'
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  lang == null || lang == 'en' ? 'bg-[#0f2c59] text-white' : 'bg-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                E
              </div>
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  lang == 'mal' ? 'bg-[#0f2c59] text-white' : 'bg-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                മ
              </div>
            </div>
            </div>
          </div>

        {/** Mobile Dropdown */}
        <MobileDropdown
          nav={nav}
          search={search}
          setSearch={setSearch}
          showDropdown={showDropdown}
          selectDropdown={selectDropdown}
          submitSearch={submitSearch}
          hoverDropdown={hoverDropdown}
          selectedOption={selectedOption}
          lang={lang}
        />
      </nav>
    </>
  )
}

export default Navbar
