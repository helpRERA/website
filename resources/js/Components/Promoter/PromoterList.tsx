import React from 'react'
import { Paginator } from '../../ui/ui_interfaces'
import { UserProfile } from '../../DataStructures/krera_interfaces'
import PromoterCard from './PromoterCard'
import Input from '../../ui/form/Input'
import useCustomForm from '../../hooks/useCustomForm'
import { router } from '@inertiajs/react'
import Button from '../../ui/button/Button'

interface Props {
  promoters: Paginator<UserProfile>
  oldSearch: string
}

export default function PromoterList({ promoters, oldSearch }: Props) {
  const { form, setFormValue } = useCustomForm({
    search: oldSearch,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const searchParams = new URLSearchParams()
    searchParams.append('search', form.search)
    router.get('/promoters?' + searchParams.toString())
  }

  const resetForm = () => {
    router.get('/promoters')
  }

  return (
    <>
      <form
        className='my-5 flex flex-col gap-5'
        onSubmit={handleSubmit}
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-col'>
            <Input
              label='Promoter Name / District'
              data={form.search}
              setData={setFormValue('search')}
            />
          </div>
        </div>
        <div className='flex flex-wrap items-end gap-4'>
          <Button label={'Search'} />
          <Button
            label='Reset'
            type='secondary'
            buttonType='button'
            onClick={resetForm}
          />
        </div>
      </form>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  md:grid-cols-1'>
        {promoters.data.map((promoter) => (
          <PromoterCard
            promoter={promoter}
            key={promoter.ID}
          />
        ))}
      </div>
    </>
  )
}
