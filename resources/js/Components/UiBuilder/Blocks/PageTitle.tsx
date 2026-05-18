import { LinkData, TextData } from '../../../DataStructures/ui_builder_interfaces'
import BreadCrumb from '../../../ui/breadcrumbs/BreadCrumb'
import EditLabel from '../../../ui/button/EditLabel'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import AddLabel from '../AddLabel'
import { ItemListField } from '../DefaultBlockData'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'

export interface PageTitleData {
  title: TextData
  links: ItemListField<LinkData>
}

interface Properties {
  block?: PageTitleData
  editMode?: boolean
  language?: Language
  onFieldEdit?: (field: BlocKFieldInfo) => void
}

const PageTitle = ({ block, editMode, language, onFieldEdit }: Properties) => {
  return (
    <AppLayoutPadding>
      {block != null && (
        <div className='border-b bg-white py-2'>
          <h1 className='break-words  text-2xl leading-9 xl:text-3xl'>
            <Localization
              text={block.title}
              language={language}
            />
            {editMode && onFieldEdit != null && (
              <EditLabel
                onClick={() =>
                  onFieldEdit({
                    fieldType: 'text',
                    field: 'title',
                    oldValue: block.title,
                    action: 'UPDATE',
                  })
                }
              />
            )}
          </h1>
          <BreadCrumb
            links={block.links}
            editMode={editMode}
            onFieldEdit={onFieldEdit}
            language={language}
          />
          {editMode && onFieldEdit != null && (
            <div className='flex'>
              <div className='flex flex-col'>
                <AddLabel
                  label='ADD LINK'
                  onClick={() =>
                    onFieldEdit({
                      field: 'links',
                      fieldType: 'links',
                      oldValue: null,
                      action: 'INSERT',
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayoutPadding>
  )
}

export default PageTitle
