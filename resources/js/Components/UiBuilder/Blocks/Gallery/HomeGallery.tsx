import { Album, GalleryVideo } from '../../../../DataStructures/data_interfaces'
import { Language } from '../../../../ui/ui_interfaces'
import AppLayoutPadding from '../../../Layout/AppLayout/AppLayoutPadding'
import { BlockConfiguration } from '../../DefaultBlockData'
import HomeGalleryImages from './HomeGalleryImages'
import HomeGalleryVideos from './HomeGalleryVideos'

export const defaultGalleryBlock = {
  dependencies: ['latestAlbums', 'latestVideos'],
}

interface Properties {
  lang?: Language
  latestAlbums?: Album[]
  latestVideos?: GalleryVideo[]
  blockData: BlockConfiguration
}

export default function HomeGallery({
  lang = 'en',
  latestAlbums,
  latestVideos,
  blockData,
}: Properties) {
  return (
    <div
      className={`${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom} bg-neutral-100`}
    >
      <AppLayoutPadding>
        <div className='flex flex-col items-start justify-start'>
          <div className='mt-6'>
            <p className='text-3xl font-semibold '>Gallery</p>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <HomeGalleryImages
            lang={lang}
            latestAlbums={latestAlbums}
          />
          <HomeGalleryVideos
            language={lang}
            latestVideos={latestVideos}
          />
        </div>
      </AppLayoutPadding>
    </div>
  )
}
