import { Link } from '@inertiajs/react'
import React, { useMemo } from 'react'
import { NavMenuRecords } from '../../../DataStructures/ui_builder_interfaces'
import InertiaLink from '../../../ui/Link/InertiaLink'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import { Building, AlertCircle, Users, LayoutList } from 'lucide-react'

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
    <div className='flex flex-col md:flex-row w-full md:min-h-[450px] mx-auto overflow-hidden whitespace-normal'>
      {/* Left pane - links */}
      <div className='flex-1 bg-[#F5F6FF] p-5 md:p-10 flex flex-col gap-5 md:gap-7'>
        {menuItems?.items.map((section) => {
          // Determine icon based on section title
          let Icon = LayoutList
          const titleEn = section.section?.english?.toLowerCase() || ''
          if (titleEn.includes('project')) Icon = Building
          else if (titleEn.includes('complaint')) Icon = AlertCircle
          else if (titleEn.includes('agent')) Icon = Users

          return (
            <div key={section.id.toString()} className='flex flex-col'>
              <h5 className='mb-3 flex items-center gap-2 text-[15px] font-medium text-[#105d8c]'>
                <Icon size={18} className='text-[#105d8c]' fill="currentColor" strokeWidth={1} />
                <Localization language={lang} text={section.section} />
              </h5>
              <div className='flex flex-wrap gap-2'>
                {section.links.map((item) => (
                  <div key={item.id.toString()} className='flex items-center rounded bg-[#FFFFFF] border border-transparent px-3.5 py-2 transition hover:border-[#DDDDDD] hover:shadow-sm'>
                    <InertiaLink
                      className='text-[15px] font-normal text-[#5A5A5A] hover:text-[#105d8c]'
                      link={item}
                      language={lang}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Right pane - Explore Projects */}
      <div className='relative hidden md:flex w-[270px] shrink-0 flex-col items-center bg-[#0d5985] text-center overflow-hidden'>
        <div className='relative z-10 flex w-full flex-col items-center pt-10 px-8'>
          <h3 className='mb-2 text-[18px] font-medium text-white'>Find Your Project</h3>
          <p className='mb-6 text-[12.5px] leading-[1.6] text-blue-100 max-w-[200px]'>
            Click Here for a reliable and comprehensive real estate search for Kerala.
          </p>
          <Link
            as='a'
            href={`/explore-projects?lang=${lang}`}
            className='rounded bg-white px-6 py-2 text-[13px] font-medium text-[#0d5985] transition hover:bg-gray-50'
          >
            Explore Projects
          </Link>
        </div>
        <div className='absolute bottom-0 left-0 w-full h-[50%]'>
          <img
            src='/imge/megamenu_building.png'
            alt='Explore'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default NavbarLinks
