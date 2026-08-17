import React, { useState, useEffect, useCallback } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import { Link } from '@inertiajs/react'
import 'swiper/css/bundle'
import 'swiper/css'

SwiperCore.use([Autoplay]);

export interface BrowseProjectItem {
  ID: number | string
  Name: string
  DistrictName: string
  Area: string | number
  ImageId: number | string | null
  CertificateNo: string | null
  NumberOfResidentialUnits: number | string
  NumberOfCommercialUnits: number | string
  apartment_count: number
  booked_count: number
}

interface District {
  Districtcode: string | number
  Districtname: string
}

interface BrowseProjectsProps {
  projects?: BrowseProjectItem[]
  districts?: District[]
}

export const browseProjectsBlock = {
  dependencies: ['browseProjects', 'districtList']
}

const BrowseProjects = ({ projects: initialProjects = [], districts = [] }: BrowseProjectsProps) => {
  const [activeTab, setActiveTab] = useState<string | number | null>(
    districts[0]?.Districtcode ?? null
  );
  const [projects, setProjects] = useState<BrowseProjectItem[]>(initialProjects);
  const [loading, setLoading] = useState(false);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const fetchDistrictProjects = useCallback(async (districtCode: string | number) => {
    setLoading(true);
    try {
      const res = await fetch(`/browse-projects/${encodeURIComponent(String(districtCode))}`);
      const data = await res.json();
      setProjects(data);
    } catch (e) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab !== null) {
      fetchDistrictProjects(activeTab);
    }
  }, [activeTab, fetchDistrictProjects]);

  const handleTabClick = (districtCode: string | number) => {
    setActiveTab(districtCode);
  };

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
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className='bg-white font-sans'>
      <div className="cmpad w-full flex flex-col pt-8 pb-16">

        {/* Header */}
        <div className="flex justify-center mb-8">
          <h2 className='tracking-tight font-urbanist flex flex-wrap justify-center gap-x-2'>
            <span className='text-[#085484] font-semibold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2]'>Browse New Projects</span>
            <span className='text-[#444444] font-normal text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2]'>in Kerala</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="w-full flex justify-center mb-10">
          <div className="relative flex items-center max-w-full sm:max-w-[90vw] lg:max-w-4xl group">

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
              {districts.map((d) => {
                const isActive = activeTab === d.Districtcode;
                return (
                  <button
                    key={d.Districtcode}
                    onClick={() => handleTabClick(d.Districtcode)}
                    className={`py-3 px-10 md:px-14 rounded-lg text-[16px] font-urbanist font-medium transition-colors whitespace-nowrap shrink-0 pointer-events-auto ${isActive
                        ? 'bg-[#085484] text-white shadow-sm'
                        : 'bg-white text-[#085484] hover:bg-[#F0F8FF]'
                      }`}
                  >
                    {d.Districtname}
                  </button>
                )
              })}
            </div>

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
          {loading ? (
            <div className="text-center text-[#595959] py-10">Loading projects…</div>
          ) : projects.length === 0 ? (
            <div className="text-center text-[#595959] py-10">No projects to show right now.</div>
          ) : (
            <Swiper
              key={activeTab ?? 'default'}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={projects.length > 4}
              className="pb-8"
            >
              {projects.map((project) => (
                <SwiperSlide key={project.ID} className="h-auto">
                  <Link href={`/projects/${project.ID}`} as="a" className="block h-full">
                    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                      <div className="h-[180px] w-full overflow-hidden">
                        <img
                          src={project.ImageId == null ? '/placeholder.png' : `/uploaded-images/${project.ImageId}`}
                          alt={project.Name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 rounded-t-xl"
                          loading="lazy"
                        />
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <h3
                          className="text-[#333333] font-medium text-[17px] mb-2 uppercase leading-snug tracking-wide line-clamp-1"
                          style={{ fontFamily: '"DM Sans", sans-serif' }}
                        >
                          {project.Name}
                        </h3>

                        <div className="flex items-start text-[#595959] mb-4 min-h-[36px]">
                          <img src="/svg/location.svg" alt="location" className="w-[20px] h-[20px] mt-0.5 mr-1.5 shrink-0" />
                          <p className="text-[#595959] font-normal text-[13px] leading-tight line-clamp-2">
                            {project.DistrictName || '—'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto pb-3">
                          <span className="text-[#595959] font-medium text-[14px]" style={{ fontFamily: '"DM Sans", sans-serif' }}>Total Area</span>
                          <span className="text-[#333333] font-medium text-[16px]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                            {project.Area} sqm
                          </span>
                        </div>

                        <div className="w-full border-t-[3px] border-solid border-[#085484] mb-3"></div>

                        <div className="flex items-center justify-between pb-4">
                          <span className="text-[#595959] font-medium text-[13px]" style={{ fontFamily: '"DM Sans", sans-serif' }}>Available Units</span>
                          <span className="text-[#444444] font-medium text-[13px]">
                            {project.booked_count ?? 0}/{project.apartment_count}
                          </span>
                        </div>

                        <div className="flex items-end justify-between mt-auto pt-2">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center text-[#595959] text-[11px] font-medium" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                              <img src="/svg/certificateproject.svg" alt="certificate" className="w-[14px] h-[14px] mr-1.5 shrink-0" />
                              Certificate
                            </div>
                            <span className="text-[#595959] font-medium text-[13px] tracking-tight" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                              {project.CertificateNo ?? '—'}
                            </span>
                          </div>

                          <div className="bg-[#085484] hover:bg-[#064269] text-white p-2.5 rounded-full transition-colors shrink-0">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

      </div>
    </div>
  )
}

export default BrowseProjects