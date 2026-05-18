import MetaTags from '../Components/Common/MetaTags'
import { Link } from '@inertiajs/react'

const Error = ({ status }: { status: string }) => {
  const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden',
    405: '405: Method Not Allowed',
  }[status]

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Sorry, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
    405: 'Sorry, you cant not make that request',
  }[status]

  const back = () => {
    window.history.back()
  }

  return (
    <>
      <MetaTags />
      <div className='bg-skin-fill-grey flex min-h-screen flex-col items-center justify-center gap-2'>
        <h1 className='text-skin-base text-2xl lg:text-4xl'>{title}</h1>
        <span className='text-skin-base text-base'>{description}</span>

        <div className='flex w-full flex-wrap justify-center gap-5'>
          <span
            onClick={back}
            className='text-underline cursor-pointer text-blue-500 hover:text-blue-400'
          >
            BACK
          </span>
          {status == '404' && (
            <Link
              as='a'
              href='/'
              className='text-underline cursor-pointer text-blue-500 hover:text-blue-400'
            >
              HOME
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Error
