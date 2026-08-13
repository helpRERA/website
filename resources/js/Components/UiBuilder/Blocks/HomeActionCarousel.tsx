import React, { useCallback } from 'react'
import { Block } from '../../../DataStructures/ui_builder_interfaces'
import AddButton from '../../../ui/button/AddButton'
import EditLabel from '../../../ui/button/EditLabel'
import InertiaLink from '../../../ui/Link/InertiaLink'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import {
  BlockConfiguration,
  linkActionBlock,
  LinkActionData,
} from '../DefaultBlockData'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'
import { PageBuilderAction } from '../PageBuilder/pageBuilderService'

interface BlockInfo extends LinkActionData, Block, BlockConfiguration {}

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: BlockInfo
  language?: Language
  dispatch?: React.Dispatch<PageBuilderAction>
}

const ActionCarousel = ({ editMode, language, blockData, onFieldEdit, dispatch }: Properties) => {
  const addNewAction = useCallback(() => {
    if (dispatch != null) {
      dispatch({
        action: 'INSERT_INTO_LIST',
        blockId: blockData?.id,
        fieldName: 'actions',
        fieldValue: linkActionBlock,
      })
    }
  }, [dispatch, blockData])

  const SmallCard = ({ item }: { item: BlockInfo['actions']['items'][number] }) => (
    <div className="min-w-0 bg-white rounded-[16px] border border-[#EEEEEE] hover:border-[#86C9F4] p-5 md:p-6 flex flex-col hover:shadow-[0px_4px_24px_0px_#00000014] transition-all duration-300 group h-full">
      <div className='mb-3 flex items-center gap-2'>
        <div className="bg-[#095b8d] w-[42px] h-[42px] rounded-full flex items-center justify-center text-white shrink-0 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:brightness-0 [&_svg]:invert">
          <div dangerouslySetInnerHTML={{ __html: item.item.svg.english ?? '' }} />
        </div>
        {editMode && onFieldEdit != null && (
          <span className='text-xs'>
            <EditLabel
              onClick={() =>
                onFieldEdit({
                  field: 'actions',
                  oldValue: item.item.svg,
                  itemField: 'svg',
                  itemIndex: item.id,
                  fieldType: 'textarea',
                  action: 'UPDATE',
                })
              }
            />
          </span>
        )}
      </div>
      <div className='mb-1 flex flex-wrap items-start gap-x-1 gap-y-0'>
        <h3 className="break-words text-[#333333] font-medium text-[18px] leading-tight">
          <Localization language={language} text={item.item.title} />
        </h3>
        {editMode && onFieldEdit != null && (
          <span className='text-xs'>
            <EditLabel
              onClick={() =>
                onFieldEdit({
                  field: 'actions',
                  oldValue: item.item.title,
                  itemField: 'title',
                  itemIndex: item.id,
                  fieldType: 'text',
                  action: 'UPDATE',
                })
              }
            />
          </span>
        )}
      </div>
      <div className='mb-4 flex flex-wrap items-start gap-x-1 gap-y-0'>
        <p className="break-words text-[#595959] font-normal text-[15px] leading-[1.6]">
          <Localization language={language} text={item.item.description} />
        </p>
        {editMode && onFieldEdit != null && (
          <span className='text-xs'>
            <EditLabel
              onClick={() =>
                onFieldEdit({
                  field: 'actions',
                  oldValue: item.item.description,
                  itemField: 'description',
                  itemIndex: item.id,
                  fieldType: 'textarea',
                  action: 'UPDATE',
                })
              }
            />
          </span>
        )}
      </div>
      <div className="text-[#444444] group-hover:text-[#095b8d] transition-colors mt-auto pt-2 flex flex-wrap items-center gap-1">
        {item.item.link != null && <InertiaLink link={item.item.link} />}
        {editMode && onFieldEdit != null && (
          <span className='text-xs'>
            <EditLabel
              onClick={() =>
                onFieldEdit({
                  field: 'actions',
                  oldValue: item.item.link,
                  itemField: 'link',
                  itemIndex: item.id,
                  fieldType: 'link',
                  action: 'UPDATE',
                })
              }
            />
          </span>
        )}
      </div>
      {editMode && dispatch != null && (
        <span className='mt-2 self-start text-xs'>
          <EditLabel
            label='REMOVE'
            onClick={() =>
              dispatch({
                action: 'REMOVE_LIST_ITEM',
                blockId: blockData?.id,
                fieldName: 'actions',
                itemId: item.id,
              })
            }
          />
        </span>
      )}
    </div>
  );

  const renderSmallCard = (item: BlockInfo['actions']['items'][number]) => (
    <SmallCard
      key={item.id.toString()}
      item={item}
    />
  )

  return (
    <div className="w-full bg-[#F0F8FF] font-sans pb-16">
      <div className="cmpad pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {blockData?.actions?.items.slice(0, 2).map(renderSmallCard)}
          <div className="bg-[#095b8d] rounded-[16px] p-8 flex flex-col justify-between row-span-2 shadow-[0px_8px_30px_0px_#0000001A]">
            <div>
              <div className="bg-white w-[54px] h-[54px] rounded-full flex items-center justify-center mb-6 text-[#095b8d]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-white font-medium text-[24px] mb-4 leading-snug">Login and Registration</h3>
              <p className="text-[#E0F0FF] text-[14px] leading-[1.7] mb-8">
                Web portal for login and new registration, allowing promoters and agents to access services and manage registrations.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <a href="#" className="bg-white text-[#095b8d] font-medium text-[15px] py-3 px-4 rounded-[8px] text-center hover:bg-gray-100 transition-colors">
                Login
              </a>
              <a href="#" className="bg-transparent border border-white text-white font-medium text-[15px] py-3 px-4 rounded-[8px] text-center hover:bg-white hover:bg-opacity-10 transition-colors">
                Register
              </a>
            </div>
          </div>
          {blockData?.actions?.items.slice(2).map(renderSmallCard)}
        </div>
      </div>
      {editMode && (
        <div className='cmpad mt-6 flex justify-end'>
          <AddButton onClick={addNewAction} />
        </div>
      )}
    </div>
  )
}

export default ActionCarousel
