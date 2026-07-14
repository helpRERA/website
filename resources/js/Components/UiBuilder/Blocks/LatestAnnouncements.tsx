import { Link } from '@inertiajs/react'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Announcement } from '../../../DataStructures/data_interfaces'
import { getDisplayDate } from '../../../libs/dates'
import { localization } from '../../../Localization/localization'
import { handleHttpErrors } from '../../../ui/alerts'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import { BlockConfiguration } from '../DefaultBlockData'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'
import { Megaphone, Bell, FileEdit, Calendar, Eye, Download, ArrowUpRight } from 'lucide-react'

export const latestAnnouncementsBlock = {
  dependencies: ['latestAnnouncements'],
}

interface Properties {
  announcements?: Announcement[]
  language?: Language
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: BlockConfiguration
}

const OrdersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M29.2593 17.7083H26.0987C25.8975 17.7083 25.7289 17.6408 25.5929 17.5057C25.4569 17.3707 25.3894 17.2021 25.3903 17C25.3913 16.7979 25.4588 16.6293 25.5929 16.4942C25.727 16.3592 25.8956 16.2916 26.0987 16.2916H29.2578C29.4599 16.2916 29.629 16.3592 29.765 16.4942C29.901 16.6293 29.9685 16.7979 29.9676 17C29.9666 17.2021 29.8986 17.3707 29.7636 17.5057C29.6285 17.6408 29.4604 17.7083 29.2593 17.7083ZM23.7059 23.5549C23.8334 23.3877 23.9907 23.2895 24.1777 23.2602C24.3656 23.2319 24.5427 23.281 24.7089 23.4076L27.2221 25.2988C27.3883 25.4254 27.4861 25.5826 27.5153 25.7705C27.5437 25.9575 27.4946 26.1346 27.368 26.3018C27.2414 26.468 27.0847 26.5658 26.8977 26.5951C26.7107 26.6243 26.5336 26.5752 26.3664 26.4477L23.8547 24.5579C23.6875 24.4304 23.5893 24.2731 23.56 24.0861C23.5307 23.8991 23.5794 23.7221 23.7059 23.5549ZM27.1116 8.59347L24.6013 10.4833C24.435 10.6108 24.2584 10.6599 24.0714 10.6306C23.8835 10.6014 23.7262 10.5031 23.5997 10.336C23.4722 10.1688 23.4231 9.99172 23.4523 9.80472C23.4807 9.61772 23.5789 9.46094 23.747 9.33438L26.2588 7.44313C26.4259 7.31563 26.603 7.26652 26.79 7.2958C26.977 7.32413 27.1338 7.42235 27.2603 7.59047C27.3878 7.75763 27.4369 7.93472 27.4077 8.12172C27.3793 8.30872 27.2816 8.46597 27.1144 8.59347" fill="currentColor"/>
    <path d="M10.7743 11.9266V23.0039C10.7741 23.3476 10.6526 23.6802 10.4311 23.9431C10.2097 24.206 9.90264 24.3823 9.56398 24.441C9.22532 24.4997 8.87682 24.4369 8.57987 24.2639C8.28292 24.0908 8.05658 23.8185 7.94073 23.4949L6.16029 18.3949M6.16029 18.3949C5.45642 18.0956 4.87757 17.5632 4.52168 16.8861C4.1658 16.2091 4.05474 15.43 4.20731 14.6805C4.35988 13.931 4.7667 13.2573 5.35893 12.7733C5.95116 12.2893 6.69242 12.0247 7.45727 12.0244H8.97649C12.3765 12.0244 15.2997 11.0011 16.5792 9.53662V21.1464C15.2997 19.6819 12.3773 18.6586 8.97649 18.6586H7.45727C7.01167 18.6589 6.57057 18.5687 6.16029 18.3949ZM16.5792 17.8293C17.239 17.8293 17.8718 17.5672 18.3384 17.1006C18.8049 16.6341 19.067 16.0013 19.067 15.3415C19.067 14.6817 18.8049 14.0489 18.3384 13.5824C17.8718 13.1158 17.239 12.8537 16.5792 12.8537" stroke="currentColor" strokeWidth="1.275" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CareersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.43041 2.41301C6.55649 2.26254 6.61854 2.06863 6.60325 1.87292C6.58796 1.67721 6.49654 1.49529 6.34863 1.36622C6.20071 1.23716 6.00809 1.17123 5.81211 1.18259C5.61613 1.19396 5.43242 1.28171 5.30041 1.42701L4.00841 2.90701C3.27579 3.74658 2.86165 4.81698 2.83841 5.93101L2.78141 8.65001C2.77937 8.7485 2.79676 8.84643 2.83257 8.9382C2.86838 9.02997 2.92192 9.1138 2.99012 9.18488C3.05832 9.25596 3.13986 9.31292 3.23008 9.35249C3.32029 9.39206 3.41742 9.41347 3.51591 9.41551C3.6144 9.41754 3.71233 9.40016 3.8041 9.36435C3.89588 9.32854 3.9797 9.275 4.05078 9.2068C4.12186 9.1386 4.17882 9.05706 4.21839 8.96684C4.25796 8.87663 4.27937 8.7795 4.28141 8.68101L4.33741 5.96301C4.35345 5.20074 4.63699 4.46837 5.13841 3.89401L6.43041 2.41301Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.23988 7.7C6.30704 6.63014 6.7794 5.62608 7.5608 4.89224C8.34221 4.15839 9.37391 3.74993 10.4459 3.75H11.0029V3C11.0029 2.73478 11.1082 2.48043 11.2958 2.29289C11.4833 2.10536 11.7377 2 12.0029 2C12.2681 2 12.5224 2.10536 12.71 2.29289C12.8975 2.48043 13.0029 2.73478 13.0029 3V3.75H13.5599C14.6318 3.74993 15.6636 4.15839 16.445 4.89224C17.2264 5.62608 17.6987 6.63014 17.7659 7.7L17.9869 11.234C18.0723 12.5812 18.5246 13.8794 19.2949 14.988C19.4542 15.2171 19.5516 15.4835 19.5775 15.7613C19.6035 16.0392 19.557 16.319 19.4428 16.5736C19.3285 16.8281 19.1503 17.0488 18.9255 17.2142C18.7007 17.3795 18.4369 17.4838 18.1599 17.517L14.7529 17.925V19C14.7529 19.7293 14.4631 20.4288 13.9474 20.9445C13.4317 21.4603 12.7322 21.75 12.0029 21.75C11.2735 21.75 10.5741 21.4603 10.0583 20.9445C9.54261 20.4288 9.25288 19.7293 9.25288 19V17.925L5.84588 17.516C5.56897 17.4827 5.30539 17.3784 5.08072 17.2131C4.85606 17.0478 4.67796 16.8273 4.56373 16.5729C4.4495 16.3184 4.40302 16.0388 4.4288 15.7611C4.45458 15.4834 4.55176 15.2171 4.71088 14.988C5.48112 13.8794 5.93345 12.5812 6.01888 11.234L6.23988 7.7ZM10.4459 5.25C9.75545 5.24992 9.09095 5.51297 8.58766 5.98561C8.08437 6.45825 7.78013 7.10493 7.73688 7.794L7.51688 11.328C7.41406 12.9487 6.86974 14.5105 5.94288 15.844C5.93135 15.8606 5.9243 15.8798 5.92242 15.8999C5.92053 15.92 5.92388 15.9403 5.93213 15.9587C5.94039 15.9771 5.95327 15.9931 5.96952 16.005C5.98577 16.017 6.00484 16.0246 6.02488 16.027L9.76188 16.476C11.2509 16.654 12.7549 16.654 14.2439 16.476L17.9809 16.027C18.0009 16.0246 18.02 16.017 18.0362 16.005C18.0525 15.9931 18.0654 15.9771 18.0736 15.9587C18.0819 15.9403 18.0852 15.92 18.0833 15.8999C18.0815 15.8798 18.0744 15.8606 18.0629 15.844C17.1364 14.5104 16.5924 12.9486 16.4899 11.328L16.2689 7.794C16.2256 7.10493 15.9214 6.45825 15.4181 5.98561C14.9148 5.51297 14.2503 5.24992 13.5599 5.25H10.4459ZM12.0029 20.25C11.3129 20.25 10.7529 19.69 10.7529 19V18.25H13.2529V19C13.2529 19.69 12.6929 20.25 12.0029 20.25Z" fill="currentColor"/>
    <path d="M17.6474 1.35495C17.4976 1.48573 17.4059 1.67065 17.3924 1.86905C17.3789 2.06745 17.4447 2.26309 17.5754 2.41295L18.8674 3.89295C19.3687 4.46772 19.6519 5.20046 19.6674 5.96295L19.7244 8.67996C19.7285 8.87887 19.8115 9.068 19.955 9.20575C20.0986 9.34349 20.291 9.41857 20.4899 9.41446C20.6888 9.41034 20.878 9.32738 21.0157 9.18383C21.1534 9.04027 21.2285 8.84787 21.2244 8.64895L21.1674 5.93095C21.1442 4.81693 20.73 3.74652 19.9974 2.90695L18.7054 1.42695C18.5746 1.27714 18.3897 1.1854 18.1913 1.1719C17.9929 1.1584 17.7973 1.22424 17.6474 1.35495Z" fill="currentColor"/>
  </svg>
)

const NoticeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_395_573)">
      <path d="M11.0443 2.29167H13.1276C13.4591 2.29167 13.7771 2.42336 14.0115 2.65778C14.2459 2.8922 14.3776 3.21015 14.3776 3.54167M10.8776 15.95L7.7776 16.3917L8.21927 13.3333L16.1776 5.38333C16.533 5.05213 17.0032 4.87183 17.4889 4.8804C17.9747 4.88897 18.4381 5.08575 18.7817 5.42928C19.1252 5.77281 19.322 6.23627 19.3305 6.72203C19.3391 7.20778 19.1588 7.6779 18.8276 8.03333L10.8776 15.95ZM4.58594 0.625H10.4193C10.4193 0.625 11.0443 0.625 11.0443 1.25V3.33333C11.0443 3.33333 11.0443 3.95833 10.4193 3.95833H4.58594C4.58594 3.95833 3.96094 3.95833 3.96094 3.33333V1.25C3.96094 1.25 3.96094 0.625 4.58594 0.625Z" stroke="currentColor" strokeWidth="1.36386" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.375 15.625V18.125C14.375 18.4565 14.2433 18.7745 14.0089 19.0089C13.7745 19.2433 13.4565 19.375 13.125 19.375H1.875C1.54348 19.375 1.22554 19.2433 0.991117 19.0089C0.756696 18.7745 0.625 18.4565 0.625 18.125V3.54169C0.625 3.21017 0.756696 2.89222 0.991117 2.6578C1.22554 2.42338 1.54348 2.29169 1.875 2.29169H3.95833M4.375 7.29169H10.2083M4.375 11.0417H6.45833" stroke="currentColor" strokeWidth="1.36386" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_395_573">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

const TenderIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14.776 1.79181V4.47931M6.71354 1.79181V4.47931M10.7448 1.79181V4.47931M11.6406 3.13556H9.84896C6.89271 3.13556 5.41458 3.13556 4.49635 4.05379C3.57813 4.97202 3.57812 6.45014 3.57812 9.40639V13.4376C3.57812 16.3939 3.57813 17.872 4.49635 18.7902C5.41458 19.7085 6.89271 19.7085 9.84896 19.7085H11.6406C14.5969 19.7085 16.075 19.7085 16.9932 18.7902C17.9115 17.872 17.9115 16.3939 17.9115 13.4376V9.40639C17.9115 6.45014 17.9115 4.97202 16.9932 4.05379C16.075 3.13556 14.5969 3.13556 11.6406 3.13556Z" stroke="currentColor" strokeWidth="1.34375" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.71875 9.85425L7.61458 10.7501L9.40625 8.5105M11.6458 15.2292H14.3333M11.6458 9.85425H14.3333" stroke="currentColor" strokeWidth="1.34375" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.60156 15.1101H7.61052" stroke="currentColor" strokeWidth="1.79167" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LatestAnnouncements = ({ announcements, language = 'en', blockData }: Properties) => {
  const [selectedTab, setSelectedTab] = useState('Orders')
  const [items, setItems] = useState<Announcement[]>([])
  const [selectedFilter, setSelectedFilter] = useState('All') // static for now
  
  const selectTab = (value: string) => {
    setSelectedTab(value)
  }

  const fetchData = useCallback((type: string) => {
    setItems([])
    axios
      .get(`/latest-announcements?type=${encodeURIComponent(type)}`)
      .then((response) => {
        setItems(response.data)
      })
      .catch(handleHttpErrors)
  }, [])

  useEffect(() => {
    fetchData(selectedTab)
  }, [selectedTab, fetchData])

  const tabs = [
    { key: 'Orders', icon: <OrdersIcon className="w-8 h-8 mb-1.5" />, label: localization['Orders'] },
    { key: 'Career', icon: <CareersIcon className="w-7 h-7 mb-1.5" />, label: localization['Career'] },
    { key: 'Notices', icon: <NoticeIcon className="w-7 h-7 mb-1.5" />, label: localization['Notices'] },
    { key: 'Tenders & Quotations', icon: <TenderIcon className="w-7 h-7 mb-1.5" />, label: localization['Tenders & Quotations'] },
  ]

  const filterOptions = ['All', 'Project', 'Promoters', 'Agents', 'Legal', 'Others']

  return (
    <div className='bg-white font-sans'>
      <div
        className={`${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
      >
        <div className="cmpad w-full flex flex-col pt-8 pb-16">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4">
            <div className='flex flex-col'>
              {/* Subheading */}
              <div className='flex items-center gap-3 mb-2 lg:mb-4'>
                <span className='text-gray-400 font-medium text-sm'>||</span>
                <span className='text-[11px] font-semibold tracking-[0.2em] text-gray-500 uppercase'>
                  Latest Updates
                </span>
              </div>

              {/* Heading */}
              <h2 className='tracking-tight font-urbanist flex flex-wrap gap-x-2'>
                <span className='text-[#085484] font-semibold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2]'>Notifications &amp;</span>
                <span className='text-[#444444] font-normal text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2]'>Announcements</span>
              </h2>
            </div>
            
            <div className="mt-4 md:mt-0 pb-1 lg:pb-3">
              <Link
                as='a'
                href={`/announcements?lang=${language}`}
                className='inline-flex items-center gap-3 bg-[#085484] text-white rounded-full py-[10px] pl-6 pr-2 hover:bg-[#064268] transition-colors group'
              >
                <span className='text-[13px] font-medium'>
                  <Localization text={localization['See More']} language={language} />
                </span>
                <div className='bg-white text-[#085484] rounded-full p-1.5'>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
                </div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Tabs */}
            <div className="w-full lg:w-[22%] flex flex-row lg:flex-col gap-3 lg:gap-[10px] shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {tabs.map((tab) => {
                const isActive = selectedTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => selectTab(tab.key)}
                    className={`flex flex-row items-center justify-center lg:justify-start py-1.5 lg:py-3 px-3 lg:px-4 rounded-md lg:rounded-lg border transition-all duration-300 shrink-0 gap-1.5 lg:gap-3 whitespace-nowrap ${
                      isActive 
                        ? 'bg-white border-blue-100 text-[#085484] shadow-[0_2px_10px_rgba(0,0,0,0.05)]' 
                        : 'bg-[#085484] border-transparent text-white hover:bg-[#074b75]'
                    }`}
                  >
                    <div className="scale-[0.85] flex items-center justify-center shrink-0">
                      {tab.icon}
                    </div>
                    <span className="text-[12.5px] lg:text-[14px] font-medium mt-0">
                      <Localization text={tab.label} language={language} />
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-[78%] flex flex-col">
              
              {/* Filter Checkboxes */}
              <div className="flex flex-wrap justify-between w-full gap-y-3 mb-6 items-center">
                {filterOptions.map((opt) => {
                  const isChecked = selectedFilter === opt;
                  return (
                    <label key={opt} className="flex items-center cursor-pointer group">
                      <div className={`w-5 h-5 rounded-[4px] flex items-center justify-center border border-[#085484] transition-colors ${
                        isChecked ? 'bg-[#E6F3FB]' : 'bg-white'
                      }`}>
                        {isChecked && (
                          <svg className="w-3.5 h-3.5 text-[#085484]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="ml-2.5 text-[15px] font-medium text-gray-700">{opt}</span>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={isChecked} 
                        onChange={() => setSelectedFilter(opt)} 
                      />
                    </label>
                  )
                })}
              </div>

              {/* List */}
              <div className="flex flex-col gap-3">
                {items.length > 0 ? (
                  items.map((announcement) => (
                    <div 
                      key={announcement.id.toString()}
                      className="flex flex-col sm:flex-row sm:items-center bg-white border border-[#D9D9E2] rounded-lg py-2.5 px-4 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center text-[#085484] text-[13px] font-normal sm:w-[115px] shrink-0 mb-3 sm:mb-0" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        <Calendar className="w-4 h-4 mr-2" strokeWidth={2} />
                        {getDisplayDate(announcement.date)}
                      </div>
                      
                      {/* Placeholder Badge since backend doesn't provide category */}
                      <div className="shrink-0 mb-3 sm:mb-0 sm:mr-5">
                        <span className="px-3 py-1 text-[12px] font-normal bg-[#085484] text-white rounded-[4px] leading-none tracking-normal" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {selectedTab === 'Orders' ? 'Project' : selectedTab === 'Career' ? 'Career' : 'Notices'}
                        </span>
                      </div>

                      <div className="flex-grow pr-4">
                        <p className="text-[#595959] text-[14px] font-normal line-clamp-2">
                          <Localization
                            text={{
                              english: announcement.title,
                              malayalam: announcement.title_malayalam,
                            }}
                            language={language}
                          />
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-3 sm:mt-0 shrink-0 text-[#085484]">
                        <button className="p-1.5 hover:bg-[#F0F8FF] rounded-full transition-colors">
                          <Download className="w-[18px] h-[18px]" strokeWidth={2} />
                        </button>
                        <Link 
                          as="a" 
                          href={`/announcements/${announcement.id}?lang=${language}`}
                          className="p-1.5 hover:bg-[#F0F8FF] rounded-full transition-colors"
                        >
                          <Eye className="w-[18px] h-[18px]" strokeWidth={2} />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex w-full py-16 flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200'>
                    <FileEdit className="w-12 h-12 mb-4 text-gray-300" strokeWidth={1} />
                    <h1 className="text-lg font-medium">No Records To Show.</h1>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LatestAnnouncements
