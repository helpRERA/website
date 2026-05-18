import { router } from '@inertiajs/react'
import { useReducer, useState } from 'react'
import { Page } from '../../../DataStructures/ui_builder_interfaces'
import { PageDataDependencies } from '../../../Pages/UIEditor/OutputPage'
import BackButton from '../../../ui/button/BackButton'
import Button from '../../../ui/button/Button'
import SelectList from '../../../ui/form/SelectList'
import { Language } from '../../../ui/ui_interfaces'
import AddPageBlock from './AddPageBlock'
import BlockEditor from './BlockEditor'
import PageBuilderService from './pageBuilderService'
import EditButton from '../../../ui/button/EditButton'
import DeleteButton from '../../../ui/button/DeleteButton'
import DeleteModal from '../../../ui/modal/DeleteModal'

interface Properties {
  page: Page
  dependencies: PageDataDependencies
}

export const languages: {
  label: string
  value: Language
}[] = [
  { label: 'English', value: 'en' },
  { label: 'Malayalam', value: 'mal' },
]

const PageBuilder = ({ page, dependencies }: Properties) => {
  const [pageBlock, managePage] = useReducer(PageBuilderService, page.blocks)
  const [language, setLanguage] = useState<Language>('en')

  const addComponent = (block: string) => {
    managePage({ action: 'ADD_BLOCK', blockName: block })
  }
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const save = () => {
    router.put(`/page-builder/${page.id}`, {
      blocks: pageBlock,
    } as any)
  }

  return (
    <>
      <div className='mt-10 flex flex-wrap justify-between px-5'>
        <div className='flex flex-wrap gap-4'>
          <BackButton link='/page-builder' />
          <Button
            label='SAVE'
            onClick={save}
          />
          <EditButton link={`/page-builder/${page.id}/edit`} />
          <DeleteButton onClick={() => setShowDeleteModal((old) => !old)} />
        </div>
      </div>
      <div className='mb-10 flex flex-wrap items-end justify-end gap-5 px-5'>
        <div className='flex flex-col'>
          <SelectList
            label='Language'
            list={languages}
            displayKey='label'
            dataKey='value'
            data={language}
            setData={(value: string) => setLanguage(value as Language)}
          />
        </div>
        <AddPageBlock onBlockAdd={addComponent} />
      </div>
      {showDeleteModal && (
        <DeleteModal
          url={`/page-builder/${page.id}`}
          setShowModal={setShowDeleteModal}
          title={`Delete ${page.id}`}
        >
          <p>Confirm Deleting {page.title}?</p>
        </DeleteModal>
      )}
      <div className='bg-white'>
        {pageBlock.blocks.map((block) => {
          return (
            <BlockEditor
              block={block}
              key={block.id.toString()}
              dispatch={managePage}
              language={language}
              dependencies={dependencies}
            />
          )
        })}
      </div>
    </>
  )
}

export default PageBuilder
