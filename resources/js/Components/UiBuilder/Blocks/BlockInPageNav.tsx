import { Link } from '@inertiajs/react'
import { LinkData } from '../../../DataStructures/ui_builder_interfaces'
import EditLabel from '../../../ui/button/EditLabel'
import Localization from '../../../ui/Localization'
import { BlocKFieldInfo, BlockFieldTypes, BlockFieldValues } from '../PageBuilder/BlockEditor'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import AddLabel from '../AddLabel'
import { linkListBlock, LinksBlockData, ListItem } from '../DefaultBlockData'
import { Language } from '../../../ui/ui_interfaces'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: LinksBlockData
  language?: Language
}

export default function BlockInPageNav({
  editMode = false,
  onFieldEdit,
  blockData = linkListBlock,
  language = 'en',
}: Properties) {
  const onEdit = (
    field: string,
    fieldType: BlockFieldTypes,
    oldValue: BlockFieldValues,
    action: 'UPDATE' | 'REMOVE' | 'INSERT',
    index?: number
  ) => {
    if (onFieldEdit) {
      onFieldEdit({
        field,
        fieldType,
        oldValue,
        action,
        itemIndex: index,
      })
    }
  }

  return (
    <AppLayoutPadding>
      <div
        className={`my-8 flex flex-wrap items-center justify-between md:justify-start md:gap-4
        ${blockData.marginTop} ${blockData.marginBottom} ${blockData.paddingTop} ${blockData.paddingBottom}`}
      >
        {blockData.links.items.map((link: ListItem<LinkData>) => {
          return (
            <div key={link.id}>
              {link.item.external && (
                <a
                  href={link.item.link ?? ''}
                  className='flex cursor-pointer items-center justify-center bg-gray-800 px-5 py-3 text-sm
                    leading-none text-white hover:bg-gray-800'
                >
                  <Localization
                    text={link.item.name}
                    language={language}
                  />
                </a>
              )}
              {!link.item.external && (
                <Link
                  as='a'
                  href={link.item.link ?? ''}
                  className='flex cursor-pointer items-center justify-center bg-gray-800 px-5 py-3
                    text-sm leading-none text-white hover:bg-gray-800'
                >
                  <Localization
                    text={link.item.name}
                    language={language}
                  />
                </Link>
              )}
              {editMode && (
                <EditLabel onClick={() => onEdit('links', 'links', link.item, 'UPDATE', link.id)} />
              )}
            </div>
          )
        })}
        {editMode && (
          <div className='flex flex-col'>
            <AddLabel
              label='ADD LINK'
              onClick={() => onEdit('links', 'links', null, 'INSERT')}
            />
          </div>
        )}
      </div>
    </AppLayoutPadding>
  )
}
