import { Link, usePage } from '@inertiajs/react'
import { useMemo } from 'react'
import { LinkData } from '../../DataStructures/ui_builder_interfaces'
import Localization from '../Localization'
import { Language } from '../ui_interfaces'

interface Properties {
  link?: LinkData
  className: string
  language?: Language
}

const InertiaLink = ({ link, className, language = 'en' }: Properties) => {
  const customUrl = useMemo(() => {
    if (link == null || link.link == null) {
      return ''
    }
    if (link.external || language === 'en') {
      return link.link
    }
    const hasOtherParameters = link.link.includes('?')
    if (hasOtherParameters) {
      return `${link.link}&lang=${language}`
    }
    return `${link.link}?lang=${language}`
  }, [language, link])

  return (
    <>
      {link != null && (
        <>
          {link.external && (
            <a
              href={customUrl}
              className={className}
              target='_blank'
              rel='noreferrer'
            >
              <Localization
                text={link.name}
                language={language}
              />
            </a>
          )}
          {!link.external && (
            <Link
              as='a'
              href={customUrl}
              className={className}
            >
              <Localization
                text={link.name}
                language={language}
              />
            </Link>
          )}
        </>
      )}
    </>
  )
}

export default InertiaLink
