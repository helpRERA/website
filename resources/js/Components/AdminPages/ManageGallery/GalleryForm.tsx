import { router } from '@inertiajs/react'
import { FormEvent, useEffect, useState } from 'react'
import { Album, Image } from '../../../DataStructures/data_interfaces'
import { BlockImage } from '../../../DataStructures/ui_builder_interfaces'
import use419Error from '../../../hooks/use419Error'
import useCustomForm from '../../../hooks/useCustomForm'
import useNameUrl from '../../../hooks/useNameUrl'
import Button from '../../../ui/button/Button'
import ImagePickButton from '../../../ui/button/ImagePickButton'
import Card from '../../../ui/card/Card'
import CardHeader from '../../../ui/card/CardHeader'
import CheckBox from '../../../ui/form/CheckBox'
import DatePicker from '../../../ui/form/DatePicker'
import Input from '../../../ui/form/Input'
import TextArea from '../../../ui/form/TextArea'
import Modal from '../../../ui/modal/Modal'
import ChooseImage from '../../Common/ImageUpload/ChooseImage'

interface FormFields {
  name: string
  name_malayalam: string
  description: string
  description_malayalam: string
  cover_image: string
  published: boolean
  event_date: string
}

const GalleryForm = ({ album }: { album?: Album }) => {
  const [showModal, setShowModal] = useState(false)
  const { form, setAll, setFormValue, toggleBoolean } = useCustomForm<FormFields>({
    name: '',
    name_malayalam: '',
    description: '',
    description_malayalam: '',
    cover_image: '',
    published: false,
    event_date: '',
  })

  const errors = use419Error(false)

  useEffect(() => {
    if (album == null) {
      return
    }
    setAll({
      name: album.name,
      name_malayalam: album.name_malayalam == null ? '' : album.name_malayalam,
      description: album.description == null ? '' : album.description,
      description_malayalam: album.description_malayalam == null ? '' : album.description_malayalam,
      cover_image: album.cover_photo,
      published: album.published === 1,
      event_date: album.event_date == null ? '' : album.event_date,
    })
  }, [album, setAll])

  const url = useNameUrl(form.name)

  const openUploadModal = () => {
    setShowModal(true)
  }

  const onImage = (file: Image | null) => {
    setShowModal(false)
    if (file == null || file.url == null) {
      setFormValue('cover_image')('')
      return
    }
    setFormValue('cover_image')(file.url)
  }

  const saveData = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.post('/manage-gallery', {
      ...form,
      id: album == null ? '' : album.id,
      url,
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          title={album == null ? 'Add Album' : 'Edit ' + album.name}
          back={album == null ? '/manage-gallery' : '/manage-gallery/' + album.id}
        />
        <form
          className='mt-10 flex flex-col gap-5'
          onSubmit={saveData}
        >
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div className='flex flex-col'>
              <Input
                setData={setFormValue('name')}
                data={form.name}
                label='Name *'
                error={errors.name}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                setData={setFormValue('name_malayalam')}
                data={form.name_malayalam}
                label='Name (Malayalam)'
                error={errors.nameMalayalam}
              />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div className='flex flex-col'>
              <TextArea
                setData={setFormValue('description')}
                data={form.description}
                label='Description *'
                error={errors.description}
              />
            </div>
            <div className='flex flex-col'>
              <TextArea
                setData={setFormValue('description_malayalam')}
                data={form.description_malayalam}
                label='Description (Malayalam)'
                error={errors.descriptionMalayalam}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col'>
              <DatePicker
                label='Event Date'
                data={form.event_date}
                setData={setFormValue('event_date')}
                error={errors.event_date}
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <CheckBox
              toggle={toggleBoolean('published')}
              data={form.published}
              label='Publish Gallery'
              error={errors.published}
            />
          </div>
          <div className='flex justify-start'>
            <ImagePickButton onClick={openUploadModal} />
          </div>
          <div className='flex flex-col gap-3'>
            {form.cover_image != '' && (
              <img
                className='h-16 w-16 rounded-full'
                src={form.cover_image}
              />
            )}
            {errors.cover_image != null && <span className='error-text'>{errors.cover_image}</span>}
          </div>
          <div className='flex items-center '>
            <Button label={album == null ? 'CREATE' : 'UPDATE'} />
          </div>
        </form>
      </Card>
      <>
        {showModal && (
          <Modal
            setShowModal={setShowModal}
            title='Add Image'
            large
          >
            <ChooseImage onImage={onImage} />
          </Modal>
        )}
      </>
    </>
  )
}

export default GalleryForm
