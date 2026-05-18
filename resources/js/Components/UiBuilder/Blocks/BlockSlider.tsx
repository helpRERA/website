import React, { useRef, useState } from 'react'
// eslint-disable-next-line
import 'swiper/css/bundle'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper'

// install Swiper modules
SwiperCore.use([Navigation])

export default function BlockSlider() {
  return (
    <div>
      <div className='py-12 flex lg:flex-row flex-col items-start lg:items-center justify-between '>
        <div className='mx-4 md:w-2/3 lg:w-auto md:mx-6 xl:ml-20  flex flex-col justify-start items-start'>
          <h1 className='text-xl md:text-2xl xl:text-4xl font-semibold leading-6 xl:leading-10'>
            A platform built with you in <span className='text-blue-700'>mind</span>.
          </h1>
          <p className='mt-4 text-base leading-normal text-gray-600'>
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout.{' '}
          </p>
          <button className='w-full md:w-auto text-center mt-6 bg-blue-700 hover:-translate-y-1 ease-in-out transition duration-300 rounded'>
            <p className='text-base py-4 px-6 font-medium leading-none text-white'>
              Find your industry
            </p>
          </button>
        </div>
        <div className='mainDiv pl-4 md:pl-6 '>
          <div className='h-5 mt-6 mb-4 md:mt-0 lg:mb-0 flex justify-end items-end space-x-6 '>
            <button
              aria-label='back'
              className=' swiper-button-prev'
            >
              <img
                src='https://tuk-cdn.s3.amazonaws.com/can-uploader/content_9_svg1.svg'
                alt='back'
              />
            </button>
            <button
              aria-label='next'
              className=' swiper-button-next'
            >
              <img
                className=' transform rotate-180'
                src='https://tuk-cdn.s3.amazonaws.com/can-uploader/content_9_svg1.svg'
                alt='next'
              />
            </button>
          </div>
          <Swiper
            slidesPerView={'auto'}
            slidesPerGroupSkip={3}
            grabCursor={true}
            loopFillGroupWithBlank={true}
            loop={true}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            breakpoints={{
              // when window width is >= 320px
              '320': {
                slidesPerView: 'auto',
                spaceBetween: 24,
              },
              // when window width is >= 480px
              '480': {
                slidesPerView: 'auto',
                spaceBetween: 24,
              },
              // when window width is >= 640px
              '640': {
                slidesPerView: 'auto',
                spaceBetween: 24,
              },
              '1024': {
                slidesPerView: 'auto',
                spaceBetween: 32,
              },
              '1336': {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className='swiper mySwiper'
          >
            <SwiperSlide className='swiper-slide shadow-xl mb-10 mt-5  rounded-xl '>
              <div className='flex flex-col  space-y-4'>
                <div className='rounded-t-xl  group cursor-pointer relative flex justify-center items-center'>
                  <img
                    className='rounded-t-xl  '
                    src='https://tuk-cdn.s3.amazonaws.com/can-uploader/content_9_img-1.png'
                    alt='man'
                  />
                </div>
                <div className='px-4 py-6 rounded-b-xl w-full flex justify-between  flex-col items-start '>
                  <p className='text-sm leading-none text-gray-600'>Why we are perfect for </p>
                  <p className='mt-3 text-base font-semibold leading-none text-gray-800'>
                    Music Producers
                  </p>
                  <button className='mt-6 hover:-translate-y-1 transition duration-500 ease-in-out flex justify-start items-center space-x-3'>
                    <p className='text-sm leading-none text-blue-700'>Find out why</p>
                    <div className='w-4 '>
                      <img
                        src='https://tuk-cdn.s3.amazonaws.com/can-uploader/content_9_svg-2.svg'
                        alt='arrow'
                      />
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='swiper-slide shadow-xl mb-10 mt-5 rounded-xl '>
              <div className='flex flex-col  space-y-4'>
                <div className='rounded-t-xl  group cursor-pointer relative flex justify-center items-center'>
                  <img
                    className='rounded-t-xl  '
                    src='https://tuk-cdn.s3.amazonaws.com/can-uploader/content_9_img-2.png'
                    alt='chinease man'
                  />
                </div>
                <div className='px-4 py-6 rounded-b-xl w-full flex justify-between  flex-col items-start '>
                  <p className='text-sm leading-none text-gray-600'>Why we are perfect for </p>
                  <p className='mt-3 text-base font-semibold leading-none text-gray-800'>
                    Launch Strategists
                  </p>
                  <button className='mt-6 hover:-translate-y-1 transition duration-500 ease-in-out flex justify-start items-center space-x-3'>
                    <p className='text-sm leading-none text-blue-700'>Find out why</p>
                    <div className='w-4 '>
                      <img
                        src='https://tuk-cdn.s3.amazonaws.com/can-uploader/content_9_svg-2.svg'
                        alt='arrow'
                      />
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='swiper-slide shadow-xl mb-10 mt-5  rounded-xl '>
              <div className='flex flex-col  space-y-4'>
                <div className='rounded-t-xl  group cursor-pointer relative flex justify-center items-center'>
                  <img
                    className='rounded-t-xl  '
                    src='https://tuk-cdn.s3.amazonaws.com/can-uploader/content_9_img-3.png'
                    alt='woman with camera'
                  />
                </div>
                <div className='px-4 py-6 rounded-b-xl w-full flex justify-between  flex-col items-start '>
                  <p className='text-sm leading-none text-gray-600'>Why we are perfect for </p>
                  <p className='mt-3 text-base font-semibold leading-none text-gray-800'>
                    Photographers
                  </p>
                  <button className='mt-6 hover:-translate-y-1 transition duration-500 ease-in-out flex justify-start items-center space-x-3'>
                    <p className='text-sm leading-none text-blue-700'>Find out why</p>
                    <div className='w-4 '>
                      <img
                        src='https://tuk-cdn.s3.amazonaws.com/can-uploader/content_9_svg-2.svg'
                        alt='arrow'
                      />
                    </div>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <style>
        {`
.mainDiv {
position: relative;
width: 100%
}

.swiper-button-next::after,
.swiper-button-prev::after {
    content: "";
}

.swiper-wrapper{
    display: flex;
    align-items: center;
}

.swiper-button-next,
.swiper-button-prev {
    position: relative;
    height: 24px;
    width: 24px;
}

.swiper {

    height: 100%;
}
.swiper-slide:nth-child(n) {
width: 70%;
}

.swiper-slide:nth-child(2n) {
width: 70%;
}

@media (min-width: 768px) {

.swiper-slide:nth-child(n) {
width: 35%;
}

.swiper-slide:nth-child(2n) {
width: 35%;
}
}
@media (min-width: 1024px) {
.mainDiv {
position: relative;
height: 100%;
padding: 20px;
width: 70%
}

.swiper-button-next,
.swiper-button-prev {
    position: relative;
    height: 32px;
    width: 32px;
}
.swiper-slide:nth-child(n) {
width: 40%;
}

.swiper-slide:nth-child(2n) {
width: 40%;
}
.swiper-slide:nth-child(3n) {
width: 40%;
}
}

@media (min-width: 1536px) {
.mainDiv {
position: relative;
height: 100%;
padding: 40px;
width: 75%
}

.swiper-button-next,
.swiper-button-prev {
    height: 40px;
    width: 40px;
}

.swiper-slide:nth-child(n) {
width: 30%;
}

.swiper-slide:nth-child(2n) {
width: 30%;
}
.swiper-slide:nth-child(3n) {
width: 30%;
}
.swiper-slide:nth-child(4n) {
width: 30%;
}
}

.swiper-slide {

    text-align: center;
    font-size: 18px;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.swiper-slide img {

    width: 660px;
    object-fit: cover;
}


`}
      </style>
    </div>
  )
}
