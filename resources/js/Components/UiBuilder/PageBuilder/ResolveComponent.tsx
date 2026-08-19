import React from 'react'
import { Block } from '../../../DataStructures/ui_builder_interfaces'
import BlockInPageNav from '../Blocks/BlockInPageNav'
import BannerRightImage from '../Blocks/BannerRightImage'
import LeftImageBlock from '../Blocks/LeftImageBlock'
import RichTextBlock from '../Blocks/RichTextBlock'
import RightImageBlock from '../Blocks/RightImageBlock'
import {
  BlockConfiguration,
  HalfImageBlock,
  LinksBlockData,
  RichTextBlockData,
} from '../DefaultBlockData'
import { PageBuilderAction } from './pageBuilderService'
import { Language } from '../../../ui/ui_interfaces'
import HomeExplore from '../Blocks/HomeExplore'
import ContactUS from '../Blocks/ContactUS'
import ActionCarousel from '../Blocks/ActionCarousel'
import HomeActionCarousel from '../Blocks/HomeActionCarousel'
import PageTitle, { PageTitleData } from '../Blocks/PageTitle'
import ProjectsMapBlock, { ProjectMapBlockInterface } from '../Blocks/Map/ProjectMapsBlock'
import { PageDataDependencies } from '../../../Pages/UIEditor/OutputPage'
import AnnouncementTicker from '../Blocks/AnnouncementTicker'
import { BlocKFieldInfo } from './BlockEditor'
import LatestAnnouncements from '../Blocks/LatestAnnouncements'
import Leadership, { LeadershipBlockData } from '../Blocks/Leadership'
import FAQ from '../Blocks/FAQ'
import Footer from '../../Home/Footer/Footer'
import { FooterDataInterface } from '../../AdminPages/FooterEditor/FooterEditor'
import HomeGallery from '../Blocks/Gallery/HomeGallery'
import AltActionCarousel, { AltActionCarouselBlock } from '../Blocks/AltActionCarousel'
import AboutUs from '../Blocks/AboutUs'
import BrowseProjects from '../Blocks/BrowseProjects'

interface Properties {
  block?: Block
  blockName: string
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  language?: Language
  dispatch?: React.Dispatch<PageBuilderAction>
  dependencies?: PageDataDependencies
  currentDate?: string
}

const ResolveComponent = ({
  blockName,
  editMode = false,
  onFieldEdit,
  block,
  language = 'en',
  dispatch,
  dependencies,
}: Properties) => {
  return (
    <>
      {blockName === 'Footer' && (
        <Footer
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as FooterDataInterface}
          language={language}
        />
      )}
      {blockName === 'Home Explore' && (
        <HomeExplore
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as HalfImageBlock}
          language={language}
        />
      )}
      {blockName === 'Page Nav' && (
        <BlockInPageNav
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as LinksBlockData}
          language={language}
        />
      )}
      {blockName === 'Banner Right Image' && (
        <BannerRightImage
          promotersCount={dependencies?.promotersCount}
          registeredAgents={dependencies?.registeredAgents}
          registeredProjects={dependencies?.registeredProjects}
          complaintsCount={dependencies?.complaintsCount}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as HalfImageBlock}
          language={language}
          districts={dependencies?.districtList}
        />
      )}
      {blockName === 'Rich Text' && (
        <RichTextBlock
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as RichTextBlockData}
          language={language}
        />
      )}
      {blockName === 'Left Image' && (
        <LeftImageBlock
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as HalfImageBlock}
          language={language}
        />
      )}
      {blockName === 'Right Image' && (
        <RightImageBlock
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as HalfImageBlock}
          language={language}
        />
      )}
      {blockName === 'Contact Us' && (
        <ContactUS
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as RichTextBlockData}
          language={language}
        />
      )}
      {blockName === 'About Us' && (
        <AboutUs
          language={language}
          registeredProjects={dependencies?.registeredProjects}
          registeredAgents={dependencies?.registeredAgents}
          complaintsCount={dependencies?.complaintsCount}
          promotersCount={dependencies?.promotersCount}
        />
      )}
      {blockName === 'Home Action Carousel' && (
        <HomeActionCarousel
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as any}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Browse Projects' && (
        <BrowseProjects projects={dependencies?.browseProjects}
         districts={dependencies?.districtList}
        />
      )}
      {blockName === 'Action Carousel' && (
        <ActionCarousel
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as any}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Alt Action Carousel' && (
        <AltActionCarousel
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as AltActionCarouselBlock}
          language={language}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Page Title' && (
        <PageTitle
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          block={block as unknown as PageTitleData}
          language={language}
        />
      )}
      {blockName === 'Home Map Block' && (
        <ProjectsMapBlock
          language={language}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as ProjectMapBlockInterface}
          promotersCount={dependencies?.promotersCount}
          registeredAgents={dependencies?.registeredAgents}
          registeredProjects={dependencies?.registeredProjects}
          complaintsCount={dependencies?.complaintsCount}
        />
      )}
      {blockName === 'Home Announcement Ticker' && (
        <AnnouncementTicker
          language={language}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as BlockConfiguration}
          announcements={dependencies?.announcementTicker}
        />
      )}
      {blockName === 'Home Latest Announcements' && (
        <LatestAnnouncements
          language={language}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as BlockConfiguration}
          announcements={dependencies?.latestAnnouncements}
        />
      )}
      {blockName === 'Home Leadership' && (
        <Leadership
          lang={language}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as LeadershipBlockData}
          dispatch={dispatch}
        />
      )}
      {blockName === 'FAQ' && (
        <FAQ
          language={language}
          editMode={editMode}
          onFieldEdit={onFieldEdit}
          blockData={block as unknown as any}
          dispatch={dispatch}
        />
      )}
      {blockName === 'Home Gallery' && (
        <HomeGallery
          blockData={block as BlockConfiguration}
          lang={language}
          latestAlbums={dependencies?.latestAlbums}
          latestVideos={dependencies?.latestVideos}
        />
      )}
    </>
  )
}

export default ResolveComponent
