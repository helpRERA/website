import React from 'react'
import { Language } from '../../../ui/ui_interfaces'
import { linkListBlock, LinksBlockData, ListItem } from '../DefaultBlockData'
import { BlocKFieldInfo, BlockFieldTypes, BlockFieldValues } from '../PageBuilder/BlockEditor'
import Localization from '../../../ui/Localization'
import EditLabel from '../../../ui/button/EditLabel'
import AddLabel from '../AddLabel'
import { Link } from '@inertiajs/react'
import { LinkData } from '../../../DataStructures/ui_builder_interfaces'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: LinksBlockData
  language?: Language
}

const Breadcrumbs = ({
  editMode = false,
  onFieldEdit,
  blockData = linkListBlock,
  language = 'en',
}: Properties) => {
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
    <>
      <div className='border-4 bg-white py-6 lg:py-8'>
        <div className='container mx-auto flex flex-col items-start justify-between px-6 md:flex-row md:items-center'>
          <div>
            <p className='flex items-center text-xs text-black'>
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
                      <EditLabel
                        onClick={() => onEdit('links', 'links', link.item, 'UPDATE', link.id)}
                      />
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
              <span>Portal</span>
              <span className='mx-2'>&gt;</span>
              <span>Dashboard</span>
              <span className='mx-2'>&gt;</span>
              <span>KPIs</span>
            </p>
            <h4 className='text-2xl font-bold leading-tight text-black'>
              Dashboard
              {editMode && (
                <EditLabel onClick={() => onEdit('title', 'text', blockData.title, 'INSERT')} />
              )}
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default Breadcrumbs
