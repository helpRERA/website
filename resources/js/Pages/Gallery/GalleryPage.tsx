import { router } from '@inertiajs/react'
import { useCallback, useMemo, useState } from 'react'
import AlbumsGrid from '../../Components/Gallery/AlbumsGrid'
import VideoGrid from '../../Components/Gallery/VideoGrid'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'
import { Album, GalleryVideo } from '../../DataStructures/data_interfaces'
import Localization from '../../ui/Localization'
import Tabs from '../../ui/Tab/Tabs'
import { Language, Paginator } from '../../ui/ui_interfaces'

interface Properties {
  albums?: Paginator<Album>
  videos?: Paginator<GalleryVideo>
  lang?: Language
  section: string
}

const tabs = [{ value: 'Images' }, { value: 'Videos' }]

const GalleryPage = ({ albums, lang = 'en', section, videos }: Properties) => {
  const links = useMemo(() => {
    return {
      title: { english: 'Gallery', malayalam: '' },
    }
  }, [])

  const [selectedTab, setSelectedTab] = useState(section)

  const onTabChange = useCallback((value: string) => {
    router.get(`/gallery?section=${value}`)
  }, [])

  return (
    <AppLayout>
      <AppLayoutPadding>
        <div className=''>
          <div className='break-words py-5 text-2xl xl:text-3xl'>
            <h1>
              <Localization
                text={links.title}
                language={lang}
              />
            </h1>
          </div>
          <div>
            <Tabs
              selectedTab={selectedTab}
              setSelectedTab={onTabChange}
              items={tabs}
            />
          </div>
        </div>
        {albums != null && <AlbumsGrid albums={albums} />}
        {videos != null && <VideoGrid videos={videos} />}
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default GalleryPage
