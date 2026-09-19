import { ReactNode } from 'react'
import { Head, Link } from '@inertiajs/react'
import ApplicationLogo from '../../Components/Common/ApplicationLogo'

export default function PasswordResetLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 py-6'>
      <Head title={title} />
      <Link href='/' className='mb-6'>
        <ApplicationLogo className='h-20 w-full' />
      </Link>
      <div className='w-11/12 max-w-md rounded-lg bg-white p-6 shadow-md'>
        <h1 className='mb-4 text-2xl font-semibold text-[#085484]'>{title}</h1>
        {children}
        <Link href='/login' className='mt-6 inline-block text-sm text-[#085484] underline'>Back to login</Link>
      </div>
    </div>
  )
}
