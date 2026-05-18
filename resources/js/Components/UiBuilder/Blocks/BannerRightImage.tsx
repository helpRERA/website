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
      className={`${blockData.marginTop} ${blockData.marginBottom} px-5 pt-20 sm:px-0 lg:pt-0`}
      style={{
        backgroundImage: `url(${blockData.image?.url ?? '/placeholder.avif'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
    
      <div
        className='mx-auto flex w-full flex-col bg-gradient-to-b from-[rgba(55,65,81,0.75)] to-[rgba(17,24,79,0.75)]  py-10 px-7 sm:w-10/12
                   sm:py-16 sm:px-12 lg:mx-0 lg:w-2/3 xl:w-1/2 2xl:py-28 2xl:px-24'
      >
        {editMode && (
          <div className=''>
            <EditLabel
              onClick={() => onEdit('image', 'image', null, 'INSERT')}
              label='Edit Image'
            />
          </div>
        )}
        <h1 className='text-2xl font-extrabold leading-10 text-white md:text-4xl'>
          <Localization
            text={blockData.title}
            language={language}
          />
          {editMode && (
            <EditLabel onClick={() => onEdit('title', 'text', blockData.title, 'INSERT')} />
          )}
        </h1>
        <div className='flex flex-col gap-3'>
          {blockData.description.items.map((item) => {
            return (
              <p
                key={item.id.toString()}
                className='mt-5 text-xs leading-normal text-white sm:mt-8 sm:text-base md:text-lg'
              >
                <Localization
                  text={item.item}
                  language={language}
                />
                {editMode && (
                  <EditLabel
                    onClick={() => onEdit('description', 'textItems', item.item, 'UPDATE', item.id)}
                  />
                )}
              </p>
            )
          })}
          {editMode && (
            <AddLabel
              onClick={() => onEdit('description', 'textItems', null, 'INSERT')}
              label='Add Paragraph'
            />
          )}
        </div>
        <div className='mt-6 flex w-auto sm:mt-10'>
          {blockData.link != null && (
            <LinkButton
              link={blockData.link}
              lang={language}
            />
          )}
          {editMode && onFieldEdit != null && (
            <EditLabel
              label='Edit LInk'
              onClick={() => {
                onFieldEdit({
                  action: 'INSERT',
                  field: 'link',
                  fieldType: 'link',
                  oldValue: blockData.link ?? null,
                })
              }}
            />
          )}
        </div>
      </div>
      <div className='bg-gradient-to-b from-[rgba(17,24,79,0.75)] to-[rgba(17,24,79,0.75)]  px-4 pt-4 pb-4 md:col-span-4 lg:col-span-4'>
        <RegisteredList
          language={language}
          registeredProjects={registeredProjects}
          registeredAgents={registeredAgents}
          complaintsCount={complaintsCount}
          promotersCount={promotersCount}
        />
      </div>
    </div>
  )
}

export default BannerRightImage
