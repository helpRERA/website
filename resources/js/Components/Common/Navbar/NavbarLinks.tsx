import { Link } from '@inertiajs/react'
import React, { useMemo } from 'react'
import { NavMenuRecords } from '../../../DataStructures/ui_builder_interfaces'
import InertiaLink from '../../../ui/Link/InertiaLink'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'

interface Properties {
  nav: NavMenuRecords[]
  section: string
  lang?: Language
}

const NavbarLinks = ({ nav, section, lang = 'en' }: Properties) => {
  const menuItems = useMemo(() => {
    const record = nav.find((menuItem) => menuItem.section === section)
    return record ? record.items : null
  }, [section, nav])

  return (
    <>
      {menuItems?.items.map((section) => {
        return (
          <div
            className='flex flex-col p-5'
            key={section.id.toString()}
          >
            <h5 className={'mb-2 break-words font-semibold text-gray-700'}>
              <Localization
                language={lang}
                text={section.section}
              />
            </h5>
            {section.links.map((item) => {
              return (
                <InertiaLink
                  className='break-words text-xs font-normal text-gray-600 hover:text-blue-500 md:text-sm'
                  link={item}
                  language={lang}
                  key={item.id.toString()}
                />
              )
            })}
          </div>
        )
      })}
      <div className='flex flex-col p-5'>
        <Link
          as='a'
          href={`/explore-projects?lang=${lang}`}
        >
          <img
            src='/explore.svg'
            alt='explore projects'
            className='h-auto w-1/2'
          />
        </Link>
      </div>
    </>
  )
}

export default NavbarLinks
