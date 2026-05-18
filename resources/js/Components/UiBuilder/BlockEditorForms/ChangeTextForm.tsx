import { useCallback } from 'react'
import { Block, RequiredTextData } from '../../../DataStructures/ui_builder_interfaces'
import Modal from '../../../ui/modal/Modal'
import { PageBuilderAction } from '../PageBuilder/pageBuilderService'
import TitleInput from '../Forms/TitleInput'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'

interface Properties {
  selectedField: BlocKFieldInfo | null
  setSelectedField: (field: BlocKFieldInfo | null) => void
  dispatch: React.Dispatch<PageBuilderAction>
  block: Block
}

const ChangeTextForm = ({ selectedField, dispatch, block, setSelectedField }: Properties) => {
  const onTitleInput = useCallback(
    (title: RequiredTextData | null) => {
      if (title == null) {
        return
      }
      if (selectedField?.itemField != null && selectedField.itemIndex != null) {
        dispatch({
          action: 'UPDATE_LIST_ITEM_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: title,
          itemId: selectedField?.itemIndex,
          blockData: { [selectedField.itemField]: title },
        })
      } else {
        dispatch({
          action: 'UPDATE_BLOCK_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: title,
        })
      }

      setSelectedField(null)
    },
    [selectedField, dispatch, block, setSelectedField]
  )

  return (
    <>
      {selectedField != null && selectedField.fieldType === 'text' && (
        <Modal
          title={`Edit ${selectedField.field}`}
          setShowModal={() => setSelectedField(null)}
        >
          <>
            <TitleInput
              onSubmit={onTitleInput}
              data={selectedField.oldValue as RequiredTextData}
            />
          </>
        </Modal>
      )}
    </>
  )
}

export default ChangeTextForm
