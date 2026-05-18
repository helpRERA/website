import { useMemo } from 'react'
import AlbumImages from '../../Components/Gallery/AlbumImages'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'
import { Album } from '../../DataStructures/data_interfaces'
import { Language } from '../../ui/ui_interfaces'

interface Properties {
  album: Album | null
  lang?: Language
}

const AlbumPage = ({ album, lang = 'en' }: Properties) => {
  const links = useMemo(() => {
    return {
      title: { english: 'Gallery', malayalam: '' },
      links: {
        lastUUID: 3,
        items: [
          {
            id: 1,
            item: { name: { english: 'Home', malayalam: '' }, link: '/', external: false },
          },
          {
            id: 2,
            item: {
              name: { english: 'Gallery', malayalam: '' },
              link: '/gallery',
              external: false,
            },
          },
          {
            id: 3,
            item: {
              name: { english: album?.name ?? '', malayalam: album?.name_malayalam ?? '' },
              link: `/gallery/${album?.url}`,
              external: false,
            },
          },
        ],
      },
    }
  }, [album])

  return (
    <AppLayout>
      <PageTitle
        block={links}
        language={lang}
      />
      <AppLayoutPadding>
        <AlbumImages album={album} />
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default AlbumPage
