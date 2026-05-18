import { FormEvent, useState } from 'react'
import { BlockConfiguration } from '../DefaultBlockData'
import { Language } from '../../../ui/ui_interfaces'
import EditLabel from '../../../ui/button/EditLabel'
import { TextData } from '../../../DataStructures/ui_builder_interfaces'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'
import Localization, { displayText } from '../../../ui/Localization'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import { localization } from '../../../Localization/localization'
import useCustomForm from '../../../hooks/useCustomForm'
import use419Error from '../../../hooks/use419Error'
import { router } from '@inertiajs/react'
import Button from '../../../ui/button/Button'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: ContactUsBlockInterface
  language?: Language
}

export interface ContactUsBlockInterface extends BlockConfiguration {
  lineOne?: TextData
  lineTwo?: TextData
  phone?: TextData
  email?: TextData
  title?: TextData
  titleOne?: TextData
  titleTwo?: TextData
}

const ContactUS = ({ editMode = false, onFieldEdit, blockData, language = 'en' }: Properties) => {
  const [processing, setProcessing] = useState(false)
  const { form, setFormValue } = useCustomForm({
    name: '',
    email: '',
    message: '',
  })

  use419Error()

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProcessing(true)
    router.post('/contact-us', form, {
      onFinish: () => setProcessing(false),
    })
  }

  return (
    <AppLayoutPadding>
      <div
        className={`relative flex flex-col items-start justify-start py-12 ${blockData?.marginTop} ${blockData?.marginBottom}
          ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
      >
        <img
          className='absolute bottom-0 z-0 w-full object-cover'
          src='/contact.png'
          alt='background'
        />
        <form
          onSubmit={submitForm}
          className='relative z-10 flex w-full flex-col items-start justify-start px-4 md:px-6 lg:w-3/4 xl:px-20'
        >
          <h1 className='mt-10 text-xl leading-5 text-gray-800 md:mt-12 xl:mt-14 xl:text-2xl xl:leading-normal'>
            <Localization
              text={blockData?.titleTwo}
              language={language}
            />
            {editMode && onFieldEdit != null && (
              <EditLabel
                onClick={() =>
                  onFieldEdit({
                    action: 'INSERT',
                    field: 'titleTwo',
                    fieldType: 'text',
                    oldValue: blockData?.titleTwo,
                  })
                }
              />
            )}
          </h1>
          <div className='mt-6 flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:mt-8 xl:space-y-8'>
            <div className='jusitfy-start flex w-full items-start space-x-4 md:space-x-6 xl:space-x-8'>
              <input
                type='text'
                name=''
                className='flex  h-11 w-full  items-center justify-start border border-gray-300 px-4 text-base leading-4 text-gray-800 placeholder-gray-400 focus:outline-none md:h-12 md:px-5 md:text-lg xl:h-14 xl:px-6 xl:text-xl xl:leading-5'
                id=''
                placeholder='Name'
                value={form.name}
                onChange={(event) => setFormValue('name')(event.target.value)}
                required
              />
              <input
                type='email'
                name=''
                className='flex  h-11 w-full items-center justify-start border border-gray-300 px-4 text-base leading-4 text-gray-800 placeholder-gray-400 focus:outline-none md:h-12 md:px-5 md:text-lg xl:h-14 xl:px-6 xl:text-xl xl:leading-5'
                id=''
                placeholder='Email'
                value={form.email}
                onChange={(event) => setFormValue('email')(event.target.value)}
                required
              />
            </div>
            <div className='w-full'>
              <textarea
                name=''
                className='flex w-full resize-none items-start justify-start border border-gray-300  p-3 pb-32  text-base leading-4 text-gray-800 placeholder-gray-400 focus:outline-none md:px-5  md:pb-36 md:pt-5 md:text-lg xl:px-6 xl:pb-48 xl:pt-6 xl:text-xl xl:leading-5'
                id=''
                placeholder='Message'
                value={form.message}
                onChange={(event) => setFormValue('message')(event.target.value)}
                required
              />
            </div>
          </div>
          <div className='my-3'>
            <Button
              label={displayText(localization['submit'], language) ?? ''}
              processing={processing}
            />
          </div>
        </form>
      </div>
    </AppLayoutPadding>
  )
}

export default ContactUS
