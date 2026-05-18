import { Link } from '@inertiajs/react'
import { TextData } from '../../DataStructures/ui_builder_interfaces'
import Localization from '../../ui/Localization'
import { Language } from '../../ui/ui_interfaces'

interface Properties {
  title: TextData
  description: TextData
  link: string
  lang: Language
}

const GlobalSearchResultCard = ({ title, description, link, lang = 'en' }: Properties) => {
  return (
    <div className='flex flex-col gap-1 bg-neutral-500 p-2'>
      <h1 className='text-lg'>
        <Localization
          text={title}
          language={lang}
        />
      </h1>
      <p>
        <Localization
          text={description}
          language={lang}
        />
      </p>
      <Link
        as='a'
        className='text-sm text-blue-500 underline hover:text-blue-600'
        href={link}
      >
        Show More..
      </Link>
    </div>
  )
}

export default GlobalSearchResultCard
