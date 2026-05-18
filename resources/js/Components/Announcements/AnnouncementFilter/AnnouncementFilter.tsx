import React, { useCallback, useEffect, useState } from 'react'
import SelectList from '../../../ui/form/SelectList'
import { Bars3CenterLeftIcon } from '@heroicons/react/20/solid'
import SearchField from '../../../ui/form/SearchField'
import useCustomForm from '../../../hooks/useCustomForm'
import DatePicker from '../../../ui/form/DatePicker'
import SideBanner from '../../../ui/modal/SideBanner'
import { router } from '@inertiajs/react'
import { AnnouncementListPageProperties } from '../../../Pages/AnnouncementListing/AnnouncementListingPage'
import AnnouncementFilterOldValues from './AnnouncementFilterOldValues'
import useReferenceValue from '../../../data_hooks/useReferenceValue'
import useCascadedReferenceData from '../../../data_hooks/useCascadedReferenceData'
import Button from '../../../ui/button/Button'

const sortOrder = [
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name' },
]

const AnnouncementFilter = ({
  oldSearch,
  oldFrom,
  oldTo,
  oldType,
  oldSort,
  oldSubType,
  lang = 'en',
}: Omit<AnnouncementListPageProperties, 'announcements'>) => {
  const [isToggle, setIsToggle] = useState(false)
  const [toggleDate, setToggleDate] = useState(false)
  const { form, setFormValue } = useCustomForm({
    search: oldSearch,
    type: oldType,
    sub_type: oldSubType,
    from_date: oldFrom,
    to_date: oldTo,
  })
  const [sort, setSort] = useState(oldSort)
  const [types] = useReferenceValue('Announcement', 'Type')
  const [subTypes] = useCascadedReferenceData('Announcement', 'Sub Type', form.type)

  useEffect(() => {
    setFormValue('sub_type')('')
  }, [form.type, setFormValue])

  useEffect(() => {
    if (oldTo != null && oldTo !== '') {
      setToggleDate(true)
    }
  }, [oldTo])

  const openSideBar = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // event.stopPropagation()
    setIsToggle(true)
  }

  const sortChange = useCallback(
    (value: string) => {
      router.get(`/announcements`, {
        search: oldSearch,
        from_date: oldFrom,
        to_date: oldTo,
        type: oldType,
        sub_type: oldSubType,
        sort: value,
        lang,
      })
    },
    [oldSearch, oldFrom, oldTo, oldType, oldSubType, lang]
  )
  const submitForm = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    performSearch(form.search, form.from_date, form.to_date, form.type, form.sub_type, oldSort)
  }

  const performSearch = useCallback(
    (search: string, from: string, to: string, type: string, subType: string, sort: string) => {
      router.get(`/announcements`, {
        search,
        from_date: from,
        to_date: to,
        type,
        sub_type: subType,
        sort,
        lang,
      })
    },
    [lang]
  )

  const resetForm = () => {
    router.get(`/announcements?lang=${lang}`)
  }

  return (
    <>
      <SideBanner
        shown={isToggle}
        setShow={setIsToggle}
        actionText='SEARCH'
        onAction={submitForm}
      >
        <form
          className='flex flex-col gap-5'
          onSubmit={submitForm}
        >
          <div className='flex justify-end'>
            <Button
              label='Reset Form'
              onClick={resetForm}
              buttonType='button'
              type='secondary'
            />
          </div>
          <div className='flex items-center gap-1 border-b border-gray-200 md:col-span-2'>
            <SearchField
              data={form.search}
              setData={setFormValue('search')}
              placeholder='Search Data'
            />
          </div>
          <div className='flex flex-col md:col-span-2'>
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
          <div className='flex flex-col md:col-span-2'>
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
          <div className='flex flex-col md:col-span-2'>
            <DatePicker
              data={form.from_date}
              label='From Date'
              setData={setFormValue('from_date')}
            />
          </div>
          <div className='flex flex-col md:col-span-2'>
            <div className='flex items-center py-4 text-sm'>
              <div className='relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm border border-gray-400 bg-white'>
                <input
                  type='checkbox'
                  className='checkbox absolute h-full w-full cursor-pointer opacity-0 '
                  onClick={() => setToggleDate(!toggleDate)}
                />
              </div>

              <span className='text-skin-base  ml-1 font-normal leading-4'>Include To Date</span>
            </div>
          </div>
          {toggleDate && (
            <>
              <div className='flex flex-col md:col-span-2'>
                <DatePicker
                  data={form.to_date}
                  label='To Date'
                  setData={setFormValue('to_date')}
                />
              </div>
            </>
          )}
        </form>
      </SideBanner>
      <div className='mb-10 mt-10 flex flex-col gap-5'>
        <div className='flex w-full flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-0'>
          <button
            className='flex'
            onClick={openSideBar}
          >
            <Bars3CenterLeftIcon className='h-6 w-6' />
            <span className='inline-block pl-3'>Filter</span>
          </button>
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
        <AnnouncementFilterOldValues
          oldSearch={oldSearch}
          oldFrom={oldFrom}
          oldTo={oldTo}
          oldType={oldType}
          oldSubType={oldSubType}
          oldSort={oldSort}
          performSearch={performSearch}
        />
      </div>
    </>
  )
}

export default AnnouncementFilter
