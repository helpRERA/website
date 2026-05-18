import { useCallback } from 'react'
import { Block, RequiredTextData, TextData } from '../../../DataStructures/ui_builder_interfaces'
import Modal from '../../../ui/modal/Modal'
import { PageBuilderAction } from '../PageBuilder/pageBuilderService'
import DescriptionInput from '../Forms/DescriptionInput'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'

interface Properties {
  selectedField: BlocKFieldInfo | null
  setSelectedField: (field: BlocKFieldInfo | null) => void
  dispatch: React.Dispatch<PageBuilderAction>
  block: Block
}

const ChangeDescriptionForm = ({
  selectedField,
  dispatch,
  block,
  setSelectedField,
}: Properties) => {
  const onDescription = useCallback(
    (description: RequiredTextData | null) => {
      if (description == null) {
        dispatch({
          action: 'REMOVE_LIST_ITEM',
          blockId: block.id,
          fieldName: selectedField?.field,
          itemId: selectedField?.itemIndex as number,
        })
      }
      if (selectedField?.itemField != null && selectedField.itemIndex != null) {
        dispatch({
          action: 'UPDATE_LIST_ITEM_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: description,
          itemId: selectedField?.itemIndex,
          blockData: { [selectedField.itemField]: description },
        })
      } else if (selectedField?.action === 'UPDATE' && selectedField?.itemIndex == null) {
        dispatch({
          action: 'UPDATE_BLOCK_FIELD',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: description,
        })
      } else if (selectedField?.action === 'UPDATE') {
        dispatch({
          action: 'UPDATE_LIST_ITEM',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: description,
          itemId: selectedField?.itemIndex as number,
        })
      } else if (selectedField?.action === 'INSERT') {
        dispatch({
          action: 'INSERT_INTO_LIST',
          blockId: block.id,
          fieldName: selectedField?.field,
          fieldValue: description,
        })
      }
      setSelectedField(null)
    },
    [block, dispatch, selectedField, setSelectedField]
  )

  return (
    <>
      {selectedField != null &&
        (selectedField.fieldType === 'textarea' || selectedField.fieldType === 'textItems') && (
          <Modal
            title={`Edit ${selectedField.field}`}
            setShowModal={() => setSelectedField(null)}
          >
            <>
              <DescriptionInput
                onSubmit={onDescription}
                data={selectedField.oldValue as TextData}
                showRemove={selectedField.action === 'UPDATE'}
              />
            </>
          </Modal>
        )}
    </>
  )
}

export default ChangeDescriptionForm
