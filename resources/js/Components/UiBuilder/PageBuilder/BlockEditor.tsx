import {
  AdjustmentsHorizontalIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { useCallback, useState } from 'react'
import {
  Block,
  BlockImage,
  LinkData,
  RequiredTextData,
  TextData,
} from '../../../DataStructures/ui_builder_interfaces'
import ButtonIcon from '../../../ui/button/ButtonIcon'
import ChangeTextForm from '../BlockEditorForms/ChangeTextForm'
import ChangeDescriptionForm from '../BlockEditorForms/ChangeDescriptionForm'
import { PageBuilderAction } from './pageBuilderService'
import ResolveComponent from './ResolveComponent'
import ChangeLinkForm from '../BlockEditorForms/ChangeLinkForm'
import ChangeImageForm from '../BlockEditorForms/ChangeImageForm'
import { Language } from '../../../ui/ui_interfaces'
import BlockConfigurationForm from '../BlockEditorForms/BlockConfigurationForm'
import { BlockConfiguration } from '../DefaultBlockData'
import { PageDataDependencies } from '../../../Pages/UIEditor/OutputPage'
import ChangeHtml from '../BlockEditorForms/ChangeHtml'

interface Properties {
  block: Block
  dispatch: React.Dispatch<PageBuilderAction>
  language: Language
  dependencies?: PageDataDependencies
}

export type BlockFieldTypes =
  | 'text'
  | 'textarea'
  | 'image'
  | 'images'
  | 'link'
  | 'links'
  | 'html'
  | 'textItems'
export type BlockFieldValues =
  | RequiredTextData
  | TextData
  | LinkData
  | BlockImage
  | null
  | undefined

export interface BlocKFieldInfo {
  field: string
  fieldType: BlockFieldTypes
  oldValue: BlockFieldValues
  action: 'UPDATE' | 'INSERT' | 'REMOVE'
  itemIndex?: number
  itemField?: string
}

export type onFieldEdit = (field: BlocKFieldInfo) => void

const BlockEditor = ({ block, dispatch, language, dependencies }: Properties) => {
  const [selectedField, setSelectedField] = useState<BlocKFieldInfo | null>(null)
  const [showConfigurationForm, setShowConfigurationForm] = useState(false)

  const moveUP = () => {
    dispatch({ action: 'MOVE_BLOCK_UP', blockId: block.id })
  }

  const moveDOWN = () => {
    dispatch({ action: 'MOVE_BLOCK_DOWN', blockId: block.id })
  }

  const remove = () => {
    dispatch({ action: 'REMOVE_BLOCK', blockId: block.id })
  }

  const onFieldEdit = (field: BlocKFieldInfo) => {
    setSelectedField(field)
  }

  const updateConfig = useCallback(
    (field: BlockConfiguration) => {
      dispatch({
        action: 'UPDATE_BLOCK_FIELDS',
        blockId: block.id,
        blockData: field as Record<string, BlockFieldValues>,
      })
    },
    [dispatch, block]
  )

  return (
    <div className='relative'>
      <div className='absolute top-1 right-2 z-20 flex flex-wrap gap-2'>
        <ButtonIcon
          onClick={() => setShowConfigurationForm(true)}
          small
        >
          <AdjustmentsHorizontalIcon className='h-6 w-6' />
        </ButtonIcon>
        <ButtonIcon
          onClick={moveUP}
          small
        >
          <ArrowUpIcon className='h-6 w-6' />
        </ButtonIcon>
        <ButtonIcon
          onClick={moveDOWN}
          small
        >
          <ArrowDownIcon className='h-6 w-6' />
        </ButtonIcon>
        <ButtonIcon
          onClick={remove}
          small
        >
          <XMarkIcon className='h-6 w-6' />
        </ButtonIcon>
      </div>
      {selectedField?.fieldType !== 'html' && (
        <ResolveComponent
          blockName={block.blockName}
          editMode
          onFieldEdit={onFieldEdit}
          block={block}
          language={language}
          dispatch={dispatch}
          dependencies={dependencies}
        />
      )}
      {selectedField?.fieldType === 'html' && (
        <ChangeHtml
          lang={language}
          block={block}
          dispatch={dispatch}
          selectedField={selectedField}
          setSelectedField={setSelectedField}
        />
      )}
      <ChangeTextForm
        block={block}
        dispatch={dispatch}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <ChangeDescriptionForm
        block={block}
        dispatch={dispatch}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <ChangeLinkForm
        block={block}
        dispatch={dispatch}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <ChangeImageForm
        block={block}
        dispatch={dispatch}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
      <BlockConfigurationForm
        showForm={showConfigurationForm}
        setShowForm={setShowConfigurationForm}
        onConfigUpdate={updateConfig}
        block={block}
      />
    </div>
  )
}

export default BlockEditor
