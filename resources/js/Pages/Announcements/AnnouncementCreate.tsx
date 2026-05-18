import React, { FormEvent, useEffect, useState } from 'react'
import Card from '../../ui/card/Card'
import CardHeader from '../../ui/card/CardHeader'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import AnnouncementForm, {
  AnnouncementFormFields,
} from '../../Components/AdminPages/Announcement/AnnouncementForm'
import useCustomForm from '../../hooks/useCustomForm'
import Button from '../../ui/button/Button'
import { router, usePage } from '@inertiajs/react'

const AnnouncementCreate = () => {
  const { form, setFormValue, toggleBoolean } = useCustomForm<AnnouncementFormFields>({
    title: '',
    title_malayalam: '',
    description: '',
    description_malayalam: '',
    date: '',
    type: '',
    sub_type: '',
    published: false,
    ticker: false,
  })

  const errors = usePage().props.errors as unknown as Record<
    keyof AnnouncementFormFields,
    string | undefined
  >

  const [loading, setLoading] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    router.post(
      '/manage-announcements',
      {
        ...form,
      },
      {
        onFinish: () => setLoading(false),
      }
    )
  }

  return (
    <PaddedDashboardContent>
      <Card>
        <CardHeader
          title='Add New Announcement'
          back={'/manage-announcements'}
        />
        <form onSubmit={onSubmit}>
          <AnnouncementForm
            form={form}
            setFormValue={setFormValue}
            toggleBoolean={toggleBoolean}
            errors={errors}
          />
          <div className='flex'>
            <Button
              label='SAVE'
              processing={loading}
            />
          </div>
        </form>
      </Card>
    </PaddedDashboardContent>
  )
}

export default AnnouncementCreate
