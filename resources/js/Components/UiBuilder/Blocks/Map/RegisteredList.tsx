import React from 'react'
import { Language } from '../../../../ui/ui_interfaces'
import { localization } from '../../../../Localization/localization'
import RegisteredListItem from './RegisteredListItem'
import AppLayoutPadding from '../../../Layout/AppLayout/AppLayoutPadding'

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
    <AppLayoutPadding>
      <div className='flex flex-col justify-around gap-5 md:flex-row'>
        <RegisteredListItem
          link='explore-projects'
          value={registeredProjects}
          lang={language}
          title={localization['Registered Projects']}
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
          link='promoters'
          value={promotersCount}
          lang={language}
          title={localization['Registered Promoters']}
        />
      </div>
    </AppLayoutPadding>
  )
}

export default RegisteredList
