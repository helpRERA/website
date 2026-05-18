import { router } from '@inertiajs/react'
import { FormEvent, useEffect } from 'react'
import { GalleryVideo } from '../../../DataStructures/data_interfaces'
import use419Error from '../../../hooks/use419Error'
import useCustomForm from '../../../hooks/useCustomForm'
import Button from '../../../ui/button/Button'
import CheckBox from '../../../ui/form/CheckBox'
import DatePicker from '../../../ui/form/DatePicker'
import Input from '../../../ui/form/Input'
import TextArea from '../../../ui/form/TextArea'
import { LaravelFlash } from '../../../ui/ui_interfaces'

interface Properties {
  setShowModal: (showModal: boolean) => void
  video?: GalleryVideo | null
}

const AddVideoForm = ({ setShowModal, video }: Properties) => {
  const { form, setFormValue, toggleBoolean, setAll } = useCustomForm({
    caption: '',
    caption_malayalam: '',
    description: '',
    description_malayalam: '',
    url: '',
    date: '',
    published: false,
  })

  useEffect(() => {
    if (video != null) {
      setAll({
        caption: video.caption,
        caption_malayalam: video.caption_malayalam ?? '',
        description: video.description ?? '',
        description_malayalam: video.description_malayalam ?? '',
        url: video.url,
        date: video.date ?? '',
        published: video.published === 1,
      })
    }
  }, [video, setAll])

  const errors = use419Error(false)

  const saveData = () => {
    router.post(
      `/manage-video`,
      { ...form },
      {
        onSuccess: (result) => {
          const { flash } = result.props as unknown as { flash: LaravelFlash }
          if (flash.error == null) {
            setShowModal(false)
          }
        },
      }
    )
  }

  const updateData = () => {
    router.put(
      `/manage-video/${video?.id}`,
      { ...form },
      {
        onSuccess: (result) => {
          const { flash } = result.props as unknown as { flash: LaravelFlash }
          if (flash.error == null) {
            setShowModal(false)
          }
        },
      }
    )
  }

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (video == null) {
      saveData()
      return
    }
    updateData()
  }

  return (
    <form
      className='flex flex-col gap-5'
      onSubmit={submitForm}
    >
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div className='flex flex-col'>
          <Input
            label='Title *'
            data={form.caption}
            setData={setFormValue('caption')}
            error={errors.caption}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            label='Title (Malayalam)'
            data={form.caption_malayalam}
            setData={setFormValue('caption_malayalam')}
            error={errors.caption_malayalam}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div className='flex flex-col'>
          <TextArea
            label='Description *'
            data={form.description}
            setData={setFormValue('description')}
            error={errors.description}
          />
        </div>
        <div className='flex flex-col'>
          <TextArea
            label='Description (Malayalam)'
            data={form.description_malayalam}
            setData={setFormValue('description_malayalam')}
            error={errors.description_malayalam}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div className='flex flex-col'>
          <TextArea
            label='URL *'
            data={form.url}
            setData={setFormValue('url')}
            error={errors.url}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div className='flex flex-col'>
          <DatePicker
            label='Date *'
            data={form.date}
            setData={setFormValue('date')}
            error={errors.date}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div className='flex flex-col'>
          <CheckBox
            label='Published'
            data={form.published}
            toggle={toggleBoolean('published')}
            error={errors.published}
          />
        </div>
      </div>
      <div className='flex'>
        {video == null && <Button label='ADD' />}
        {video != null && <Button label='UPDATE' />}
      </div>
    </form>
  )
}

export default AddVideoForm
