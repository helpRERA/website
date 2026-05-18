import { Link } from '@inertiajs/react'
import { Album } from '../../DataStructures/data_interfaces'
import Localization from '../../ui/Localization'
import Pagination from '../../ui/table/Pagination'
import { Language, Paginator } from '../../ui/ui_interfaces'

interface Properties {
  albums: Paginator<Album>
  lang?: Language
}

const AlbumsGrid = ({ albums, lang = 'en' }: Properties) => {
  return (
    <>
      <div className='mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4'>
        {albums.data.map((album) => {
          return (
            <Link
              as='a'
              className='group relative flex h-full w-full flex-col items-center  overflow-hidden text-center shadow-lg'
              key={album.id.toString()}
              href={'/gallery/' + album.url}
            >
              <img
                src={album.cover_photo}
                alt={album.name}
                loading='lazy'
                className='aspect-picture h-full w-full object-cover object-center transition duration-300 group-hover:scale-110'
              />
              <div className='absolute left-0 bottom-0 w-full bg-black bg-opacity-50 pl-6 pb-2 lg:pl-8 lg:pb-2'>
                <span className='break-words text-sm font-medium leading-5 text-white hover:text-indigo-500 lg:leading-normal'>
                  <Localization
                    text={{
                      english: album.name,
                      malayalam: album.name_malayalam,
                    }}
                    language={lang}
                  />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
      <div className='my-5'>
        <Pagination pagination={albums} />
      </div>
    </>
  )
}

export default AlbumsGrid
