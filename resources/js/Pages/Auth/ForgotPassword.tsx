import { FormEvent } from 'react'
import { useForm } from '@inertiajs/react'
import Button from '../../ui/button/Button'
import PasswordResetLayout from './PasswordResetLayout'

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({ email: '' })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    post('/forgot-password')
  }

  return (
    <PasswordResetLayout title='Forgot password?'>
      <p className='mb-4 text-sm text-gray-600'>Enter your registered email address to receive a password reset link.</p>
      {status && <p role='status' className='mb-4 text-sm text-green-700'>{status}</p>}
      <form onSubmit={submit} className='flex flex-col gap-3'>
        <label htmlFor='email' className='text-sm text-gray-800'>Email address</label>
        <input id='email' name='email' type='email' autoComplete='email' required autoFocus
          value={data.email} onChange={(event) => setData('email', event.target.value)}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
          className='rounded-lg border-gray-300 text-sm' />
        {errors.email && <p id='email-error' role='alert' className='text-sm text-red-600'>{errors.email}</p>}
        <Button label='Send reset link' processing={processing} disabled={processing} />
      </form>
    </PasswordResetLayout>
  )
}
