import React from 'react'
import { ItemListField } from '../../Components/UiBuilder/DefaultBlockData'
import { BlocKFieldInfo } from '../../Components/UiBuilder/PageBuilder/BlockEditor'
import { LinkData } from '../../DataStructures/ui_builder_interfaces'
import EditLabel from '../button/EditLabel'
import InertiaLink from '../Link/InertiaLink'
import { Language } from '../ui_interfaces'

export interface BreadCrumbLink {
  name: string
  link: string | null
}

interface Properties {
  links: ItemListField<LinkData>
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
}

const BreadCrumb = ({ links, editMode, onFieldEdit, language = 'en' }: Properties) => {
  const linksLength = links.items.length

  return (
    <div>
      {links.items.map((link, index) => {
        return (
          <span
            className='text-sm capitalize'
            key={link.id.toString()}
          >
            <InertiaLink
              link={link.item}
              className='hover:text-indigo-500'
            />
            {editMode && onFieldEdit != null && (
              <EditLabel
                onClick={() =>
                  onFieldEdit({
                    field: 'links',
                    fieldType: 'links',
                    oldValue: link.item,
                    action: 'UPDATE',
                    itemIndex: link.id,
                  })
                }
              />
            )}
            {index === linksLength - 1 ? '  ' : ' / '}
          </span>
        )
      })}
    </div>
  )
}

export default BreadCrumb
