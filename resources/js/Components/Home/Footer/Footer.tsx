import React from 'react'
import InertiaLink from '../../../ui/Link/InertiaLink'
import HomeVerifyProject from '../../UiBuilder/Blocks/HomeVerifyProject'

const Footer = () => {
  return (
    <>
      <HomeVerifyProject />
      <footer aria-label='Site Footer' className='bg-white font-sans border-t border-gray-100'>
        <div className='cmpad py-8 md:py-10'>
          <div className='grid grid-cols-2 gap-x-4 gap-y-8 md:gap-8 lg:grid-cols-12'>
            {/* Column 1: Logo and Address */}
            <div className='col-span-2 flex flex-col gap-4 lg:col-span-4'>
              <div className='w-full max-w-[200px]'>
                <img
                  className='h-auto w-full object-contain'
                  src={'/imge/logo.png'}
                  alt='K-RERA Logo'
                />
              </div>
              <div className='text-[#444444] text-[14px] md:text-[15px] leading-relaxed'>
                <p>6th Floor, Trinity Centre, TC No.</p>
                <p>14/4354, Kesavadasapuram, Pattom P.O,</p>
                <p>Thiruvananthapuram -695004</p>
              </div>
              
              <div className='flex flex-wrap items-center gap-3 mt-1'>
                <span className='text-[#444] text-[15px] shrink-0'>Let's Connect:</span>
                <ul className='flex gap-2.5'>
                  {/* Facebook */}
                  <li>
                    <a href='#' className='bg-[#085484] text-white w-[26px] h-[26px] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity'>
                      <span className='sr-only'>Facebook</span>
                      <svg className='h-[13px] w-[13px]' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                        <path fillRule='evenodd' d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' clipRule='evenodd' />
                      </svg>
                    </a>
                  </li>
                  {/* Twitter */}
                  <li>
                    <a href='#' className='bg-[#085484] text-white w-[26px] h-[26px] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity'>
                      <span className='sr-only'>Twitter</span>
                      <svg className='h-[13px] w-[13px]' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                        <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                      </svg>
                    </a>
                  </li>
                  {/* Instagram */}
                  <li>
                    <a href='#' className='bg-[#085484] text-white w-[26px] h-[26px] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity'>
                      <span className='sr-only'>Instagram</span>
                      <svg className='h-[13px] w-[13px]' viewBox='0 0 24 24' fill='currentColor'>
                         <path fillRule='evenodd' d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' clipRule='evenodd' />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className='col-span-1 lg:col-span-2'>
              <p className='font-medium text-[#085484] mb-3 md:mb-4 text-[15px] md:text-[16px]'>
                Quick Links
              </p>
              <ul className='space-y-2.5 text-[14px] md:text-[15px] text-[#555]'>
                <li><a href="#" className="hover:text-[#085484] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Public Corner</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Legal Corner</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Promoter Corner</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Agent Corner</a></li>
              </ul>
            </div>

            {/* Column 3: Quick Links pt 2 */}
            <div className='col-span-1 pt-[28px] md:pt-[36px] lg:col-span-2 lg:pt-[40px]'>
              <ul className='space-y-2.5 text-[14px] md:text-[15px] text-[#555]'>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Appeleate Tribunal</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Notifications</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Announcements</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 4: Other Links */}
            <div className='col-span-1 lg:col-span-2'>
              <p className='font-medium text-[#085484] mb-3 md:mb-4 text-[15px] md:text-[16px]'>
                Other Links
              </p>
              <ul className='space-y-2.5 text-[14px] md:text-[15px] text-[#555]'>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Disclaimer</a></li>
                <li><a href="#" className="hover:text-[#085484] transition-colors">Help and Support</a></li>
              </ul>
            </div>

            {/* Column 5: Contact Us */}
            <div className='col-span-2 sm:col-span-1 lg:col-span-2 mt-4 sm:mt-0'>
              <p className='font-medium text-[#085484] mb-3 md:mb-4 text-[15px] md:text-[16px]'>
                Contact Us
              </p>
              <ul className='space-y-2.5 text-[14px] md:text-[15px] text-[#555]'>
                <li className='flex items-center gap-2.5'>
                  <div className='text-[#085484]'>
                    <svg className='w-[15px] h-[15px] text-[#085484]' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z' />
                    </svg>
                  </div>
                  <a href="tel:9497680600" className="hover:text-[#085484] transition-colors">9497680600</a>
                </li>
                <li className='flex items-center gap-2.5'>
                  <div className='text-[#085484]'>
                    <svg className='w-[15px] h-[15px] text-[#085484]' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
                    </svg>
                  </div>
                  <a href="tel:0471-3501012" className="hover:text-[#085484] transition-colors">0471-3501012</a>
                </li>
                <li className='flex items-center gap-2.5'>
                  <div className='text-[#085484]'>
                    <svg className='w-[15px] h-[15px] text-[#085484]' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
                    </svg>
                  </div>
                  <a href="tel:0471-3501013" className="hover:text-[#085484] transition-colors">0471-3501013</a>
                </li>
                <li className='flex items-center gap-2.5'>
                  <div className='text-[#085484]'>
                    <svg className='w-[15px] h-[15px] text-[#085484]' fill='currentColor' viewBox='0 0 24 24'>
                       <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
                    </svg>
                  </div>
                  <a href="mailto:info.rerakerala@gmail.com" className="hover:text-[#085484] transition-colors break-all">info.rerakerala@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className='mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-[14px] text-[#666]'>
            <p>&#169; {new Date().getFullYear()} Kerala Real Estate Regulatory Authority. All Rights Reserved</p>
            <p>Powered by SRV Infotech</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
