import { useCallback } from 'react'
import { Block, BlockImage, TextData } from '../../../DataStructures/ui_builder_interfaces'
import EditLabel from '../../../ui/button/EditLabel'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import AddLabel from '../AddLabel'
import { BlockConfiguration, ItemListField, placeholderImage } from '../DefaultBlockData'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'
import { PageBuilderAction } from '../PageBuilder/pageBuilderService'

export interface LeadershipItem {
  id?: number
  image: BlockImage
  title: TextData
  subTitle: TextData
}

const defaultLeadershipItem: LeadershipItem = {
  image: placeholderImage,
  title: { english: 'Name', malayalam: '' },
  subTitle: { english: 'Role', malayalam: '' },
}

export interface LeadershipBlockData extends Block, BlockConfiguration {
  title?: TextData
  roles?: ItemListField<LeadershipItem>
}

interface Properties {
  lang: Language
  editMode?: boolean
  blockData?: LeadershipBlockData
  dispatch?: React.Dispatch<PageBuilderAction>
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

export const defaultLeadershipBlock = {
  title: { english: 'K-RERA Leadership', malayalam: '' },
  roles: {
    lastUUID: 0,
    items: [],
  },
}

const Leadership = ({
  lang = 'en',
  editMode = false,
  blockData,
  dispatch,
  onFieldEdit,
}: Properties) => {
  const addNewAction = useCallback(() => {
    if (dispatch != null) {
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'roles',
        fieldValue: defaultLeadershipItem,
      })
    }
  }, [dispatch, blockData])

  return (
    <div
      className={`bg-gray-100  ${blockData?.marginTop} ${blockData?.marginBottom}
          ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      <div className='container mx-auto px-6 md:px-12 xl:px-32'>
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-900 md:text-4xl'>
            <Localization
              text={blockData?.title}
              language={lang}
            />
            {editMode && onFieldEdit != null && (
              <EditLabel
                onClick={() =>
                  onFieldEdit({
                    action: 'INSERT',
                    field: 'title',
                    fieldType: 'text',
                    oldValue: blockData?.title,
                  })
                }
              />
            )}
          </h2>
        </div>
        <div className='grid items-center gap-12 md:grid-cols-3'>
          {blockData?.roles?.items.map((role) => {
            return (
              <div
                className='space-y-4 text-center'
                key={role.id}
              >
                <img
                  className='mx-auto aspect-picture rounded-xl object-cover md:h-40 md:w-40 lg:h-64 lg:w-64'
                  src={role.item.image.url}
                  alt={role.item.image.caption}
                  loading='lazy'
                  width={640}
                  height={805}
                />
                <div>
                  {editMode && onFieldEdit != null && (
                    <EditLabel
                      onClick={() =>
                        onFieldEdit({
                          field: 'roles',
                          oldValue: null,
                          itemField: 'image',
                          itemIndex: role.id,
                          fieldType: 'image',
                          action: 'UPDATE',
                        })
                      }
                    />
                  )}
                </div>
                <div>
                  <h4 className='text-2xl'>
                    <Localization
                      text={role.item.title}
                      language={lang}
                    />
                    {editMode && onFieldEdit != null && (
                      <EditLabel
                        onClick={() =>
                          onFieldEdit({
                            field: 'roles',
                            oldValue: role.item.title,
                            itemField: 'title',
                            itemIndex: role.id,
                            fieldType: 'text',
                            action: 'UPDATE',
                          })
                        }
                      />
                    )}
                  </h4>
                  <span className='block text-sm text-gray-500'>
                    <Localization
                      text={role.item.subTitle}
                      language={lang}
                    />
                    {editMode && onFieldEdit != null && (
                      <EditLabel
                        onClick={() =>
                          onFieldEdit({
                            field: 'roles',
                            oldValue: role.item.subTitle,
                            itemField: 'subTitle',
                            itemIndex: role.id,
                            fieldType: 'text',
                            action: 'UPDATE',
                          })
                        }
                      />
                    )}
                  </span>
                  {/*  remove card */}
                  {editMode && dispatch != null && (
                    <span>
                      <EditLabel
                        label='REMOVE CARD'
                        onClick={() =>
                          dispatch({
                            action: 'REMOVE_LIST_ITEM',
                            blockId: blockData?.id,
                            fieldName: 'roles',
                            itemId: role.id,
                          })
                        }
                      />
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className=''>
          {editMode && onFieldEdit != null && (
            <div>
              <AddLabel
                label='ADD SLIDE'
                onClick={addNewAction}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Leadership
