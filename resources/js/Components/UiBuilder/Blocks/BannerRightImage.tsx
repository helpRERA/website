import EditLabel from '../../../ui/button/EditLabel'
import Localization from '../../../ui/Localization'
import { BlocKFieldInfo, BlockFieldTypes, BlockFieldValues } from '../PageBuilder/BlockEditor'
import AddLabel from '../AddLabel'
import { HalfImageBlock, imageBlock } from '../DefaultBlockData'
import { Language } from '../../../ui/ui_interfaces'
import LinkButton from '../../../ui/button/LinkButton'
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
        <div className='cmpad relative z-10 flex min-h-[calc(100vh-48px)] flex-col items-center justify-center pb-16 pt-36 lg:pt-48'>
          <h1 className='text-center text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl font-urbanist'>
            Kerala Real Estate Regulatory Authority
          </h1>
          <p className='mt-4 text-center text-xl font-medium text-gray-200 md:text-2xl lg:text-3xl font-urbanist'>
            Ensuring Transparency in Real Estate
          </p>

          {/* Search Card UI */}
          <div className='mx-auto mt-12 w-full max-w-5xl px-4 md:mt-16 lg:max-w-[1000px]'>
          <div className='w-full rounded-lg bg-white p-6 shadow-md md:p-8 md:pb-6'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_auto]'>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-[#246b9a]'>Project Name</label>
                <input
                  type='text'
                  placeholder='Enter Project Name'
                  className='w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'
                />
              </div>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-[#246b9a]'>District</label>
                <select className='w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'>
                  <option value=''>Select District</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='mb-2 text-sm font-medium text-[#246b9a]'>Project Type</label>
                <select className='w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'>
                  <option value=''>Select Project Type</option>
                </select>
              </div>
              <div className='flex flex-col justify-end'>
                <button className='w-full min-w-[140px] rounded-md bg-[#0b4b7a] p-3 text-sm font-medium text-white transition hover:bg-[#083c63]'>
                  Search
                </button>
              </div>
            </div>
            <div className='mt-5 flex flex-col items-center justify-between sm:flex-row'>
              <span className='text-sm text-gray-500'>Choose one or more options above to search</span>
              <a href='#' className='mt-2 flex items-center gap-2 text-sm font-medium text-[#4a4a4a] hover:text-[#0f2c59] sm:mt-0'>
                Advance Search <span className='text-xl leading-none'>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerRightImage
