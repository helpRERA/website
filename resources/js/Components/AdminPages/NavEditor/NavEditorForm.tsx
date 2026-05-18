import React, { useCallback, useEffect } from 'react'
import { NavMenuItem, RequiredTextData } from '../../../DataStructures/ui_builder_interfaces'
import FullSpinnerWrapper from '../../../ui/FullSpinnerWrapper'
import AddNavSection from './Forms/AddNavSection'
import { NavBuilderAction } from './nav-builder'
import NavSectionEdit from './NavSection/NavSectionEdit'

interface Properties {
  actionDispatch: React.Dispatch<NavBuilderAction>
  selectedSection: NavMenuItem
  loading: boolean
  language: string
}

const NavEditorForm = ({ actionDispatch, loading, selectedSection, language }: Properties) => {
  const addNavSection = useCallback(
    (sectionName: RequiredTextData) => {
      actionDispatch({ action: 'ADD_SECTION', sectionName })
    },
    [actionDispatch]
  )

  useEffect(() => {
    console.log(selectedSection)
  }, [selectedSection])

  return (
    <FullSpinnerWrapper processing={loading}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {selectedSection.items.map((navSubSection) => {
          return (
            <NavSectionEdit
              key={navSubSection.id.toString()}
              section={navSubSection}
              actionDispatch={actionDispatch}
              language={language}
            />
          )
        })}
        <div className='flex'>
          <AddNavSection onSubmit={addNavSection} />
        </div>
      </div>
    </FullSpinnerWrapper>
  )
}

export default NavEditorForm
