import { router } from '@inertiajs/react'
import React, { useEffect, useReducer, useState } from 'react'
import Button from '../../../ui/button/Button'
import SelectList from '../../../ui/form/SelectList'
import use419Error from '../../../hooks/use419Error'
import useFetchNavSection from './fetch-nav-section'
import navBuilder from './nav-builder'
import NavEditorForm from './NavEditorForm'

export const navSections = [
  { value: 'ABOUT K-RERA', url: '/who-is-who' },
  { value: 'PUBLIC CORNER', url: '/explore-projects' },
  { value: 'LEGAL CORNER', url: '/complaint-list' },
  { value: 'PROMOTER CORNER', url: '/promoters' },
  { value: 'AGENT CORNER', url: '/agents' },
  { value: 'APPELLATE TRIBUNAL', url: '/appellate-tribunal' },
  { value: 'CONTACT US', url: '/contact' },
  { value: 'STATISTICS', url: '/data-dashboard' },
]

const NavEditor = () => {
  const [selectedNavSection, setSelectedNavSection] = useState('ABOUT K-RERA')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const { menuItem, loading } = useFetchNavSection(selectedNavSection)
  const [selectedSection, sectionDispatch] = useReducer(navBuilder, null)

  useEffect(() => {
    sectionDispatch({ action: 'CHANGE_SECTION', sections: menuItem })
  }, [menuItem])

  use419Error()

  const saveChanges = () => {
    router.post(`/nav-editor`, {
      data: selectedSection,
      section: selectedNavSection,
    } as unknown as FormData)
  }

  const changeLanguage = () => {
    if (selectedLanguage === 'en') {
      setSelectedLanguage('mal')
    } else {
      setSelectedLanguage('en')
    }
  }

  return (
    <div className='flex flex-col gap-5 p-5'>
      <div className='flex justify-end'>
        <Button
          type='secondary'
          label={selectedLanguage}
          onClick={changeLanguage}
        />
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4 xl:gap-5'>
        <div className='flex flex-col'>
          <SelectList
            label='Select Nav Section'
            list={navSections}
            data={selectedNavSection}
            setData={setSelectedNavSection}
            dataKey='value'
            displayKey='value'
          />
        </div>
        <div className='self-end'>
          <Button
            label='SAVE CHANGES'
            onClick={saveChanges}
          />
        </div>
      </div>
      {selectedSection != null && (
        <NavEditorForm
          language={selectedLanguage}
          actionDispatch={sectionDispatch}
          loading={loading}
          selectedSection={selectedSection}
        />
      )}
    </div>
  )
}

export default NavEditor
