import React, { useState } from 'react'
import CollapsableVideo from '../CollapsableVideos/CollapsableVideo'

const Grid2 = () => {
  const [bgColor, setBgColor] = useState('Latest')
  const [dropDown, setDropDown] = useState(false)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const [open5, setOpen5] = useState(false)
  const [open6, setOpen6] = useState(false)

  const navColor = (value) => {
    setBgColor(value)
  }

  const dropDownMenu = () => setDropDown(!dropDown)

  return (
    <div className=' py-3 lg:py-6 xl:py-10 xl:px-10 lg:px-6 px-3'>
      <div className='flex lg:flex-row  flex-col '>
        <div className=' 2xl:container 2xl:mx-auto lg:py-16 lg:px-10 md:py-12 md:px-6 py-12 px-4 w-full'>
          <div className='block sm:hidden w-full mt-8'>
            <div
              onClick={dropDownMenu}
              className='py-4 px-6 text-white bg-gray-800 flex justify-between items-center w-full'
            >
              <p
                id='textClicked'
                className='focus:outline-none hover:bg-gray-800 hover:text-white duration-100 cursor-pointer '
              >
                {bgColor}
              </p>
              <svg
                id='ArrowSVG'
                className={'transform ' + (dropDown ? 'rotate-180' : 'rotate-0')}
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 9L12 15L18 9'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <ul
              id='list'
              className={'font-normal text-base leading-4 ' + (dropDown ? 'block' : 'hidden')}
            >
              <li
                onClick={() => navColor('Latest')}
                className='py-5 px-6 text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-800 hover:text-white duration-100 cursor-pointer '
              >
                Latest
              </li>
              <li
                onClick={() => navColor('Orders')}
                className='py-5 px-6 text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-800 hover:text-white duration-100 cursor-pointer '
              >
                Orders
              </li>
              <li
                onClick={() => navColor('Returns')}
                className='py-5 px-6 text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-800 hover:text-white duration-100 cursor-pointer '
              >
                Circulars
              </li>
              <li
                onClick={() => navColor('Notices')}
                className='py-5 px-6 text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-800 hover:text-white duration-100 cursor-pointer '
              >
                Notices
              </li>
              <li
                onClick={() => navColor('News')}
                className='py-5 px-6 text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-800 hover:text-white duration-100 cursor-pointer '
              >
                News
              </li>
              <li
                onClick={() => navColor('Judegements & Rulings')}
                className='py-5 px-6 text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-800 hover:text-white duration-100 cursor-pointer '
              >
                Judegements & Rulings
              </li>
            </ul>
          </div>

          <ul className='hidden sm:flex flex-row lg:flex-wrap font-normal text-base leading-4 mt-8 '>
            <li
              onClick={() => navColor('Latest')}
              className={
                'py-5 lg:px-12 text-center sm:w-full lg:w-auto border border-gray-300 focus:outline-none hover:bg-primary-700 hover:text-white duration-100 cursor-pointer ' +
                (bgColor === 'Latest' ? 'bg-primary-900 text-white' : 'bg-white text-gray-600')
              }
            >
              Latest
            </li>
            <li
              onClick={() => navColor('Orders')}
              className={
                'py-5 lg:px-12 text-center sm:w-full lg:w-auto border border-gray-300 focus:outline-none hover:bg-primary-700 hover:text-white duration-100 cursor-pointer ' +
                (bgColor === 'Orders' ? 'bg-primary-900 text-white' : 'bg-white text-gray-600')
              }
            >
              Orders
            </li>
            <li
              onClick={() => navColor('Circulars')}
              className={
                'py-5 lg:px-12 text-center sm:w-full lg:w-auto border border-gray-300 focus:outline-none hover:bg-primary-700 hover:text-white duration-100 cursor-pointer ' +
                (bgColor === 'Circulars'
                  ? 'bg-primary-900 text-white'
                  : 'bg-white text-gray-600')
              }
            >
              Circulars
            </li>
            <li
              onClick={() => navColor('Notices')}
              className={
                'py-5 lg:px-12 text-center sm:w-full lg:w-auto border border-gray-300 focus:outline-none hover:bg-primary-700 hover:text-white duration-100 cursor-pointer ' +
                (bgColor === 'Notices' ? 'bg-primary-900 text-white' : 'bg-white text-gray-600')
              }
            >
              Notices
            </li>
            <li
              onClick={() => navColor('News')}
              className={
                'py-5 text-center lg:px-12 sm:w-full lg:w-auto border border-gray-300 focus:outline-none hover:bg-primary-700 hover:text-white duration-100 cursor-pointer ' +
                (bgColor === 'News' ? 'bg-primary-900 text-white' : 'bg-white text-gray-600')
              }
            >
              News
            </li>
            <li
              onClick={() => navColor('Judgements & Rulings')}
              className={
                'py-5 text-center lg:px-12 sm:w-full lg:w-auto border border-gray-300 focus:outline-none hover:bg-primary-700 hover:text-white duration-100 cursor-pointer ' +
                (bgColor === 'Judgements & Rulings'
                  ? 'bg-primary-900 text-white'
                  : 'bg-white text-gray-600')
              }
            >
              Judgements & Rulings
            </li>
          </ul>

          <div className='container mx-auto pt-16'>
            <div className='mb-12 xl:w-full w-11/12 mx-auto'>
              <h1 className='xl:text-5xl pt-4 xl:pt-0 text-gray-800 xl:text-left font-extrabold mb-4 text-3xl'>
                All Announcements
              </h1>
              {/* <p className='text-xl text-gray-600 xl:w-7/12 mx-auto xl:mx-0'>
                Blogging is to writing what extreme sports are to athletics: more free-form, more
                accident-prone, less formal, more alive. It is, in many ways, writing out loud.
              </p> */}
            </div>
            <div className='xl:flex lg:flex sm:flex-1 md:flex flex-wrap'>
              <div className='lg:w-5/12 xl:w-4/12 w-11/12 mx-auto xl:mx-0 md:w-5/12 flex sm:mx-auto mb-6 items-center '>
                <div className='h-32 w-2/5'>
                  <img
                    src='/imge/document.png'
                    className='h-full w-full object-cover overflow-hidden rounded'
                  />
                </div>
                <div className='w-3/5 pt-3 pb-3 pl-5 pr-5 '>
                  <p className='uppercase text-sm text-indigo-700 pb-2'>PUBLIC NOTICE</p>
                  <p className='text-base text-gray-800 pb-2'>
                    Kerala Real Estate Regulatory Authority(General) Regulations 2020 - Form No. 6
                    Amendment - Reg
                  </p>
                  <p className='text-xs text-gray-600'>January 30, 2023</p>
                </div>
              </div>
              <div className='lg:w-5/12 xl:w-4/12 w-11/12 mx-auto xl:mx-0 md:w-5/12 flex sm:mx-auto mb-6 items-center'>
                <div className='h-32 w-2/5'>
                  <img
                    src='/imge/document.png
'
                    className='h-full w-full object-cover overflow-hidden rounded'
                  />
                </div>
                <div className='w-3/5 pt-3 pb-3 pl-5 pr-5'>
                  <p className='uppercase text-sm text-indigo-700 pb-2'>ORDER</p>
                  <p className='text-base text-gray-800 pb-2'>
                    Invitation of quotation for Security Audit of K-RERA website - Last date
                    extended to 30/01/2023
                  </p>
                  <p className='text-xs text-gray-600'>January 4, 2023 </p>
                </div>
              </div>
              <div className='lg:w-5/12 xl:w-4/12 w-11/12 mx-auto xl:mx-0 md:w-5/12 flex sm:mx-auto mb-6 items-center'>
                <div className='h-32 w-2/5'>
                  <img
                    src='/imge/document.png'
                    className='h-full w-full object-cover overflow-hidden rounded'
                  />
                </div>
                <div className='w-3/5 pt-3 pb-3 pl-5 pr-5'>
                  <p className='uppercase text-sm text-indigo-700 pb-2'>PUBLIC NOTICE</p>
                  <p className='text-base text-gray-800 pb-2'>
                    List of Registered Projects who have not filed Form No. 5 for the financial year
                    2021-22
                  </p>
                  <p className='text-xs text-gray-600'>November 10, 2022 </p>
                </div>
              </div>
              <div className='lg:w-5/12 xl:w-4/12 w-11/12 mx-auto xl:mx-0 md:w-5/12 flex sm:mx-auto mb-6 items-center'>
                <div className='h-32 w-2/5'>
                  <img
                    src='/imge/document.png
'
                    className='h-full w-full object-cover overflow-hidden rounded'
                  />
                </div>
                <div className='w-3/5 pt-3 pb-3 pl-5 pr-5'>
                  <p className='uppercase text-sm text-indigo-700 pb-2'>PUBLIC NOTICE</p>
                  <p className='text-base text-gray-800 pb-2'>
                    Public Notice to Promoters of Real Estate Projects- Submission of Application
                    for Registration of Projects- Reg: Dated 03/08/2020
                  </p>
                  <p className='text-xs text-gray-600'>August 11, 2021</p>
                </div>
              </div>
              <div className='lg:w-5/12 xl:w-4/12 w-11/12 mx-auto xl:mx-0 md:w-5/12 flex sm:mx-auto mb-6 items-center'>
                <div className='h-32 w-2/5'>
                  <img
                    src='/imge/document.png'
                    className='h-full w-full object-cover overflow-hidden rounded'
                  />
                </div>
                <div className='w-3/5 pt-3 pb-3 pl-5 pr-5'>
                  <p className='uppercase text-sm text-indigo-700 pb-2'>PUBLIC NOTICE</p>
                  <p className='text-base text-gray-800 pb-2'>
                    Productivity is being able to do things that you were never able to do before.
                  </p>
                  <p className='text-xs text-gray-600'>October 19, 2022</p>
                </div>
              </div>
              <div className='lg:w-5/12 xl:w-4/12 w-11/12 mx-auto xl:mx-0 md:w-5/12 flex sm:mx-auto mb-6 items-center'>
                <div className='h-32 w-2/5'>
                  <img
                    src='/imge/document.png
'
                    className='h-full w-full object-cover overflow-hidden rounded'
                  />
                </div>
                <div className='w-3/5 pt-3 pb-3 pl-5 pr-5'>
                  <p className='uppercase text-sm text-indigo-700 pb-2'>PUBLIC NOTICE</p>
                  <p className='text-base text-gray-800 pb-2'>
                    Productivity is being able to do things that you were never able to do before.
                  </p>
                  <p className='text-xs text-gray-600'>May 13, 2019</p>
                </div>
              </div>
            </div>
            <a
              href='javascript:void(0)'
              className='focus:outline-none focus:text-indigo-600 hover:text-indigo-600'
            >
              <div className='mt-14 flex items-right justify-end'>
                <button className='flex items-center justify-center mt-7 md:text-sm md:text-lg text-sm rounded f-m-m font-semibold text-indigo-700 focus:outline-none xl:leading-4 hover:underline hover:text-indigo-800'>
                  See More
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M9 5l7 7-7 7'
                    ></path>
                  </svg>
                </button>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Grid2
