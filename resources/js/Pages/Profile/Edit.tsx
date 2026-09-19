import { FormEvent } from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import Button from '../../ui/button/Button'

export default function Edit() {
  const { auth } = usePage().props as unknown as {
    auth: { user: { name: string; email: string } }
  }
  const { data, setData, put, processing, errors, reset, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    put('/password', {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: () => reset(),
    })
  }

  return (
    <PaddedDashboardContent>
      <Head title='Profile' />
      <div className='mx-auto w-full max-w-3xl space-y-6'>
        <h1 className='text-2xl font-semibold text-[#085484]'>Profile</h1>
        <section className='rounded-xl bg-white p-6 shadow-sm'>
          <h2 className='mb-5 text-lg font-semibold text-gray-900'>Account details</h2>
          <dl className='space-y-4'>
            <div><dt className='text-sm text-gray-500'>Name</dt><dd className='mt-1 break-words text-gray-900'>{auth.user.name}</dd></div>
            <div><dt className='text-sm text-gray-500'>Email address</dt><dd className='mt-1 break-words text-gray-900'>{auth.user.email}</dd></div>
          </dl>
        </section>
        <section className='rounded-xl bg-white p-6 shadow-sm'>
          <h2 className='text-lg font-semibold text-gray-900'>Reset password</h2>
          <p className='mt-2 mb-5 text-sm text-gray-600'>Enter your current password and choose a new password.</p>
          <form onSubmit={submit} className='space-y-4'>
            {([
              ['current_password', 'Current password', 'current-password'],
              ['password', 'New password', 'new-password'],
              ['password_confirmation', 'Confirm new password', 'new-password'],
            ] as const).map(([field, label, autoComplete]) => (
              <div key={field} className='flex flex-col gap-2'>
                <label htmlFor={field} className='text-sm text-gray-800'>{label}</label>
                <input id={field} name={field} type='password' autoComplete={autoComplete}
                  required disabled={processing} value={data[field]}
                  onChange={(event) => setData(field, event.target.value)}
                  aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `${field}-error` : undefined}
                  className='rounded-lg border-gray-300 text-sm disabled:bg-gray-100' />
                {errors[field] && <p id={`${field}-error`} role='alert' className='text-sm text-red-600'>{errors[field]}</p>}
              </div>
            ))}
            <Button label='Reset password' processing={processing} disabled={processing} />
            {recentlySuccessful && <p role='status' className='text-sm text-green-700'>Your password has been updated.</p>}
          </form>
        </section>
      </div>
    </PaddedDashboardContent>
  )
}
