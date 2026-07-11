import React, { useState } from 'react'
import { MapPin, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/css/bundle'
import 'swiper/css'

SwiperCore.use([Autoplay]);

// Mock Data
const MOCK_PROJECTS = [
  {
    id: 1,
    title: 'ARTECH and JBT SERENITY',
    location: 'Vattapara, Thiruvananthapuram',
    totalArea: '12146.00 sqm',
    availableUnits: '110/110',
    certificate: 'K-RERA/PRJ/TVM/065/2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'ARCON CYBER SPACE',
    location: 'Thampuranmukku-Arassumoodu Road , ATTIPRA Thiruvananthapuram',
    totalArea: '9918.20 sqm',
    availableUnits: '31/31',
    certificate: 'K-RERA/PRJ/PKD/062/2026',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'CONDOR ASTER - 2',
    location: 'KOLLUMURI,KAZHAKUTTAM , ATTIPRA Thiruvananthapuram',
    totalArea: '11067.77 sqm',
    availableUnits: '51/51',
    certificate: 'K-RERA/PRJ/TVM/056/2026',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'ELITE ANANTA',
    location: 'GOLF LINKS ROAD , SASTHAMANGALAM Thiruvananthapuram',
    totalArea: '5141.21 sqm',
    availableUnits: '10/10',
    certificate: 'K-RERA/PRJ/TVM/054/2026',
    image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'ARTECH and JBT SERENITY',
    location: 'Vattapara, Thiruvananthapuram',
    totalArea: '12146.00 sqm',
    availableUnits: '110/110',
    certificate: 'K-RERA/PRJ/TVM/065/2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'ARCON CYBER SPACE',
    location: 'Thampuranmukku-Arassumoodu Road , ATTIPRA Thiruvananthapuram',
    totalArea: '9918.20 sqm',
    availableUnits: '31/31',
    certificate: 'K-RERA/PRJ/PKD/062/2026',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 7,
    title: 'CONDOR ASTER - 2',
    location: 'KOLLUMURI,KAZHAKUTTAM , ATTIPRA Thiruvananthapuram',
    totalArea: '11067.77 sqm',
    availableUnits: '51/51',
    certificate: 'K-RERA/PRJ/TVM/056/2026',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'ELITE ANANTA',
    location: 'GOLF LINKS ROAD , SASTHAMANGALAM Thiruvananthapuram',
    totalArea: '5141.21 sqm',
    availableUnits: '10/10',
    certificate: 'K-RERA/PRJ/TVM/054/2026',
    image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=2000&auto=format&fit=crop'
  }
];

const TABS = [
  'Trivandrum', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 
  'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Calicut', 'Wayanad', 
  'Kannur', 'Kasaragod'
];

export const browseProjectsBlock = {
  dependencies: [],
}

const BrowseProjects = () => {
  const [activeTab, setActiveTab] = useState('Trivandrum');
  
  // Drag to scroll functionality
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className='bg-white font-sans'>
      <div className="cmpad w-full flex flex-col pt-8 pb-16">
        
        {/* Header */}
        <div className="flex justify-center mb-8">
          <h2 className='tracking-tight font-urbanist flex flex-wrap justify-center gap-x-2'>
            <span className='text-[#085484] font-semibold text-[32px] sm:text-[45px] leading-[1.2]'>Browse New Projects</span>
            <span className='text-[#444444] font-normal text-[32px] sm:text-[45px] leading-[1.2]'>in Kerala</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="w-full flex justify-center mb-10">
          <div className="relative flex items-center max-w-full sm:max-w-[90vw] lg:max-w-4xl group">
            
            {/* Left Scroll Hint & Button */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent z-10 flex items-center pointer-events-none rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => scrollContainerRef.current?.scrollBy({ left: -250, behavior: 'smooth' })}
                className="w-8 h-8 ml-2 flex items-center justify-center bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-full text-[#085484] hover:bg-gray-50 transition-all pointer-events-auto"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 pr-0.5" />
              </button>
            </div>

            <div 
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex overflow-x-auto bg-[#FAFAFA] p-1.5 rounded-xl gap-2 w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-10 md:px-14 rounded-lg text-[16px] font-urbanist font-medium transition-colors whitespace-nowrap shrink-0 pointer-events-auto ${
                      isActive
                        ? 'bg-[#085484] text-white shadow-sm'
                        : 'bg-white text-[#085484] hover:bg-[#F0F8FF]'
                    }`}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>

            {/* Right Scroll Hint & Button */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent z-10 flex items-center justify-end pointer-events-none rounded-r-xl">
              <button 
                onClick={() => scrollContainerRef.current?.scrollBy({ left: 250, behavior: 'smooth' })}
                className="w-8 h-8 mr-2 flex items-center justify-center bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-full text-[#085484] hover:bg-gray-50 transition-all pointer-events-auto animate-[pulse_2s_ease-in-out_infinite]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 pl-0.5" />
              </button>
            </div>
            
          </div>
        </div>

        {/* Cards Swiper */}
        <div className="w-full">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="pb-8" // Add padding to not clip the hover shadow
          >
            {MOCK_PROJECTS.map((project) => (
              <SwiperSlide key={project.id} className="h-auto">
                <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                  {/* Image */}
                  <div className="h-[180px] w-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 rounded-t-xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 
                      className="text-[#333333] font-medium text-[17px] mb-2 uppercase leading-snug tracking-wide line-clamp-1"
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {project.title}
                    </h3>
                    
                    <div className="flex items-start text-[#595959] mb-4 min-h-[36px]">
                      <img src="/svg/location.svg" alt="location" className="w-[20px] h-[20px] mt-0.5 mr-1.5 shrink-0" />
                      <p className="text-[#595959] font-normal text-[13px] leading-tight line-clamp-2">
                        {project.location}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pb-3">
                      <span className="text-[#595959] font-medium text-[14px]" style={{ fontFamily: '"DM Sans", sans-serif' }}>Total Area</span>
                      <span className="text-[#333333] font-medium text-[16px]" style={{ fontFamily: '"DM Sans", sans-serif' }}>{project.totalArea}</span>
                    </div>

                    <div className="w-full border-t-[3px] border-solid border-[#085484] mb-3"></div>

                    <div className="flex items-center justify-between pb-4">
                      <span className="text-[#595959] font-medium text-[13px]" style={{ fontFamily: '"DM Sans", sans-serif' }}>Available Units</span>
                      <span className="text-[#444444] font-medium text-[13px]">{project.availableUnits}</span>
                    </div>

                    {/* Footer with Certificate & Action */}
                    <div className="flex items-end justify-between mt-auto pt-2">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center text-[#595959] text-[11px] font-medium" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                          <img src="/svg/certificateproject.svg" alt="certificate" className="w-[14px] h-[14px] mr-1.5 shrink-0" />
                          Certificate
                        </div>
                        <span className="text-[#595959] font-medium text-[13px] tracking-tight" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                          {project.certificate}
                        </span>
                      </div>
                      
                      <button className="bg-[#085484] hover:bg-[#064269] text-white p-2.5 rounded-full transition-colors shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  )
}

export default BrowseProjects
