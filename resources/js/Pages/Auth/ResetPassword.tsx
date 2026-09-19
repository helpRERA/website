import { FormEvent } from 'react'
import { Link, useForm } from '@inertiajs/react'
import Button from '../../ui/button/Button'
import PasswordResetLayout from './PasswordResetLayout'

export default function ResetPassword({ token, email }: { token: string; email?: string }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email: email ?? '',
    password: '',
    password_confirmation: '',
  })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    post('/reset-password', { onFinish: () => reset('password', 'password_confirmation') })
  }

  return (
    <PasswordResetLayout title='Reset password'>
      <form onSubmit={submit} className='flex flex-col gap-3'>
        {errors.token && <p role='alert' className='text-sm text-red-600'>{errors.token}</p>}
        <label htmlFor='email' className='text-sm text-gray-800'>Email address</label>
        <input id='email' name='email' type='email' autoComplete='email' required
          value={data.email} onChange={(event) => setData('email', event.target.value)}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
          className='rounded-lg border-gray-300 text-sm' />
        {errors.email && <p id='email-error' role='alert' className='text-sm text-red-600'>{errors.email}</p>}
        <label htmlFor='password' className='text-sm text-gray-800'>New password</label>
        <input id='password' name='password' type='password' autoComplete='new-password' required
          value={data.password} onChange={(event) => setData('password', event.target.value)}
          aria-invalid={!!errors.password} aria-describedby={errors.password ? 'password-error' : undefined}
          className='rounded-lg border-gray-300 text-sm' />
        {errors.password && <p id='password-error' role='alert' className='text-sm text-red-600'>{errors.password}</p>}
        <label htmlFor='password_confirmation' className='text-sm text-gray-800'>Confirm new password</label>
        <input id='password_confirmation' name='password_confirmation' type='password' autoComplete='new-password' required
          value={data.password_confirmation} onChange={(event) => setData('password_confirmation', event.target.value)}
          aria-invalid={!!errors.password_confirmation}
          className='rounded-lg border-gray-300 text-sm' />
        {errors.password_confirmation && <p role='alert' className='text-sm text-red-600'>{errors.password_confirmation}</p>}
        <Button label='Reset password' processing={processing} disabled={processing} />
      </form>
      <Link href='/forgot-password' className='mt-4 block text-sm text-[#085484] underline'>Request a new reset link</Link>
    </PasswordResetLayout>
  )
}
