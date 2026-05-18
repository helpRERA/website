import React, { useCallback, useEffect } from 'react'
import { RequiredTextData } from '../../../DataStructures/ui_builder_interfaces'
import useCustomForm from '../../../hooks/useCustomForm'
import Button from '../../../ui/button/Button'
import Input from '../../../ui/form/Input'

interface Properties {
  onSubmit: (data: RequiredTextData | null) => void
  data?: RequiredTextData | null
  showRemove?: boolean
}

const TitleInput = ({ onSubmit, showRemove = false, data }: Properties) => {
  const { form, setFormValue, setAll } = useCustomForm({
    english: '',
    malayalam: '',
  })

  useEffect(() => {
    if (data != null) {
      setAll({
        english: data.english,
        malayalam: data.malayalam ?? '',
      })
    }
  }, [data, setAll])

  const onFormSubmit = useCallback(() => {
    onSubmit(form)
  }, [form, onSubmit])

  return (
    <>
      <div className='flex w-full flex-col p-2'>
        <Input
          label='section'
          data={form.english == null ? '' : form.english}
          setData={setFormValue('english')}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <Input
          label='section (Malayalam)'
          data={form.malayalam == null ? '' : form.malayalam}
          setData={setFormValue('malayalam')}
          error=''
        />
      </div>
      <div className='flex w-full justify-end gap-x-2 p-2'>
        <Button
          label='ADD'
          onClick={onFormSubmit}
        />
        {showRemove && (
          <Button
            label='REMOVE'
            onClick={() => onSubmit(null)}
          />
        )}
      </div>
    </>
  )
}

export default TitleInput
