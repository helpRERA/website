import { useCallback } from 'react'
import { Block, TextData } from '../../../DataStructures/ui_builder_interfaces'
import { localization } from '../../../Localization/localization'
import EditLabel from '../../../ui/button/EditLabel'
import Localization, { displayText } from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import AddLabel from '../AddLabel'
import {
  BlockConfiguration,
  ItemListField,
  loremIpsum,
  placeholderParagraph,
} from '../DefaultBlockData'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'
import { PageBuilderAction } from '../PageBuilder/pageBuilderService'

export interface FAQItemData {
  title: TextData
  description: TextData
}

interface BlockInfo extends BlockConfiguration, Block {
  title: TextData
  faq: ItemListField<FAQItemData>
}

export const faqBlock = {
  title: localization['Frequently Asked Questions'],
  faq: {
    lastUUID: 0,
    items: [],
  },
}

const defaultFaqItem = {
  title: {
    english: loremIpsum,
    malayalam: '',
  },
  description: {
    english: placeholderParagraph,
    malayalam: placeholderParagraph,
  },
}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: BlockInfo
  language?: Language
  dispatch?: React.Dispatch<PageBuilderAction>
}

const FAQ = ({
  blockData,
  editMode = false,
  language = 'en',
  onFieldEdit,
  dispatch,
}: Properties) => {
  const addNewAction = useCallback(() => {
    if (dispatch != null) {
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'faq',
        fieldValue: defaultFaqItem,
      })
    }
  }, [dispatch, blockData])

  return (
    <section
      className={`bg-gray-100 text-gray-800 ${blockData?.marginTop} ${blockData?.marginBottom}
          ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
    >
      <div className='container mx-auto flex flex-col justify-center py-4 md:py-8'>
        <h2 className='mb-12 text-center text-lg font-bold leading-none md:text-xl lg:text-2xl'>
          <Localization
            language={language}
            text={blockData?.title}
          />
          {editMode && onFieldEdit != null && (
            <EditLabel
              onClick={() =>
                onFieldEdit({
                  field: 'title',
                  fieldType: 'text',
                  action: 'UPDATE',
                  oldValue: blockData?.title,
                })
              }
            />
          )}
        </h2>
        <div className='flex flex-col divide-y divide-gray-300'>
          {blockData?.faq.items.map((item) => {
            return (
              <details key={item.id.toString()}>
                <summary className='cursor-pointer py-2 outline-none focus:underline'>
                  <Localization
                    text={item.item.title}
                    language={language}
                  />
                  {editMode && onFieldEdit != null && (
                    <EditLabel
                      onClick={() =>
                        onFieldEdit({
                          field: 'faq',
                          oldValue: item.item.title,
                          itemField: 'title',
                          itemIndex: item.id,
                          fieldType: 'text',
                          action: 'UPDATE',
                        })
                      }
                    />
                  )}
                  {editMode && dispatch != null && (
                    <EditLabel
                      label='REMOVE'
                      onClick={() => {
                        dispatch({
                          action: 'REMOVE_LIST_ITEM',
                          blockId: blockData?.id,
                          fieldName: 'faq',
                          itemId: item.id,
                        })
                      }}
                    />
                  )}
                </summary>
                <div className='px-4 pb-4'>
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: displayText(item.item.description, language) ?? '',
                      }}
                    ></div>
                    {editMode && onFieldEdit != null && (
                      <EditLabel
                        onClick={() =>
                          onFieldEdit({
                            field: 'faq',
                            oldValue: item.item.description,
                            itemField: 'description',
                            itemIndex: item.id,
                            fieldType: 'html',
                            action: 'UPDATE',
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              </details>
            )
          })}
          {editMode && onFieldEdit != null && (
            <div className='flex w-full justify-center py-4'>
              <AddLabel
                label='ADD ITEM'
                onClick={addNewAction}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FAQ
