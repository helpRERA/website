import React from 'react'
import { Language } from '../../../../ui/ui_interfaces'
import { localization } from '../../../../Localization/localization'
import RegisteredListItem from './RegisteredListItem'

interface Properties {
  language: Language
  registeredProjects?: number
  registeredAgents?: number
  complaintsCount?: number
  promotersCount?: number
}

const RegisteredList = ({
  language = 'en',
  registeredProjects,
  registeredAgents,
  complaintsCount,
  promotersCount,
}: Properties) => {
  return (
    <div className='flex justify-center'>
      <div className='flex items-center gap-2 rounded-full bg-white p-1.5 shadow-sm'>
        <RegisteredListItem
          link='explore-projects'
          value={registeredProjects}
          lang={language}
          title={localization['Registered Projects']}
          active={true}
        />
        <RegisteredListItem
          link='agents'
          value={registeredAgents}
          lang={language}
          title={localization['Registered Agents']}
        />
        <RegisteredListItem
          link='complaint-list'
          value={complaintsCount}
          lang={language}
          title={localization['Complaints Filed']}
        />
        <RegisteredListItem
          link='cause-list'
          value={0}
          lang={language}
          title={localization['Daily Case List'] || { en: 'Daily Case List', mal: 'Daily Case List' }}
        />
      </div>
    </div>
  )
}

export default RegisteredList
