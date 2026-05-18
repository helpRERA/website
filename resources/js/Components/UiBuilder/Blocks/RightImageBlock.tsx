import EditLabel from '../../../ui/button/EditLabel'
import Localization from '../../../ui/Localization'
import { BlocKFieldInfo, BlockFieldTypes, BlockFieldValues } from '../PageBuilder/BlockEditor'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import AddLabel from '../AddLabel'
import { HalfImageBlock, imageBlock } from '../DefaultBlockData'
import { Language } from '../../../ui/ui_interfaces'
import LinkButton from '../../../ui/button/LinkButton'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: HalfImageBlock
  language?: Language
}

export default function RightImageBlock({
  editMode = false,
  onFieldEdit,
  blockData = imageBlock,
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
        className={`flex w-full flex-wrap ${blockData.marginTop} ${blockData.marginBottom} ${blockData.paddingTop} ${blockData.paddingBottom}`}
      >
        <div className='mb-4 flex w-full flex-col justify-center md:w-7/12 md:pb-0 md:pr-8 lg:w-8/12 lg:pr-16'>
          <div className='mb-5 w-full'>
            <h1 className='text-2xl font-bold capitalize  text-gray-900 lg:text-4xl xl:leading-10'>
              <Localization
                text={blockData.title}
                language={language}
              />
              {editMode && (
                <EditLabel onClick={() => onEdit('title', 'text', blockData.title, 'INSERT')} />
              )}
            </h1>
          </div>
          <div className='flex w-full flex-col gap-2 text-base leading-7 text-gray-600 lg:text-xl'>
            {blockData.description.items.map((item) => {
              return (
                <p key={item.id.toString()}>
                  <Localization
                    text={item.item}
                    language={language}
                  />
                  {editMode && (
                    <EditLabel
                      onClick={() =>
                        onEdit('description', 'textItems', item.item, 'UPDATE', item.id)
                      }
                    />
                  )}
                </p>
              )
            })}
            {editMode && (
              <AddLabel
                onClick={() => onEdit('description', 'textItems', null, 'INSERT')}
                label='Add Paragraph'
              />
            )}
          </div>
          <div className='mt-5 flex flex-wrap'>
            {blockData.link != null && (
              <LinkButton
                link={blockData.link}
                lang={language}
              />
            )}
            {editMode && onFieldEdit != null && (
              <EditLabel
                label='Edit LInk'
                onClick={() => {
                  onFieldEdit({
                    action: 'INSERT',
                    field: 'link',
                    fieldType: 'link',
                    oldValue: blockData.link ?? null,
                  })
                }}
              />
            )}
          </div>
        </div>

        <div className='flex w-full flex-col gap-2 md:w-5/12 lg:w-4/12'>
          {blockData.image != null && (
            <img
              className='aspect-[4/3] w-full object-cover object-center'
              alt={blockData.image.caption ?? ''}
              src={blockData.image?.url ?? ''}
            />
          )}
          {editMode && <EditLabel onClick={() => onEdit('image', 'image', null, 'INSERT')} />}
        </div>
      </div>
    </AppLayoutPadding>
  )
}
