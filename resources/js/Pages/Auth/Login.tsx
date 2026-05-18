import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import Input from '../../ui/form/Input'
import Button from '../../ui/button/Button'
import ApplicationLogo from '../../Components/Common/ApplicationLogo'

interface Properties {
  status: string
}

export default function Login({ status }: Properties) {
  const { data, setData, post, processing, errors } = useForm<{
    email: string
    password: string
    remember: boolean
  }>({
    email: '',
    password: '',
    remember: false,
  })

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    post('/login')
  }

  return (
    <div className='flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 min-h-screen'>
      <Head title='Log in' />
      <div className='flex justify-center py-5'>
        <Link href='/'>
          <ApplicationLogo className='w-full h-20' />
        </Link>
      </div>
      <div className='w-11/12 flex justify-center'>
        <div className='w-full sm:w-10/12 lg:w-1/3 px-6 py-4 bg-white shadow-md sm:rounded-lg'>
          {status && <div className='mb-4 font-medium text-sm text-green-600'>{status}</div>}
          <form onSubmit={submit}>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col'>
                <Input
                  label='Email'
                  data={data.email}
                  setData={(e) => setData('email', e)}
                  error={errors.email}
                />
              </div>
              <div className='flex flex-col'>
                <Input
                  label='Password'
                  data={data.password}
                  setData={(e) => setData('password', e)}
                  error={errors.password}
                  password
                />
              </div>
              <div className='flex items-center justify-end mt-4'>
                <Button
                  processing={processing}
                  label='LOGIN'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
