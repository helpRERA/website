import React, { useState } from 'react'

export default function HomeTiles() {
  return (
    <div>
      <div className='flex w-full items-center justify-center py-12 px-4 md:px-6 lg:px-20'>
        {/* Desktop size Start */}
        <div className=' hidden items-center justify-center space-x-8 xl:flex'>
          {/* <div className='relative  cursor-pointer'>
            <img
              src='https://i.ibb.co/0DCTygf/banner-1-1.png'
              alt='coffee table'
            />
            <div className='absolute transition duration-200 top-0 opacity-20 bg-gradient-to-r from-gray-800 to-gray-500 w-full h-full' />
            <div className='absolute z-20 top-12 left-8 flex flex-col justify-start'>
              <div className='flex justify-start flex-col space-y-2.5'>
                <p className='text-base leading-none text-white'>Clearance</p>
                <p className='text-2xl font-semibold leading-normal text-white'>Coffee Tables</p>
                <p className='text-xl leading-tight text-white'>from $9.99</p>
              </div>
              <button className='hover:bg-gray-800 focus:bg-gray-900 mt-7 py-3 px-4 text-base font-medium leading-6 text-white flex jusitfy-center items-center space-x-4 border border-white'>
                <p>Shop Now</p>
                <svg
                  width={16}
                  height={16}
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M5.21967 2.96967C5.51256 2.67678 5.98744 2.67678 6.28033 2.96967L10.7803 7.46967C11.0732 7.76256 11.0732 8.23744 10.7803 8.53033L6.28033 13.0303C5.98744 13.3232 5.51256 13.3232 5.21967 13.0303C4.92678 12.7374 4.92678 12.2626 5.21967 11.9697L9.18934 8L5.21967 4.03033C4.92678 3.73744 4.92678 3.26256 5.21967 2.96967Z'
                    fill='white'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='relative  cursor-pointer'>
            <img
              src='https://i.ibb.co/TvJwBWy/banner-2-1.png'
              alt='chair'
            />
            <div className='absolute transition duration-200 top-0 opacity-20 bg-gradient-to-r from-gray-800 to-gray-500 w-full h-full' />
            <div className='absolute z-20 bottom-9 left-8 flex flex-col justify-start'>
              <div className='flex justify-start flex-col space-y-2.5'>
                <p className='text-base leading-none text-white'>On Sale</p>
                <p className='text-2xl w-20 font-semibold leading-normal text-white'>
                  Amazing Armchairs
                </p>
                <p className='text-xl leading-tight text-white'>from $9.99</p>
              </div>
              <button className='hover:bg-gray-800 focus:bg-gray-900 mt-7 py-3 px-4 text-base font-medium leading-6 text-white flex jusitfy-center items-center space-x-4 border border-white'>
                <p>Discover Now</p>
                <svg
                  width={16}
                  height={16}
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M5.21967 2.96967C5.51256 2.67678 5.98744 2.67678 6.28033 2.96967L10.7803 7.46967C11.0732 7.76256 11.0732 8.23744 10.7803 8.53033L6.28033 13.0303C5.98744 13.3232 5.51256 13.3232 5.21967 13.0303C4.92678 12.7374 4.92678 12.2626 5.21967 11.9697L9.18934 8L5.21967 4.03033C4.92678 3.73744 4.92678 3.26256 5.21967 2.96967Z'
                    fill='white'
                  />
                </svg>
              </button>
            </div>
          </div> */}
          <div className='space-x -8 flex flex-row'>
            <div className='relative  cursor-pointer'>
              <img
                src='https://i.ibb.co/4RpwV0w/Group-2582.png'
                alt='coffee table'
              />
              <div className='absolute top-0 h-full w-full bg-gradient-to-r from-gray-800 to-gray-500 opacity-20 transition duration-200' />
              <div className='absolute top-6 left-8 z-20 flex flex-col justify-start'>
                <div className='flex flex-col justify-start space-y-2'>
                  <p className='text-base leading-none text-white'>New Arrivals</p>
                  <p className='text-2xl font-semibold leading-normal text-white'>
                    Storage Boxes and Baskets
                  </p>
                </div>
                <button className='jusitfy-center mt-3 flex w-44 items-center space-x-4 border border-white py-3 px-4 text-base font-medium leading-6 text-white hover:bg-gray-800 focus:bg-gray-900'>
                  <p>Discover Now</p>
                  <svg
                    width={16}
                    height={16}
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.21967 2.96967C5.51256 2.67678 5.98744 2.67678 6.28033 2.96967L10.7803 7.46967C11.0732 7.76256 11.0732 8.23744 10.7803 8.53033L6.28033 13.0303C5.98744 13.3232 5.51256 13.3232 5.21967 13.0303C4.92678 12.7374 4.92678 12.2626 5.21967 11.9697L9.18934 8L5.21967 4.03033C4.92678 3.73744 4.92678 3.26256 5.21967 2.96967Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className='relative  cursor-pointer'>
              <img
                src='https://i.ibb.co/nC9p8JL/banner-4-1.png'
                alt='coffee table'
              />
              <div className='absolute top-0 h-full w-full bg-gradient-to-r from-gray-800 to-gray-500 opacity-20 transition duration-200' />
              <div className='absolute top-6 left-8 z-20 flex flex-col justify-start'>
                <div className='flex flex-col justify-start space-y-2'>
                  <p className='text-base leading-none text-white'>On Sale</p>
                  <p className='text-2xl font-semibold leading-4 text-white xl:leading-6'>
                    Lamps Offer
                  </p>
                  <p className='text-xl leading-tight text-white'>Upto 30% off</p>
                </div>
                <button className='jusitfy-center mt-3 flex w-36 items-center space-x-4 border border-white py-3 px-4 text-base font-medium leading-6 text-white hover:bg-gray-800 focus:bg-gray-900'>
                  <p>Shop Now</p>
                  <svg
                    width={16}
                    height={16}
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.21967 2.96967C5.51256 2.67678 5.98744 2.67678 6.28033 2.96967L10.7803 7.46967C11.0732 7.76256 11.0732 8.23744 10.7803 8.53033L6.28033 13.0303C5.98744 13.3232 5.51256 13.3232 5.21967 13.0303C4.92678 12.7374 4.92678 12.2626 5.21967 11.9697L9.18934 8L5.21967 4.03033C4.92678 3.73744 4.92678 3.26256 5.21967 2.96967Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className='relative  cursor-pointer'>
              <img
                src='https://i.ibb.co/nC9p8JL/banner-4-1.png'
                alt='coffee table'
              />
              <div className='absolute top-0 h-full w-full bg-gradient-to-r from-gray-800 to-gray-500 opacity-20 transition duration-200' />
              <div className='absolute top-6 left-8 z-20 flex flex-col justify-start'>
                <div className='flex flex-col justify-start space-y-2'>
                  <p className='text-base leading-none text-white'>On Sale</p>
                  <p className='text-2xl font-semibold leading-4 text-white xl:leading-6'>
                    Lamps Offer
                  </p>
                  <p className='text-xl leading-tight text-white'>Upto 30% off</p>
                </div>
                <button className='jusitfy-center mt-3 flex w-36 items-center space-x-4 border border-white py-3 px-4 text-base font-medium leading-6 text-white hover:bg-gray-800 focus:bg-gray-900'>
                  <p>Shop Now</p>
                  <svg
                    width={16}
                    height={16}
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.21967 2.96967C5.51256 2.67678 5.98744 2.67678 6.28033 2.96967L10.7803 7.46967C11.0732 7.76256 11.0732 8.23744 10.7803 8.53033L6.28033 13.0303C5.98744 13.3232 5.51256 13.3232 5.21967 13.0303C4.92678 12.7374 4.92678 12.2626 5.21967 11.9697L9.18934 8L5.21967 4.03033C4.92678 3.73744 4.92678 3.26256 5.21967 2.96967Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop size End */}

        {/* ipad and mobile Size Start */}
        <div className='grid w-full grid-cols-1 items-center justify-center  gap-4 md:grid-cols-2 xl:hidden'>
          <div className='flex flex-col space-y-4'>
            {/* <div className='relative  cursor-pointer'>
              <img
                className='md:object-cover w-full'
                src='https://i.ibb.co/QJ6hFxK/banner-1-1.png'
                alt='coffee table'
              />
              <div className='absolute transition duration-200 top-0 opacity-20 bg-gradient-to-r from-gray-800 to-gray-500 w-full h-full' />
              <div className='absolute z-20 top-12 left-6 lg:left-8 flex flex-col justify-start'>
                <div className='flex justify-start flex-col space-y-2.5'>
                  <p className='text-base leading-none text-white'>Clearance</p>
                  <p className='text-2xl font-semibold leading-normal text-white'>Coffee Tables</p>
                  <p className='text-xl leading-tight text-white'>from $9.99</p>
                </div>
                <button className='hover:bg-gray-800 focus:bg-gray-900 mt-7 py-3 px-4 text-base font-medium leading-6 text-white flex jusitfy-center items-center space-x-4 border border-white'>
                  <p>Shop Now</p>
                  <svg
                    width={16}
                    height={16}
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.21967 2.96967C5.51256 2.67678 5.98744 2.67678 6.28033 2.96967L10.7803 7.46967C11.0732 7.76256 11.0732 8.23744 10.7803 8.53033L6.28033 13.0303C5.98744 13.3232 5.51256 13.3232 5.21967 13.0303C4.92678 12.7374 4.92678 12.2626 5.21967 11.9697L9.18934 8L5.21967 4.03033C4.92678 3.73744 4.92678 3.26256 5.21967 2.96967Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </div> */}
            <div className='relative cursor-pointer'>
              <img
                className='h-48 w-full object-cover sm:h-72 md:h-80'
                src='https://i.ibb.co/tbB96Bw/Group-2582.png'
                alt='coffee table'
              />
              <div className='absolute top-0 h-full w-full bg-gradient-to-r from-gray-800 to-gray-500 opacity-20 transition duration-200' />
              <div className='absolute top-6 left-6 z-20 flex flex-col justify-start lg:left-8'>
                <div className='flex flex-col justify-start space-y-2'>
                  <p className='text-base leading-none text-white'>New Arrivals</p>
                  <p className='text-2xl font-semibold leading-normal text-white'>
                    Storage Boxes and Baskets
                  </p>
                </div>
                <button className='jusitfy-center mt-3 flex w-44 items-center space-x-4 border border-white py-3 px-4 text-base font-medium leading-6 text-white hover:bg-gray-800 focus:bg-gray-900'>
                  <p>Discover Now</p>
                  <svg
                    width={16}
                    height={16}
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.21967 2.96967C5.51256 2.67678 5.98744 2.67678 6.28033 2.96967L10.7803 7.46967C11.0732 7.76256 11.0732 8.23744 10.7803 8.53033L6.28033 13.0303C5.98744 13.3232 5.51256 13.3232 5.21967 13.0303C4.92678 12.7374 4.92678 12.2626 5.21967 11.9697L9.18934 8L5.21967 4.03033C4.92678 3.73744 4.92678 3.26256 5.21967 2.96967Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-4'>
            {/* <div className='relative group cursor-pointer'>
              <img
                className='md:object-cover w-full'
                src='https://i.ibb.co/ftqbs9b/Group-2580-1.png'
                alt='chair'
              />
              <div className='absolute transition duration-200 top-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-gray-800 to-gray-500 w-full h-full' />
              <div className='absolute z-20 bottom-9 left-6 lg:left-8 flex flex-col justify-start'>
                <div className='flex justify-start flex-col space-y-2.5'>
                  <p className='text-base leading-none text-white'>On Sale</p>
                  <p className='text-2xl font-semibold leading-normal text-white'>
                    Amazing Armchairs
                  </p>
                  <p className='text-xl leading-tight text-white'>from $9.99</p>
                </div>
                <button className='hover:bg-gray-800 focus:bg-gray-900 mt-7 py-3 px-4 text-base font-medium leading-6 text-white flex jusitfy-center items-center space-x-4 border border-white'>
                  <p>Discover Now</p>
                  <svg
                    width={16}
                    height={16}
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.21967 2.96967C5.51256 2.67678 5.98744 2.67678 6.28033 2.96967L10.7803 7.46967C11.0732 7.76256 11.0732 8.23744 10.7803 8.53033L6.28033 13.0303C5.98744 13.3232 5.51256 13.3232 5.21967 13.0303C4.92678 12.7374 4.92678 12.2626 5.21967 11.9697L9.18934 8L5.21967 4.03033C4.92678 3.73744 4.92678 3.26256 5.21967 2.96967Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </div> */}
            <div className='relative  cursor-pointer'>
              <img
                className='h-48 w-full object-cover sm:h-72 md:h-80'
                src='https://i.ibb.co/RBk9Zzf/banner-4-1-1.png'
                alt='coffee table'
              />
              <div className='absolute top-0 h-full w-full bg-gradient-to-r from-gray-800 to-gray-500 opacity-20 transition duration-200' />
              <div className='absolute top-6 left-6 z-20 flex flex-col justify-start lg:left-8'>
                <div className='flex flex-col justify-start space-y-2'>
                  <p className='text-base leading-none text-white'>On Sale</p>
                  <p className='text-2xl font-semibold leading-normal text-white'>Lamps Offer</p>
                  <p className='text-xl leading-tight text-white'>Upto 30% off</p>
                </div>
                <button className='jusitfy-center mt-3 flex w-44 items-center space-x-4 border border-white py-3 px-4 text-base font-medium leading-6 text-white hover:bg-gray-800 focus:bg-gray-900'>
                  <p>Shop Now</p>
                  <svg
                    width={16}
                    height={16}
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.21967 2.96967C5.51256 2.67678 5.98744 2.67678 6.28033 2.96967L10.7803 7.46967C11.0732 7.76256 11.0732 8.23744 10.7803 8.53033L6.28033 13.0303C5.98744 13.3232 5.51256 13.3232 5.21967 13.0303C4.92678 12.7374 4.92678 12.2626 5.21967 11.9697L9.18934 8L5.21967 4.03033C4.92678 3.73744 4.92678 3.26256 5.21967 2.96967Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className='relative  cursor-pointer'>
              <img
                className='h-48 w-full object-cover sm:h-72 md:h-80'
                src='https://i.ibb.co/RBk9Zzf/banner-4-1-1.png'
                alt='coffee table'
              />
              <div className='absolute top-0 h-full w-full bg-gradient-to-r from-gray-800 to-gray-500 opacity-20 transition duration-200' />
              <div className='absolute top-6 left-6 z-20 flex flex-col justify-start lg:left-8'>
                <div className='flex flex-col justify-start space-y-2'>
                  <p className='text-base leading-none text-white'>On Sale</p>
                  <p className='text-2xl font-semibold leading-normal text-white'>Lamps Offer</p>
                  <p className='text-xl leading-tight text-white'>Upto 30% off</p>
                </div>
                <button className='jusitfy-center mt-3 flex w-44 items-center space-x-4 border border-white py-3 px-4 text-base font-medium leading-6 text-white hover:bg-gray-800 focus:bg-gray-900'>
                  <p>Shop Now</p>
                  <svg
                    width={16}
                    height={16}
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.21967 2.96967C5.51256 2.67678 5.98744 2.67678 6.28033 2.96967L10.7803 7.46967C11.0732 7.76256 11.0732 8.23744 10.7803 8.53033L6.28033 13.0303C5.98744 13.3232 5.51256 13.3232 5.21967 13.0303C4.92678 12.7374 4.92678 12.2626 5.21967 11.9697L9.18934 8L5.21967 4.03033C4.92678 3.73744 4.92678 3.26256 5.21967 2.96967Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ipad and mobile Size end */}
      </div>
    </div>
  )
}
