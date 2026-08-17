import React, { FormEvent, useState } from 'react'
import { Announcement } from '../../../DataStructures/data_interfaces'
import useCustomForm from '../../../hooks/useCustomForm'
import AnnouncementForm, { AnnouncementFormFields } from './AnnouncementForm'
import { router, usePage } from '@inertiajs/react'
import Card from '../../../ui/card/Card'
import CardHeader from '../../../ui/card/CardHeader'
import Button from '../../../ui/button/Button'

interface Properties {
  announcement: Announcement
}

const EditAnnouncementForm = ({ announcement }: Properties) => {
  const { form, setFormValue, toggleBoolean } = useCustomForm<AnnouncementFormFields>({
    title: announcement.title,
    title_malayalam: announcement.title_malayalam ?? '',
    description: announcement.description,
    description_malayalam: announcement.description_malayalam ?? '',
    date: announcement.date,
    type: announcement.type ?? '',
    sub_type: announcement.sub_type ?? '',
    published: announcement.published === 1,
    ticker: announcement.ticker === 1,
    is_new: announcement.is_new === 1,
  })

  const errors = usePage().props.errors as unknown as Record<
    keyof AnnouncementFormFields,
    string | undefined
  >

  const [loading, setLoading] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    router.put(
      `/manage-announcements/${announcement.id}`,
      {
        ...form,
      },
      {
        onFinish: () => setLoading(false),
      }
    )
  }

  return (
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
  )
}

export default EditAnnouncementForm
