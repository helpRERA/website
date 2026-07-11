import React from 'react'
import { Language } from '../../../ui/ui_interfaces'

interface Properties {
  registeredProjects?: number
  registeredAgents?: number
  complaintsCount?: number
  promotersCount?: number
  language?: Language
}

const AboutUs = ({
  registeredProjects = 1591,
  registeredAgents = 1008,
  complaintsCount = 2294,
  promotersCount = 647,
  language = 'en',
}: Properties) => {
  return (
    <div className='cmpad pt-10 lg:pt-16 pb-12 w-full bg-white font-sans'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-20 pt-6'>

        {/* 1. Top Left: Heading Section */}
        <div className='flex flex-col'>
          {/* Subheading */}
          <div className='flex items-center gap-3 mb-4'>
            <span className='text-gray-400 font-medium text-sm'>||</span>
            <span className='text-[11px] font-semibold tracking-[0.2em] text-gray-500 uppercase'>
              About Us
            </span>
          </div>

          {/* Heading */}
          <h2 className='tracking-tight font-urbanist'>
            <div className='text-[#085484] font-semibold text-[45px] leading-[1.2]'>Helping you make safer &amp;</div>
            <div className='text-[#444444] font-normal text-[45px] leading-[1.2]'>smarter property decisions.</div>
          </h2>
        </div>

        {/* 2. Top Right: Text & Button */}
        <div className='flex flex-col pt-1 lg:pt-3'>
          <p className='text-[#595959] font-normal text-[15px] leading-[1.85] mb-5 max-w-[480px]'>
            K-RERA provides verified information on real estate projects and agents in Kerala, making it easier for homebuyers to check project details, track progress, and raise complaints when needed. It promotes transparency and accountability across the real estate ecosystem.
          </p>
          <div>
            <a href='#' className='inline-flex items-center gap-3 bg-[#095b8d] text-white rounded-full py-[10px] pl-6 pr-2 hover:bg-[#064268] transition-colors'>
              <span className='text-[13px] font-medium'>Read More</span>
              <div className='bg-white text-[#095b8d] rounded-full p-1.5'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* 3. Bottom Left: Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4'>
          {/* Stat 1 */}
          <div className='bg-white rounded-[20px] shadow-[0px_4px_24px_0px_#00000014] p-4 lg:p-5 flex flex-col justify-center border border-[#EEEEEE]'>
            <div className='mb-3'>
              <img src="/svg/project.svg" alt="Projects" className="w-7 h-7" />
            </div>
            <div className='text-[32px] leading-tight font-medium text-[#1B1B1B] mb-1'>{registeredProjects}</div>
            <div className='text-[16px] font-medium text-[#595959]'>Registered Projects</div>
          </div>

          {/* Stat 2 */}
          <div className='bg-white rounded-[20px] shadow-[0px_4px_24px_0px_#00000014] p-4 lg:p-5 flex flex-col justify-center border border-[#EEEEEE]'>
            <div className='mb-3'>
              <img src="/svg/doc.svg" alt="Complaints" className="w-7 h-7" />
            </div>
            <div className='text-[32px] leading-tight font-medium text-[#1B1B1B] mb-1'>{complaintsCount}</div>
            <div className='text-[16px] font-medium text-[#595959]'>Complaints Filed</div>
          </div>

          {/* Stat 3 */}
          <div className='bg-white rounded-[20px] shadow-[0px_4px_24px_0px_#00000014] p-4 lg:p-5 flex flex-col justify-center border border-[#EEEEEE]'>
            <div className='mb-3'>
              <img src="/svg/agent.svg" alt="Agents" className="w-7 h-7" />
            </div>
            <div className='text-[32px] leading-tight font-medium text-[#1B1B1B] mb-1'>{registeredAgents}</div>
            <div className='text-[16px] font-medium text-[#595959]'>Registered Agents</div>
          </div>

          {/* Stat 4 */}
          <div className='bg-white rounded-[20px] shadow-[0px_4px_24px_0px_#00000014] p-4 lg:p-5 flex flex-col justify-center border border-[#EEEEEE]'>
            <div className='mb-3'>
              <img src="/svg/promoter.svg" alt="Promoters" className="w-7 h-7" />
            </div>
            <div className='text-[32px] leading-tight font-medium text-[#1B1B1B] mb-1'>{promotersCount}</div>
            <div className='text-[16px] font-medium text-[#595959]'>Registered Promoters</div>
          </div>
        </div>

        {/* 4. Bottom Right: Image */}
        <div className='w-full relative h-full rounded-tr-xl rounded-br-xl rounded-bl-xl rounded-tl-[80px] overflow-hidden shadow-sm border border-gray-100'>
          <img
            src='/imge/buildingv2.webp'
            alt='K-RERA Building'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default AboutUs
