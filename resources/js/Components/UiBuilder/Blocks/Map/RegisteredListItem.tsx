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
      className={`flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-colors ${
        active 
          ? 'bg-[#125687] text-white shadow-sm' 
          : 'bg-white text-[#125687] hover:bg-gray-50'
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
