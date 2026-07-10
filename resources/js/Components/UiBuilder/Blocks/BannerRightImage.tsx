import EditLabel from '../../../ui/button/EditLabel'
import Localization from '../../../ui/Localization'
import { BlocKFieldInfo, BlockFieldTypes, BlockFieldValues } from '../PageBuilder/BlockEditor'
import AddLabel from '../AddLabel'
import { HalfImageBlock, imageBlock } from '../DefaultBlockData'
import { Language } from '../../../ui/ui_interfaces'
import LinkButton from '../../../ui/button/LinkButton'
import RegisteredList from './Map/RegisteredList'
interface Properties {
  registeredProjects?: number
  registeredAgents?: number
  complaintsCount?: number
  promotersCount?: number
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: HalfImageBlock
  language?: Language
}


function BannerRightImage({
  registeredAgents,
  registeredProjects,
  complaintsCount,
  promotersCount,
  editMode = false,
  onFieldEdit,
  blockData = imageBlock,
  language = 'en',
}: Properties) {
  const onEdit = (

    field: string,
    fieldType: BlockFieldTypes,
    oldValue: BlockFieldValues,
    action: 'UPDATE' | 'REMOVE' | 'INSERT',
    index?: number
  ) => {
    if (onFieldEdit) {
      onFieldEdit({
        field,
        fieldType,
        oldValue,
        action,
        itemIndex: index,
      })
    }
  }

  return (
    <div
      className='relative w-full overflow-hidden'
      style={{
        backgroundImage: `url('/imge/newhome.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='absolute inset-0 bg-black/40'></div>
      <div className='cmpad relative z-10 flex min-h-[500px] flex-col items-center justify-center pb-16 pt-36 lg:min-h-[600px] lg:pt-48'>
        <h1 className='text-center text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl'>
          Kerala Real Estate Regulatory Authority
        </h1>
        <p className='mt-4 text-center text-xl font-medium text-gray-200 md:text-2xl lg:text-3xl'>
          Ensuring Transparency in Real Estate
        </p>

        <div className='mt-14 w-full md:mt-16'>
          <RegisteredList
            language={language}
            registeredProjects={registeredProjects}
            registeredAgents={registeredAgents}
            complaintsCount={complaintsCount}
            promotersCount={promotersCount}
          />
        </div>

        {/* Search Card UI */}
        <div className='mx-auto mt-8 w-full max-w-5xl px-4 md:mt-10 lg:max-w-6xl'>
          <div className='w-full rounded-xl bg-white p-6 shadow-xl md:p-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-semibold text-[#0f2c59]'>Project Name</label>
                <input
                  type='text'
                  placeholder='Enter Project Name'
                  className='rounded-md border border-gray-200 p-3 text-sm focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'
                />
              </div>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-semibold text-[#0f2c59]'>District</label>
                <select className='rounded-md border border-gray-200 p-3 text-sm text-gray-500 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'>
                  <option value=''>Select District</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-semibold text-[#0f2c59]'>Project Type</label>
                <select className='rounded-md border border-gray-200 p-3 text-sm text-gray-500 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'>
                  <option value=''>Select Project Type</option>
                </select>
              </div>
              <div className='flex flex-col justify-end'>
                <button className='w-full rounded-md bg-[#0f2c59] p-3 text-sm font-bold text-white transition hover:bg-[#0b1e3b]'>
                  Search
                </button>
              </div>
            </div>
            <div className='mt-6 flex flex-col items-center justify-between border-t border-gray-100 pt-5 sm:flex-row'>
              <span className='text-sm text-gray-500'>Choose one or more options above to search</span>
              <a href='#' className='mt-2 flex items-center gap-1 text-sm font-bold text-gray-800 hover:text-[#0f2c59] sm:mt-0'>
                Advance Search
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerRightImage
