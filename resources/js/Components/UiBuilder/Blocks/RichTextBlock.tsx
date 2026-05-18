import EditLabel from '../../../ui/button/EditLabel'
import { BlocKFieldInfo, BlockFieldTypes, BlockFieldValues } from '../PageBuilder/BlockEditor'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import { RichTextBlockData, richTextData } from '../DefaultBlockData'
import { displayText } from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: RichTextBlockData
  language?: Language
}

const RichTextBlock = ({
  editMode = false,
  onFieldEdit,
  blockData = richTextData,
  language = 'en',
}: Properties) => {
  const onEdit = (field: string, fieldType: BlockFieldTypes, oldValue: BlockFieldValues) => {
    if (onFieldEdit) {
      onFieldEdit({
        field,
        fieldType,
        oldValue,
        action: 'UPDATE',
      })
    }
  }

  return (
    <AppLayoutPadding>
      <div
        className={`mce-content-body w-full ${blockData.marginTop} ${blockData.marginBottom} ${blockData.paddingTop} ${blockData.paddingBottom}`}
        dangerouslySetInnerHTML={{
          __html: displayText(blockData.text, language) ?? '',
        }}
      ></div>
      <div className='flex'>
        {editMode && <EditLabel onClick={() => onEdit('text', 'html', blockData.text)} />}
      </div>
      <style>
        {`
                   .mce-content-body table {
                        border: 1px solid black;
                    }
                    .mce-content-body .mce-content-body tr {
                        border: 1px solid black;
                        padding: 2px;
                    }
                    .mce-content-body .mce-content-body th, td {
                        border: 1px solid black;
                        padding: 2px;
                    }
                    .mce-content-body ul {
                        display: block;
                        list-style-type: disc;
                        margin-block-start: 1em;
                        margin-block-end: 1em;
                        margin-inline-start: 0px;
                        margin-inline-end: 0px;
                        padding-inline-start: 40px;
                    }
                    .mce-content-body ol {
                        display: block;
                        list-style-type: decimal;
                        margin-block-start: 1em;
                        margin-block-end: 1em;
                        margin-inline-start: 0px;
                        margin-inline-end: 0px;
                        padding-inline-start: 40px;
                    }
                    .mce-content-body h1 {
                        display: block;
                        font-size: 2em;
                        margin-block-start: 0.67em;
                        margin-block-end: 0.67em;
                        margin-inline-start: 0px;
                        margin-inline-end: 0px;
                        font-weight: bold;
                    }
                    .mce-content-body h2 {
                        display: block;
                        font-size: 1.5em;
                        margin-block-start: 0.83em;
                        margin-block-end: 0.83em;
                        margin-inline-start: 0px;
                        margin-inline-end: 0px;
                        font-weight: bold;
                    }
                    .mce-content-body h3 {
                        display: block;
                        font-size: 1.17em;
                        margin-block-start: 1em;
                        margin-block-end: 1em;
                        margin-inline-start: 0px;
                        margin-inline-end: 0px;
                        font-weight: bold;
                    }
                    .mce-content-body h4 {
                        display: block;
                        margin-block-start: 1.33em;
                        margin-block-end: 1.33em;
                        margin-inline-start: 0px;
                        margin-inline-end: 0px;
                        font-weight: bold;
                    }
                    .mce-content-body h5 {
                        display: block;
                        font-size: 0.83em;
                        margin-block-start: 1.67em;
                        margin-block-end: 1.67em;
                        margin-inline-start: 0px;
                        margin-inline-end: 0px;
                        font-weight: bold;
                    }
                    .mce-content-body h6 {
                        display: block;
                        font-size: 0.67em;
                        margin-block-start: 2.33em;
                        margin-block-end: 2.33em;
                        margin-inline-start: 0px;
                        margin-inline-end: 0px;
                        font-weight: bold;
                    }
                    .mce-content-body pre {
                        display: block;
                        font-family: monospace;
                        white-space: pre;
                        margin: 1em 0px;
                    }
                    .mce-content-body p {
                        display: block;
                        margin-block-start: 1em;
                        margin-block-end: 1em;
                        margin-inline-start: 0px;
                        margin-inline-end: 0px;
                    }
                    .mce-content-body sub {
                        vertical-align: sub;
                        font-size: smaller;
                    }
                    .mce-content-body sup {
                        vertical-align: super;
                        font-size: smaller;
                    }
                    .mce-content-body a {
                        cursor: pointer;
                    }
                    .mce-content-body em {
                        font-style: italic;
                    }
                    .mce-content-body blockquote {
                        display: block;
                        margin-block-start: 1em;
                        margin-block-end: 1em;
                        margin-inline-start: 40px;
                        margin-inline-end: 40px;
                    }
                    .mce-content-body:not([dir=rtl]) blockquote {
                        border-left: 2px solid #ccc;
                        margin-left: 1.5rem;
                        padding-left: 1rem;
                    }
                    .mce-content-body [data-mce-selected=inline-boundary] {
                        background-color: #b4d7ff;
                    }
                    .mce-content-body code {
                        background-color: #e8e8e8;
                        border-radius: 3px;
                        padding: .1rem .2rem;
                    }
                    .mce-content-body {
                        word-wrap: break-word;
                    }
                `}
      </style>
    </AppLayoutPadding>
  )
}

export default RichTextBlock
