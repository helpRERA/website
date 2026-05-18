import { Link } from '@inertiajs/react'
import { Method } from '@inertiajs/core'

const DashboardSidebarLinks = () => {
  return (
    <div className='w-full'>
      <div className='border-gray-300'>
        <div className='flex w-full items-center justify-between'>
          <a
            className='flex w-full cursor-pointer items-center p-2 text-white hover:bg-gray-700'
            href='/inaugurate'
          >
            <span className='ml-2 text-sm'>Inaugurate</span>
          </a>
        </div>
        <div className='flex w-full items-center justify-between'>
          <Link
            as='a'
            className='flex w-full cursor-pointer items-center p-2 text-white hover:bg-gray-700'
            href='/page-builder'
          >
            <span className='ml-2 text-sm'>Page Builder</span>
          </Link>
        </div>
        <div className='flex w-full items-center justify-between'>
          <Link
            as='a'
            className='flex w-full cursor-pointer items-center p-2 text-white hover:bg-gray-700'
            href='/footer-editor'
          >
            <span className='ml-2 text-sm'>Footer Editor</span>
          </Link>
        </div>
        <div className='flex w-full items-center justify-between'>
          <Link
            as='a'
            className='flex w-full cursor-pointer items-center p-2 text-white hover:bg-gray-700'
            href='/nav-editor'
          >
            <span className='ml-2 text-sm'>Nav Editor</span>
          </Link>
        </div>
        <div className='flex w-full items-center justify-between'>
          <Link
            as='a'
            className='flex w-full cursor-pointer items-center p-2 text-white hover:bg-gray-700'
            href='/manage-announcements'
          >
            <span className='ml-2 text-sm'>Announcements</span>
          </Link>
        </div>
        <div className='flex w-full items-center justify-between'>
          <Link
            as='a'
            className='flex w-full cursor-pointer items-center p-2
              text-white hover:bg-gray-700'
            href='/manage-gallery'
          >
            <span className='ml-2 text-sm'>Gallery</span>
          </Link>
        </div>
        <div className='flex w-full items-center justify-between'>
          <Link
            as='a'
            className='flex w-full cursor-pointer items-center p-2
              text-white hover:bg-gray-700'
            href='/manage-video'
          >
            <span className='ml-2 text-sm'>Videos</span>
          </Link>
        </div>
        <div className='flex w-full items-center justify-between'>
          <Link
            as='a'
            className='flex w-full cursor-pointer items-center p-2 text-white hover:bg-gray-700'
            href='/reference-data'
          >
            <span className='ml-2 text-sm'>Reference Data</span>
          </Link>
        </div>
        <div className='flex w-full items-center justify-between'>
          <Link
            as='a'
            className='flex w-full cursor-pointer items-center p-2 text-white hover:bg-gray-700'
            href='/manage-documents'
          >
            <span className='ml-2 text-sm'>Manage Documents</span>
          </Link>
        </div>
        <div className='flex w-full items-center justify-between'>
          <Link
            as='a'
            className='flex w-full cursor-pointer items-center p-2 text-white hover:bg-gray-700'
            href='/manage-images'
          >
            <span className='ml-2 text-sm'>Manage Images</span>
          </Link>
        </div>
        <div className='flex w-full items-center justify-between'>
          <Link
            as='button'
            method={Method.POST}
            className='flex w-full cursor-pointer items-center p-2 text-white hover:bg-gray-700'
            href='/logout'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-logout'
              width={20}
              height={20}
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path
                stroke='none'
                d='M0 0h24v24H0z'
              />
              <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
              <path d='M7 12h14l-3 -3m0 6l3 -3' />
            </svg>
            <span className='ml-2 text-sm'>Sign out</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebarLinks
