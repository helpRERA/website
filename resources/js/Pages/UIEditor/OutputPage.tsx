import React from 'react'
import ResolveComponent from '../../Components/UiBuilder/PageBuilder/ResolveComponent'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import {Page} from './../../DataStructures/ui_builder_interfaces'
import {Language} from '../../ui/ui_interfaces'
import {Album, Announcement, GalleryVideo} from '../../DataStructures/data_interfaces'

interface Properties {
  page: Page
  lang?: Language
  dependencies: PageDataDependencies
  currentDate?: string
}

export interface PageDataDependencies {
  registeredProjects?: number
  promotersCount?: number
  registeredAgents?: number
  latestAnnouncements?: Announcement[]
  latestAlbums?: Album[]
  latestVideos?: GalleryVideo[]
  announcementTicker?: Announcement[]
  complaintsCount?: number
}

const OutputPage = ({page, lang = 'en', dependencies, currentDate}: Properties) => {
  return (
    <AppLayout>
      <div className='flex flex-col'>
        {[...page.blocks.blocks]
          .sort((a, b) => (a.position || 0) - (b.position || 0))
          .map((element) => {
          return (
            <React.Fragment key={element.id}>
              <ResolveComponent
                blockName={element.blockName}
                block={element}
                language={lang}
                dependencies={dependencies}
                currentDate={currentDate}
              />
            </React.Fragment>
          )
        })}
      </div>
    </AppLayout>
  )
}

export default OutputPage
