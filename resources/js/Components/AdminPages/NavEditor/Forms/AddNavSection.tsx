import React, { useCallback, useState } from 'react'
import { RequiredTextData } from '../../../../DataStructures/ui_builder_interfaces'
import Modal from '../../../../ui/modal/Modal'
import AddLabel from '../../../UiBuilder/AddLabel'
import TitleInput from '../../../UiBuilder/Forms/TitleInput'

interface Properties {
  onSubmit: (data: RequiredTextData) => void
}

const AddNavSection = ({ onSubmit }: Properties) => {
  const [showModal, setShowModal] = useState(false)

  const onAdd = useCallback(
    (data: RequiredTextData | null) => {
      if (data == null) return
      onSubmit(data)
      setShowModal(false)
    },
    [onSubmit]
  )

  return (
    <>
      <div className='flex'>
        <AddLabel
          label='Add Section'
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal && (
        <Modal
          title='Add Section'
          setShowModal={setShowModal}
        >
          <TitleInput onSubmit={onAdd} />
        </Modal>
      )}
    </>
  )
}

export default AddNavSection
