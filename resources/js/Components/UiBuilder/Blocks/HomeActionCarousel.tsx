import React from 'react'
import { Language } from '../../../ui/ui_interfaces'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import EditLabel from '../../../ui/button/EditLabel'


interface Properties {
  editMode?: boolean
  onFieldEdit?: any
  blockData?: any
  language?: Language
  dispatch?: any
}

const ActionCarousel = ({ editMode, language, blockData, onFieldEdit, dispatch }: Properties) => {
  console.log(blockData);
  

  // Helper component for standard small cards
  const SmallCard = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
    <a href="#" className="bg-white rounded-[16px] border border-[#EEEEEE] hover:border-[#86C9F4] p-5 md:p-6 flex flex-col hover:shadow-[0px_4px_24px_0px_#00000014] transition-all duration-300 group h-full">
      <div className="bg-[#095b8d] w-[42px] h-[42px] rounded-full flex items-center justify-center mb-3 text-white shrink-0">
        {icon}
      </div>
      <h3 className="text-[#333333] font-medium text-[18px] mb-1 leading-tight">{title}</h3>
      <p className="text-[#595959] font-normal text-[15px] leading-[1.6] mb-4">{desc}</p>
      <div className="text-[#444444] group-hover:text-[#095b8d] transition-colors mt-auto pt-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2">
          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <EditLabel onClick={onFieldEdit}/>
      </div>
    </a>
  );

  return (
    <div className="w-full bg-[#F0F8FF] font-sans pb-16">
      <div className="cmpad pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 */}
          <SmallCard
            title="De-registered Projects"
            desc="Explore agents registered with K-RERA."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3 3v18h18V3H3zm14 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
            }
          />

          {/* Card 2 */}
          <SmallCard
            title="Manuals and Guidelines"
            desc="Browse the projects registered with K-RERA"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 1.962L16.03 6.962a2.25 2.25 0 01.46.688H14.625a.375.375 0 01-.375-.375V3.773a2.25 2.25 0 01.28.688H12.53zM6.75 12a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm0 3.75a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z" clipRule="evenodd" /></svg>
            }
          />

          {/* Large Card: Login & Registration (Row Span 2) */}
          <div className="bg-[#095b8d] rounded-[16px] p-8 flex flex-col justify-between row-span-2 shadow-[0px_8px_30px_0px_#0000001A]">
            <div>
              <div className="bg-white w-[54px] h-[54px] rounded-full flex items-center justify-center mb-6 text-[#095b8d]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-white font-medium text-[24px] mb-4 leading-snug">Login and Registration</h3>
              <p className="text-[#E0F0FF] text-[14px] leading-[1.7] mb-8">
                Web portal for login and new registration, allowing promoters and agents to access services and manage registrations.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <a href="#" className="bg-white text-[#095b8d] font-medium text-[15px] py-3 px-4 rounded-[8px] text-center hover:bg-gray-100 transition-colors">
                Login
              </a>
              <a href="#" className="bg-transparent border border-white text-white font-medium text-[15px] py-3 px-4 rounded-[8px] text-center hover:bg-white hover:bg-opacity-10 transition-colors">
                Register
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <SmallCard
            title="Downloads"
            desc="View details of complaints registered"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" /></svg>
            }
          />

          {/* Card 4 */}
          <SmallCard
            title="Daily Case List"
            desc="Browse cases posted for hearing by date"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
            }
          />

          {/* Card 5 */}
          <SmallCard
            title="How to file a complaint"
            desc="View details of complaints registered"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75v.75h1.5a.75.75 0 010 1.5h-1.5v.75a.75.75 0 01-1.5 0V4.5H9.75a.75.75 0 010-1.5h1.5v-.75a.75.75 0 01.75-.75zm4.5 9a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0zm-4.5 2.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z" clipRule="evenodd" /></svg>
            }
          />

          {/* Card 6 */}
          <SmallCard
            title="Acts, Rules and Regulations"
            desc="Browse cases posted for hearing by date"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 1.962L16.03 6.962a2.25 2.25 0 01.46.688H14.625a.375.375 0 01-.375-.375V3.773a2.25 2.25 0 01.28.688H12.53zM6.75 12a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm0 3.75a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z" clipRule="evenodd" /></svg>
            }
          />

          {/* Card 7 */}
          <SmallCard
            title="Annual Reports"
            desc="Browse cases posted for hearing by date"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 1.962L16.03 6.962a2.25 2.25 0 01.46.688H14.625a.375.375 0 01-.375-.375V3.773a2.25 2.25 0 01.28.688H12.53zM6.75 12a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm0 3.75a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z" clipRule="evenodd" /></svg>
            }
          />

        </div>
      </div>
    </div>
  )
}

export default ActionCarousel
