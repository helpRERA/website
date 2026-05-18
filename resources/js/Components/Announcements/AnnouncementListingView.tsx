import { Announcement } from '../../DataStructures/data_interfaces'
import Localization from '../../ui/Localization'
import { Language } from '../../ui/ui_interfaces'

interface Properties {
  announcement: Announcement
  lang?: Language
}

const AnnouncementListingView = ({ announcement, lang = 'en' }: Properties) => {
  return (
    <div className='mt-5 min-h-screen'>
      <div className='mt-5 flex flex-col gap-5'>
        <span>
          <Localization
            text={{
              english: announcement.description,
              malayalam: announcement.description_malayalam,
            }}
            language={lang}
          />
        </span>
        <h3 className='font-semibold'>Documents</h3>
        {announcement.documents != null && announcement.documents?.length === 0 && (
          <span>No Documents Attached</span>
        )}
        <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:w-2/3'>
          {announcement.documents?.map((doc) => {
            return (
              <a
                className='group flex cursor-pointer
                  flex-col justify-start gap-3 overflow-hidden rounded bg-slate-100 p-5 text-left
                  shadow-xl transition-shadow duration-200 hover:shadow-2xl'
                key={doc.id.toString()}
                href={`${doc.document?.url}`}
                target='_blank'
                rel='noreferrer'
              >
                <h2 className='pb-2 font-bold uppercase text-indigo-700'>{doc.document?.name}</h2>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementListingView
