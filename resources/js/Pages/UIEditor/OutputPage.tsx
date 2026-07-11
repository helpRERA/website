import React from 'react'
import ResolveComponent from '../../Components/UiBuilder/PageBuilder/ResolveComponent'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import BrowseProjects from '../../Components/UiBuilder/Blocks/BrowseProjects'
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
          .sort((a, b) => {
            const order = [
              'Banner Right Image',
              'Home Announcement Ticker',
              'Action Carousel',
              'Home Latest Announcements',
              'Home Map Block'
            ];
            const indexA = order.indexOf(a.blockName);
            const indexB = order.indexOf(b.blockName);
            
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
          })
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
              {element.blockName === 'Home Latest Announcements' && <BrowseProjects />}
            </React.Fragment>
          )
        })}
      </div>
    </AppLayout>
  )
}

export default OutputPage
