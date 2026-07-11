import { Album, GalleryVideo } from '../../../../DataStructures/data_interfaces'
import { Language } from '../../../../ui/ui_interfaces'
import { BlockConfiguration } from '../../DefaultBlockData'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/css/bundle'
import 'swiper/css'

SwiperCore.use([Autoplay]);

export const defaultGalleryBlock = {
  dependencies: ['latestAlbums', 'latestVideos'],
}

interface Properties {
  lang?: Language
  latestAlbums?: Album[]
  latestVideos?: GalleryVideo[]
  blockData: BlockConfiguration
}

export default function HomeGallery({
  lang = 'en',
  latestAlbums,
  latestVideos,
  blockData,
}: Properties) {
  // Take up to 6 albums for the highlights
  const highlightAlbums = latestAlbums && latestAlbums.length > 0 ? latestAlbums.slice(0, 6) : []

  // Fallback mock images if no albums available
  const sampleImages = [
    '/imge/gallery/1.png',
    '/imge/gallery/2.png',
    '/imge/gallery/3.png',
    '/imge/gallery/1.png',
    '/imge/gallery/2.png',
    '/imge/gallery/3.png'
  ];

  return (
    <div className={`w-full bg-white font-sans pt-12 pb-8 overflow-hidden ${blockData?.marginTop} ${blockData?.marginBottom}`}>
      <div className="cmpad">
        
        {/* Top Section: Heading & Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="flex flex-col">
            {/* Subheading */}
            <div className="flex items-center gap-3 mb-2 lg:mb-4">
              <span className="text-gray-400 font-medium text-sm">||</span>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
                GALLERY
              </span>
            </div>

            {/* Heading */}
            <h2 className="tracking-tight font-urbanist flex flex-wrap gap-x-2">
              <span className="text-[#085484] font-semibold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2]">Highlights from</span>
              <span className="text-[#444444] font-normal text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2]">Events and Initiatives</span>
            </h2>
          </div>

          {/* View More Button */}
          <div className="mt-6 md:mt-0 shrink-0 pb-1">
            <a 
              href={`/gallery?lang=${lang}`}
              className="inline-flex items-center gap-3 bg-[#095b8d] text-white rounded-full py-2.5 pl-5 pr-2 hover:bg-[#064268] transition-colors shadow-sm"
            >
              <span className="text-[14px] font-medium font-urbanist tracking-wide">View More</span>
              <div className="bg-white text-[#095b8d] rounded-full p-1.5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="w-full">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="px-4 sm:px-0 pb-4"
          >
            {highlightAlbums.length > 0 ? (
              highlightAlbums.map((album, idx) => (
                <SwiperSlide key={album.id}>
                  <a 
                    href={`/gallery/${album.url}`}
                    className="group relative flex flex-col overflow-hidden rounded-[16px] shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-full h-[250px] overflow-hidden">
                      <img 
                        src={album.cover_photo} 
                        alt={album.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = sampleImages[idx % sampleImages.length];
                        }}
                      />
                    </div>
                  </a>
                </SwiperSlide>
              ))
            ) : (
              // Fallback mock images if no albums available (for preview)
              sampleImages.map((imgUrl, item) => (
                <SwiperSlide key={item}>
                  <div className="group relative flex flex-col overflow-hidden rounded-[16px] shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-full h-[250px] overflow-hidden">
                      <img 
                        src={imgUrl} 
                        alt={`Gallery Highlight ${item + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

      </div>
    </div>
  )
}
