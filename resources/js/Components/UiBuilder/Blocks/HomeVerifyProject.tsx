import React from 'react'
import { Link } from '@inertiajs/react'

const HomeVerifyProject = () => {
  return (
    <div className="w-full bg-white font-sans pt-4 pb-6 md:pt-6 md:pb-8">
      <div className="cmpad">
        <div className="bg-[#085484] rounded-[8px] md:rounded-[12px] px-6 py-8 md:py-10 flex flex-col items-center text-center mx-auto w-full">
          
          <h2 className="text-white text-[28px] md:text-[36px] lg:text-[42px] font-urbanist font-medium leading-tight mb-3 tracking-tight max-w-4xl">
            Make Safe &amp; Informed Property Decisions
          </h2>
          
          <p className="text-[#E0F0FF] text-[14px] md:text-[15px] leading-relaxed mb-6 max-w-3xl opacity-90">
            Access verified project details, check developer credentials, and ensure your investment is secure with trusted information from K-RERA.
          </p>
          
          <Link 
            href="/explore-projects" 
            className="inline-flex items-center gap-3 bg-white text-[#085484] rounded-full py-2.5 pl-6 pr-2.5 hover:bg-gray-50 transition-all duration-300 group shadow-md"
          >
            <span className="text-[15px] font-medium">Verify a Project Now</span>
              <div className="bg-[#085484] text-white rounded-full p-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 19L19 5m0 0v10m0-10H9" />
                </svg>
              </div>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default HomeVerifyProject
