import { Link, router } from '@inertiajs/react'
import { Page } from '../../../DataStructures/ui_builder_interfaces'
import Card from '../../../ui/card/Card'
import CardHeader from '../../../ui/card/CardHeader'
import Pagination from '../../../ui/table/Pagination'
import Table from '../../../ui/table/Table'
import { Paginator } from '../../../ui/ui_interfaces'

import { useState } from 'react'
import Input from '../../../ui/form/Input'
import SearchButton from '../../../ui/button/SearchButton'

const heads = ['Name', 'URL', 'Published']

// TODO use heroicons instead of svgs
// make search button component

const PageList = ({ pages }: { pages: Paginator<Page> }) => {
  const [search, setSearch] = useState('')
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.get(`/page-builder?search=${search}`)
  }

  return (
    <Card>
      <CardHeader
        title='Pages'
        add='/page-builder/create'
      />

      <form
        onSubmit={submitSearch}
        className='flex gap-2'
      >
        <Input
          setData={setSearch}
          placeholder='Search'
        />
        <SearchButton />
      </form>

      <div>
        <Table
          heads={heads}
          editColumn
        >
          <tbody>
            {pages.data.map((page: Page) => {
              return (
                <tr
                  key={page.id}
                  className='standard-tr'
                >
                  <td className='standard-td'>{page.title}</td>
                  <td className='standard-td'>{page.url}</td>
                  <td className='standard-td'>{page.published ? 'YES' : 'NO'}</td>
                  <td>
                    <Link
                      as='a'
                      href={`/page-builder/${page.id}`}
                      className='link m-2'
                    >
                      EDIT
                    </Link>
                    <a
                      href={`/page-preview/${page.id}`}
                      className='link m-2'
                      target='_blank'
                      rel='noreferrer'
                    >
                      VIEW
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <Pagination pagination={pages} />
    </Card>
  )
}

export default PageList
