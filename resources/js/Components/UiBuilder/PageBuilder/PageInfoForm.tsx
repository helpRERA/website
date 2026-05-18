import React, { useCallback, useEffect } from 'react'
import { Page } from '../../../DataStructures/ui_builder_interfaces'
import use419Error from '../../../hooks/use419Error'
import useCustomForm from '../../../hooks/useCustomForm'
import useNameUrl from '../../../hooks/useNameUrl'
import Button from '../../../ui/button/Button'
import CheckBox from '../../../ui/form/CheckBox'
import Input from '../../../ui/form/Input'
import TextArea from '../../../ui/form/TextArea'

export interface PageDataForm {
  title: string
  description: string
  published: boolean
  url: string
}

interface Properties {
  page?: Page
  onSubmit: (form: PageDataForm) => void
}

const PageInfoForm = ({ page, onSubmit }: Properties) => {
  const { form, setFormValue, toggleBoolean, setAll } = useCustomForm({
    title: '',
    description: '',
    published: false,
  })

  const url = useNameUrl(form.title)
  const errors = use419Error(false)

  useEffect(() => {
    if (page != null) {
      setAll({
        title: page.title,
        description: page.description,
        published: page.published,
      })
    }
  }, [page, setAll])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onSubmit({
        ...form,
        url,
      })
    },
    [form, url, onSubmit]
  )

  return (
    <div className='flex w-full md:w-1/2'>
      <form
        className='flex w-full flex-col gap-5'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col'>
          <Input
            label='Title'
            data={form.title}
            setData={setFormValue('title')}
            error={errors.title ?? errors.url}
          />
        </div>
        <div className='flex flex-col'>
          <TextArea
            label='Description'
            data={form.description}
            setData={setFormValue('description')}
            error={errors.description}
          />
        </div>
        <div className='flex flex-col gap-3 md:row-start-6'>
          <CheckBox
            label='Published'
            data={form.published}
            toggle={toggleBoolean('published')}
          />
        </div>
        <div className=''>
          <Button label={page == null ? 'Create' : 'Update'} />
        </div>
      </form>
    </div>
  )
}

export default PageInfoForm
