import React, { useCallback, useState } from 'react'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import Card from '../../ui/card/Card'
import CardHeader from '../../ui/card/CardHeader'
import Table from '../../ui/table/Table'
import { Announcement } from '../../DataStructures/data_interfaces'
import { Paginator } from '../../ui/ui_interfaces'
import { Link, router } from '@inertiajs/react'
import Pagination from '../../ui/table/Pagination'
import Input from '../../ui/form/Input'
import SearchButton from '../../ui/button/SearchButton'
import SearchField from '../../ui/form/SearchField'
import SelectList from '../../ui/form/SelectList'
import DatePicker from '../../ui/form/DatePicker'
import Button from '../../ui/button/Button'
import AnnouncementFilterOldValues from '../../Components/Announcements/AnnouncementFilter/AnnouncementFilterOldValues'
import { Bars3CenterLeftIcon } from '@heroicons/react/20/solid'
import useCascadedReferenceData from '../../data_hooks/useCascadedReferenceData'
import useReferenceValue from '../../data_hooks/useReferenceValue'
import useCustomForm from '../../hooks/useCustomForm'
import { AnnouncementListPageProperties } from '../AnnouncementListing/AnnouncementListingPage'

const heads = ['Name', 'Type', 'Published']

const sortOrder = [
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name' },
]

interface Properties {
  oldSearch: string
  oldFrom: string
  oldTo: string
  oldType: string
  oldSort: string
  oldSubType: string
  announcements: Paginator<Announcement>
}

const NoticeList = ({
  announcements,
  oldSearch,
  oldFrom,
  oldTo,
  oldType,
  oldSort,
  oldSubType,
}: Properties) => {
  const { form, setFormValue } = useCustomForm({
    search: oldSearch,
    type: oldType,
    sub_type: oldSubType,
    from_date: oldFrom,
    to_date: oldTo,
  })

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.get(`/manage-announcements`, {
      search: form.search,
      from_date: form.from_date,
      to_date: form.to_date,
      type: form.type,
      sub_type: form.sub_type,
      sort,
    })
  }

  const [sort, setSort] = useState(oldSort)
  const [types] = useReferenceValue('Announcement', 'Type')
  const [subTypes] = useCascadedReferenceData('Announcement', 'Sub Type', form.type)

  const sortChange = useCallback(
    (value: string) => {
      router.get(`/manage-announcements`, {
        search: oldSearch,
        from_date: oldFrom,
        to_date: oldTo,
        type: oldType,
        sub_type: oldSubType,
        sort: value,
      })
    },
    [oldSearch, oldFrom, oldTo, oldType, oldSubType]
  )

  return (
    <PaddedDashboardContent>
      <CardHeader
        title='Announcements'
        add='/manage-announcements/create'
      />

      <form
        onSubmit={submitSearch}
        className='flex flex-col gap-4 '
      >
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-6 '>
          <div className='flex flex-col md:col-span-2 lg:col-span-4'>
            <div className='flex w-full flex-col md:w-1/2 lg:w-1/4'>
              <Input
                label='Search'
                data={form.search}
                setData={setFormValue('search')}
                placeholder='Search'
              />
            </div>
          </div>
          <div className='flex flex-col '>
            <SelectList
              label='Type'
              list={types}
              data={form.type}
              dataKey='value_one'
              displayKey='value_one'
              setData={setFormValue('type')}
              showAllOption
              allOptionText='All Types'
            />
          </div>
          <div className='flex flex-col '>
            <SelectList
              label='Sub Type'
              list={subTypes}
              data={form.sub_type}
              dataKey='value_one'
              displayKey='value_one'
              setData={setFormValue('sub_type')}
              showAllOption
              allOptionText='All'
            />
          </div>
          <div className='flex flex-col '>
            <DatePicker
              data={form.from_date}
              label='From Date'
              setData={setFormValue('from_date')}
            />
          </div>

          <div className='flex flex-col'>
            <DatePicker
              data={form.to_date}
              label='To Date'
              setData={setFormValue('to_date')}
            />
          </div>
        </div>

        <div className=''>
          <Button label='Search' />
        </div>
      </form>
      <div className='mb-10 mt-10 flex flex-col gap-5'>
        <div className='flex w-full flex-col justify-end gap-3 sm:flex-row sm:items-center sm:gap-0'>
          <div className='flex-col self-end'>
            <SelectList
              list={sortOrder}
              data={sort}
              dataKey='value'
              displayKey='label'
              setData={sortChange}
              placeholder=''
            />
          </div>
        </div>
      </div>
      <Card>
        <div className='mt-10'>
          <Table
            heads={heads}
            editColumn
          >
            <tbody>
              {announcements.data.map((announcement) => {
                return (
                  <tr
                    className='standard-tr'
                    key={announcement.id.toString()}
                  >
                    <td className='standard-td'>{announcement.title}</td>
                    <td className='standard-td'>{announcement.type}</td>
                    <td className='standard-td'>{announcement.published ? 'YES' : 'NO'}</td>
                    <td className='standard-td'>{announcement.type}</td>
                    <td className='standard-td'>
                      <Link
                        as='a'
                        className='text-blue-500 hover:text-blue-600 hover:underline'
                        href={`/manage-announcements/${announcement.id}`}
                      >
                        VIEW
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </Card>

      <Pagination pagination={announcements} />
    </PaddedDashboardContent>
  )
}

export default NoticeList
