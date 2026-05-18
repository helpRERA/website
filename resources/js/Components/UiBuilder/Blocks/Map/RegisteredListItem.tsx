import { TextData } from '../../../../DataStructures/ui_builder_interfaces'
import Localization from '../../../../ui/Localization'
import { Language } from '../../../../ui/ui_interfaces'

interface Properties {
  value?: string | number
  lang?: Language
  title: TextData
  link: string
}

const RegisteredListItem = ({ value, lang = 'en', title, link }: Properties) => {
  return (
    <div className='flex flex-row gap-3 hover:scale-110 hover:opacity-40 md:flex-col '>
      <a
        className=''
        href={`/${link}`}
        target='_blank'
        rel='noreferrer'
      >
        <h1 className='text-center text-3xl font-extrabold text-white'>{value ?? 0} </h1>
        <p className='self-end leading-normal text-white sm:text-base md:self-auto'>
          <Localization
            text={title}
            language={lang}
          />
        </p>
      </a>
    </div>
  )
}

export default RegisteredListItem
