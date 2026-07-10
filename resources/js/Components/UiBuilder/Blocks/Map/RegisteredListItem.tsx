import { TextData } from '../../../../DataStructures/ui_builder_interfaces'
import Localization from '../../../../ui/Localization'
import { Language } from '../../../../ui/ui_interfaces'

interface Properties {
  value?: string | number
  lang?: Language
  title: TextData
  link: string
  active?: boolean
}

const RegisteredListItem = ({ value, lang = 'en', title, link, active = false }: Properties) => {
  return (
    <a
      href={`/${link}`}
      className={`flex items-center justify-center rounded-full px-6 py-2.5 transition-colors ${
        active 
          ? 'bg-[#0f2c59] text-white' 
          : 'bg-transparent text-[#0f2c59] hover:bg-gray-100'
      }`}
    >
      <span className='text-sm font-semibold'>
        <Localization
          text={title}
          language={lang}
        />
      </span>
    </a>
  )
}

export default RegisteredListItem
