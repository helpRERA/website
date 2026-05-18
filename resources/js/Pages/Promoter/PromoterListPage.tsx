import { useMemo } from 'react'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import PromoterList from '../../Components/Promoter/PromoterList'
import { UserProfile } from '../../DataStructures/krera_interfaces'
import { Paginator } from '../../ui/ui_interfaces'
import Pagination from '../../ui/table/Pagination'

interface Props {
  promoters: Paginator<UserProfile>
  oldSearch: string
}

export default function PromoterListPage({ promoters, oldSearch }: Props) {
  const links = useMemo(() => {
    return {
      title: { english: 'Promoters', malayalam: '' },
      links: {
        lastUUID: 2,
        items: [
          {
            id: 1,
            item: { name: { english: 'Home', malayalam: '' }, link: '/', external: false },
          },
          {
            id: 2,
            item: {
              name: { english: 'Promoters', malayalam: '' },
              link: '/promoters',
              external: false,
            },
          },
        ],
      },
    }
  }, [])

  return (
    <AppLayout>
      <PageTitle block={links} />
      <AppLayoutPadding>
        <PromoterList
          promoters={promoters}
          oldSearch={oldSearch}
        />
        <div className='my-5'>
          <Pagination pagination={promoters} />
        </div>
      </AppLayoutPadding>
    </AppLayout>
  )
}
