import { Link } from '@inertiajs/react'
import { BlockLink } from '../../DataStructures/ui_builder_interfaces'

const DisplayBlockLink = ({
  className,
  link,
  malayalam = false,
}: {
  className: string
  link: BlockLink
  malayalam?: boolean
}) => {
  return (
    <>
      {link.external && (
        <a
          href={link.link == null ? undefined : link.link}
          className={className}
          target='_blank'
          rel='noreferrer'
        >
          {link.name.english}
        </a>
      )}
      {!link.external && (
        <Link
          as='a'
          href={link.link == null ? '' : link.link}
          className={className}
        >
          {link.name.english}
        </Link>
      )}
    </>
  )
}

export default DisplayBlockLink
