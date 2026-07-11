import { Link } from '@inertiajs/react'
import { Language } from '../../../ui/ui_interfaces'
import {
  ClipboardDocumentListIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  BookmarkSquareIcon,
} from '@heroicons/react/24/solid'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

import { Block, BlockImage, ItemListField, LinkData, TextData } from '../../../DataStructures/ui_builder_interfaces'
import { BlockConfiguration } from '../DefaultBlockData'

export interface ImageActionCard {
  id?: number
  image: BlockImage
  title: TextData
  link: LinkData
}

export interface AltActionCarouselBlock extends Block, BlockConfiguration {
  title: TextData
  description: TextData
  actions: ItemListField<ImageActionCard>
}

export const defaultImageActionBlock = {
  description: { english: 'Placeholder Title', malayalam: '' },
  title: { english: 'Lorem Ipsum', malayalam: '' },
  actions: {
    lastUUID: 0,
    items: [],
  },
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: any
  blockData?: any
  language?: Language
  dispatch?: any
}

const AltActionCarousel = ({ editMode, language, blockData, onFieldEdit, dispatch }: Properties) => {
  const SmallCard = ({ title, desc, icon, href }: { title: string, desc: string, icon: React.ReactNode, href: string }) => (
    <Link href={href} className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#86C9F4] group">
      <div className="mb-5 flex h-10 w-10 items-center justify-center text-[#095b8d]">
        {icon}
      </div>
      <h3 className="mb-3 text-[19px] font-semibold leading-snug text-gray-900">{title}</h3>
      <p className="mb-6 flex-grow text-[14px] leading-relaxed text-gray-500">{desc}</p>
      <div className="mt-auto flex items-center">
        <div className="text-[#095b8d] transition-colors group-hover:text-blue-800 group-hover:translate-x-1 duration-300">
          <ArrowRightIcon className="h-5 w-5" />
        </div>
      </div>
    </Link>
  )

  return (
    <div className="w-full bg-[#f4f9fd] pt-8 md:pt-10 pb-16 md:pb-24 font-sans">
      <div className="cmpad">
        <div className="flex flex-col items-center justify-center text-center w-full mb-8 px-4">
          {/* Subheading */}
          <div className='flex items-center justify-center gap-3 mb-2 lg:mb-4'>
            <span className='text-gray-400 font-medium text-sm'>||</span>
            <span className='text-[11px] font-semibold tracking-[0.2em] text-gray-500 uppercase'>
              Latest Updates
            </span>
          </div>

          {/* Heading */}
          <h2 className='tracking-tight font-urbanist flex flex-wrap justify-center gap-x-2'>
            <span className='text-[#085484] font-semibold text-[32px] sm:text-[45px] leading-[1.2]'>References &amp;</span>
            <span className='text-[#444444] font-normal text-[32px] sm:text-[45px] leading-[1.2]'>Resources</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SmallCard
            title="Annual Report"
            desc="View Kerala RERA annual reports and official updates."
            icon={<ClipboardDocumentListIcon className="h-8 w-8" />}
            href="/annual-report"
          />
          <SmallCard
            title="Downloads"
            desc="Download forms, reports, and official documents."
            icon={<ArrowDownTrayIcon className="h-8 w-8" />}
            href="/downloads"
          />
          <SmallCard
            title="Newsletters"
            desc="Latest Kerala RERA news and updates."
            icon={<DocumentTextIcon className="h-8 w-8" />}
            href="/newsletter"
          />
          <SmallCard
            title="Manuals & Guidelines"
            desc="Access official manuals, guidelines, and user resources."
            icon={<BookmarkSquareIcon className="h-8 w-8" />}
            href="/manuals-"
          />
        </div>
      </div>
    </div>
  )
}

export default AltActionCarousel
