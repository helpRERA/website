import { LinkData } from '../../DataStructures/ui_builder_interfaces'
import InertiaLink from '../Link/InertiaLink'
import { Language } from '../ui_interfaces'
import { chooseColor } from './Button'

interface Properties {
  lang?: Language
  link?: LinkData
  type?: string
}

const LinkButton = ({ link, type = 'primary', lang }: Properties) => {
  const buttonStyle = chooseColor(type)

  return (
    <InertiaLink
      className={`flex items-center justify-center
        rounded-lg px-10 py-2 text-left text-sm
        uppercase tracking-wider transition duration-150
        ease-in-out focus:outline-none focus:ring-4 ${buttonStyle}`}
      language={lang}
      link={link}
    />
  )
}

export default LinkButton
