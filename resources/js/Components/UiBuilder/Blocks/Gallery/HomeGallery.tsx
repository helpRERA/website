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

// Normalized item so albums + videos can share one carousel
type HighlightItem =
  | { type: 'album'; id: number; title: string; image: string; href: string; date: string }
  | { type: 'video'; id: number; title: string; thumbnail: string; href: string; date: string }

function getYoutubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/embed/')[1].split('/')[0]
    }
    if (parsed.hostname.includes('youtube.com')) {
      return parsed.searchParams.get('v')
    }
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.substring(1).split('/')[0]
    }

    return null
  } catch {
    return null
  }
}

function getYoutubeThumbnail(url: string): string {
  const videoId = getYoutubeVideoId(url)

  return videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : '/placeholder.png'
}

function getYoutubeWatchUrl(url: string): string {
  try {
    const parsed = new URL(url)

    if (parsed.pathname.startsWith('/embed/')) {
      const videoId = parsed.pathname.split('/embed/')[1].split('/')[0]
      return `https://www.youtube.com/watch?v=${videoId}`
    }
    if (parsed.hostname === 'youtu.be') {
      const videoId = parsed.pathname.substring(1)
      return `https://www.youtube.com/watch?v=${videoId}`
    }

    if (
      parsed.hostname.includes('youtube.com') &&
      parsed.searchParams.has('v')
    ) {
      const videoId = parsed.searchParams.get('v')
      return `https://www.youtube.com/watch?v=${videoId}`
    }

    return url
  } catch {
    return url
  }
}


export default function HomeGallery({
  lang = 'en',
  latestAlbums,
  latestVideos,
  blockData,
}: Properties) {
  const sampleImages = [
    '/placeholder.png',
    '/placeholder.png',
    '/placeholder.png',
    '/placeholder.png',
    '/placeholder.png',
    '/placeholder.png'
  ];

  const albumItems: HighlightItem[] = (latestAlbums ?? []).map((album) => ({
    type: 'album',
    id: album.id,
    title: album.name,
    image: album.cover_photo,
    href: `/gallery/${album.url}`,
    date: album.event_date,
  }))

  const videoItems: HighlightItem[] = (latestVideos ?? []).map((video) => ({
    type: 'video',
    id: video.id,
    title: video.caption,
    thumbnail: getYoutubeThumbnail(video.url),
    href: getYoutubeWatchUrl(video.url),
    date: video.date,
  }))

  // Merge, sort newest first, cap at 6 for the highlights strip
  const highlights = [...albumItems, ...videoItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

  return (
    <div className={`w-full bg-white font-sans pt-12 pb-8 overflow-hidden ${blockData?.marginTop} ${blockData?.marginBottom}`}>
      <div className="cmpad">

        {/* Top Section: Heading & Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2 lg:mb-4">
              <span className="text-gray-400 font-medium text-sm">||</span>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
                GALLERY
              </span>
            </div>
            <h2 className="tracking-tight font-urbanist flex flex-wrap gap-x-2">
              <span className="text-[#085484] font-semibold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2]">Highlights from</span>
              <span className="text-[#444444] font-normal text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2]">Events and Initiatives</span>
            </h2>
          </div>

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
            {highlights.length > 0 ? (
              highlights.map((item, idx) => (
                <SwiperSlide key={`${item.type}-${item.id}`}>
                  <a
                    href={item.href}
                    target={item.type === 'video' ? '_blank' : undefined}
                    rel={item.type === 'video' ? 'noopener noreferrer' : undefined}
                    className="group relative flex flex-col overflow-hidden rounded-[16px] shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-full h-[250px] overflow-hidden relative">
                      <img
                        src={item.type === 'album' ? item.image : item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = sampleImages[idx % sampleImages.length];
                        }}
                      />

                      {/* Play icon overlay for videos */}
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                          <div className="bg-white/90 rounded-full p-3 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#095b8d" className="w-6 h-6">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                        <p className="text-white text-sm font-medium line-clamp-2">{item.title}</p>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))
            ) : (
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