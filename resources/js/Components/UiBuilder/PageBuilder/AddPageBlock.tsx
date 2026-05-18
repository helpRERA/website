import { useState } from 'react'
import AddButton from '../../../ui/button/AddButton'
import Button from '../../../ui/button/Button'
import SelectList from '../../../ui/form/SelectList'
import Modal from '../../../ui/modal/Modal'
import ResolveComponent from './ResolveComponent'
import CheckBox from '../../../ui/form/CheckBox'
import useReferenceValue from '../../../data_hooks/useReferenceValue'
import useCascadedReferenceData from '../../../data_hooks/useCascadedReferenceData'
import useCustomForm from '../../../hooks/useCustomForm'
import TitleInput from '../Forms/TitleInput'

const blockNames = [
  { name: 'Page Title' },
  {
    name: 'Page Nav',
  },
  {
    name: 'Banner Right Image',
  },
  {
    name: 'Left Image',
  },
  {
    name: 'Right Image',
  },
  {
    name: 'Rich Text',
  },
  {
    name: 'Action Carousel',
  },
  {
    name: 'Alt Action Carousel',
  },
  {
    name: 'Contact Us',
  },
  {
    name: 'Home Map Block',
  },
  {
    name: 'Home Announcement Ticker',
  },
  {
    name: 'Home Latest Announcements',
  },
  { name: 'Home Explore' },
  { name: 'FAQ' },
  { name: 'Home Leadership' },
  { name: 'Home Gallery' },
]

interface Properties {
  onBlockAdd: (block: string) => void
}

const AddPageBlock = ({ onBlockAdd }: Properties) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedBlock, setSelectedBlock] = useState('')

  const addComponent = () => {
    onBlockAdd(selectedBlock)
    setShowModal(false)
  }

  return (
    <>
      <>
        <AddButton onClick={() => setShowModal(true)} />
      </>
      {showModal && (
        <Modal
          title='Add Component'
          setShowModal={setShowModal}
          large
        >
          <div className='flex flex-col gap-5 p-2'>
            <div className='flex flex-wrap justify-end gap-4'>
              <div className='flex flex-grow flex-col'>
                <SelectList
                  label='Component'
                  displayKey={'name'}
                  dataKey='name'
                  list={blockNames}
                  data={selectedBlock}
                  setData={setSelectedBlock}
                />
              </div>
              <div className='flex flex-col justify-end'>
                <Button
                  label='ADD'
                  onClick={addComponent}
                />
              </div>
            </div>
            <ResolveComponent blockName={selectedBlock} />
          </div>
        </Modal>
      )}
    </>
  )
}

export default AddPageBlock
