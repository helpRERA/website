import { useCallback } from 'react'
import { Block, TextData } from '../../../DataStructures/ui_builder_interfaces'
import TinyMCE from '../../../ExternalLibs/TinyMce/TinyMce'
import { Language } from '../../../ui/ui_interfaces'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'
import { PageBuilderAction } from '../PageBuilder/pageBuilderService'

interface Properties {
  selectedField: BlocKFieldInfo | null
  setSelectedField: (field: BlocKFieldInfo | null) => void
  dispatch: React.Dispatch<PageBuilderAction>
  block: Block
  lang?: Language
}

const ChangeHtml = ({
  selectedField,
  setSelectedField,
  lang = 'en',
  block,
  dispatch,
}: Properties) => {
  const onHtmlInput = useCallback(
    (html: string) => {
      const oldValue = selectedField?.oldValue as TextData
      if (selectedField?.itemField != null && selectedField.itemIndex != null) {
        dispatch({
          action: 'UPDATE_LIST_ITEM_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          itemId: selectedField?.itemIndex,
          blockData: {
            [selectedField.itemField]: {
              english: lang == 'en' ? html : oldValue.english,
              malayalam: lang == 'mal' ? html : oldValue.malayalam,
            },
          },
        })
      } else {
        dispatch({
          action: 'UPDATE_BLOCK_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: {
            english: lang == 'en' ? html : oldValue.english,
            malayalam: lang == 'mal' ? html : oldValue.malayalam,
          },
        })
      }
      setSelectedField(null)
    },
    [selectedField, block, dispatch, lang, setSelectedField]
  )

  return (
    <div className='w-full'>
      <TinyMCE
        data={
          lang == 'en'
            ? ((selectedField?.oldValue as TextData)?.english as string)
            : ((selectedField?.oldValue as TextData)?.malayalam as string)
        }
        setData={onHtmlInput}
        setShowModal={() => setSelectedField(null)}
      />
    </div>
  )
}

export default ChangeHtml
