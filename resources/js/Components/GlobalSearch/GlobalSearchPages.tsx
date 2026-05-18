import { Page } from '../../DataStructures/ui_builder_interfaces'
import Pagination from '../../ui/table/Pagination'
import { Language, Paginator } from '../../ui/ui_interfaces'
import GlobalSearchResultCard from './GlobalSearchResultCard'

interface Properties {
  pages: Paginator<Page>
  lang: Language
}

const GlobalSearchPages = ({ pages, lang }: Properties) => {
  return (
    <>
      <div className='my-10 flex flex-col gap-5'>
        {pages?.data.map((page) => (
          <GlobalSearchResultCard
            lang={lang}
            key={page.id.toString()}
            title={{ english: page.title, malayalam: '' }}
            description={{
              english: page.description,
              malayalam: '',
            }}
            link={`/${page.url}?lang=${lang}`}
          />
        ))}
      </div>
      <div className='my-5'>
        <Pagination pagination={pages} />
      </div>
    </>
  )
}

export default GlobalSearchPages
