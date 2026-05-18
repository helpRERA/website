import { router } from '@inertiajs/react'
import { useCallback, useMemo, useState } from 'react'
import { GlobalSearchProperties } from '../../Pages/GlobalSearchPage'
import Localization from '../../ui/Localization'
import Tabs from '../../ui/Tab/Tabs'

const tabs = [
  { value: 'Announcements', value_malayalam: '' },
  { value: 'Projects', value_malayalam: '' },
  { value: 'Pages', value_malayalam: '' },
]

const GlobalSearchTabs = ({ section, oldSearch, lang }: GlobalSearchProperties) => {
  const [selectedTab] = useState(section)
  const links = useMemo(() => {
    return {
      title: { english: 'Search', malayalam: '' },
    }
  }, [])

  const onTabChange = useCallback(
    (value: string) => {
      router.get(`/search?section=${value}&search=${oldSearch ?? ''}`)
    },
    [oldSearch]
  )

  return (
    <div className=''>
      <div className='break-words py-5'>
        <h1 className='text-2xl xl:text-3xl'>
          <Localization
            text={links.title}
            language={lang}
          />
        </h1>
        <p>Showing Results For &quot;{oldSearch}&quot;</p>
      </div>
      <div>
        <Tabs
          selectedTab={selectedTab}
          setSelectedTab={onTabChange}
          items={tabs}
        />
      </div>
    </div>
  )
}

export default GlobalSearchTabs
