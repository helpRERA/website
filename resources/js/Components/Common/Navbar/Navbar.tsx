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

  return (
    <>
      <nav className='top-0 z-[9999] w-full bg-white shadow-lg lg:sticky lg:top-auto lg:shadow-none'>
        {/**Header Logo bar*/}
        <div className='flex flex-wrap justify-between px-2 py-2 lg:py-3'>
          <div className='flex w-6/12 items-center pr-6 sm:w-4/12 md:w-3/12 lg:w-2/12 xl:w-2/12'>
            <Link
              as='a'
              href='/'
            >
              <img
                src={'/imge/logo.png'}
                alt='logo'
                className='m-auto w-80 self-center'
              />
            </Link>
          </div>
          <div className='text-skin-inverted flex w-2/12 flex-col  justify-start border-l-2 px-2 lg:w-3/12'>
            {lang == null ||
              (lang == 'en' && (
                <img
                  src='/lang-eng.svg'
                  alt=''
                  className='h-12 w-16 cursor-pointer md:w-20'
                  onClick={langToggle}
                />
              ))}
            {lang == 'mal' && (
              <img
                src='/lang-mal.svg'
                alt=''
                className='h-12 w-16 cursor-pointer md:w-20'
                onClick={langToggle}
              />
            )}
            <div className='hidden flex-col lg:flex'>
              <span className='text-[0.5rem]'>A STATUTORY AUTHORITY ESTABLISHED</span>
              <span className='text-[0.5rem]'>BY GOVERNMENT OF KERALA</span>
            </div>
          </div>
          <form
            onSubmit={submitSearch}
            className='flex w-2/12 items-center  justify-end gap-x-1 lg:w-5/12 xl:w-5/12'
          >
            {showDropdown && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                onClick={() => toggleDropdown()}
                className='text-skin-base h-8 w-8 cursor-pointer lg:hidden'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            )}
            {!showDropdown && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                onClick={() => toggleDropdown()}
                className='text-skin-base h-8 w-8 cursor-pointer lg:hidden'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h7'
                />
              </svg>
            )}

            <input
              type='text'
              name='search'
              placeholder='Search'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              autoComplete='off'
              className=' hidden h-12 shrink rounded bg-neutral-200   px-4 py-1 text-gray-800 transition-[width]
                                duration-[1000] ease-in focus:w-full focus:outline-none sm:w-2/3 lg:block xl:w-1/3 xl:focus:w-2/3'
            />
            <div className='hidden gap-2 lg:flex'>
              <SearchButton />
            </div>
          </form>
        </div>
        <div className='flex flex-col px-2 lg:hidden'>
          <span className='text-[0.5rem]'>
            A STATUTORY AUTHORITY ESTABLISHED BY GOVERNMENT OF KERALA
          </span>
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
      {/**Desktop dropdown*/}
      <DesktopDropdown
        nav={nav}
        hoverDropdown={hoverDropdown}
        lang={lang as Language}
      />
    </>
  )
}

export default Navbar
