import { Slide } from 'pure-react-carousel'
import React, { useCallback, useEffect, useState } from 'react'
import { Block } from '../../../DataStructures/ui_builder_interfaces'
import useWindowResize from '../../../hooks/useWindowResize'
import AddButton from '../../../ui/button/AddButton'
import EditLabel from '../../../ui/button/EditLabel'
import InertiaLink from '../../../ui/Link/InertiaLink'
import Localization from '../../../ui/Localization'
import Slideshow from '../../../ui/SlideShow/SlideShow'
import { Language } from '../../../ui/ui_interfaces'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import { BlockConfiguration, linkActionBlock, LinkActionData } from '../DefaultBlockData'
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
  const width = useWindowResize()
  const [visibleSlides, setVisibleSlides] = useState(3)

  useEffect(() => {
    if (width > 1024) {
      setVisibleSlides(4)
      return
    }
    if (width > 768) {
      setVisibleSlides(3)
      return
    }
    setVisibleSlides(1)
  }, [width])

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

   

  return (
    <AppLayoutPadding>
      <div
        className={`${blockData?.marginTop} ${blockData?.marginBottom} ${blockData?.paddingTop} ${blockData?.paddingBottom}`}
      >
        <Slideshow
          totalSlides={blockData == null ? 0 : blockData.actions.items.length}
          visibleSlides={visibleSlides}
          currentSlide={0}
          isPlaying={true}
          interval={2000}
          infinite={true}
        >
          <div className='flex w-full py-10'>
            {blockData?.actions.items.map((item, index) => {
              return (
                <Slide
                  key={item.id.toString()}
                  index={index}
                  className='my-10 flex h-full justify-center  px-5'
                >
                  <div className='flex h-full w-full flex-col items-center bg-primary-50 p-6 py-10 text-center shadow-lg'>
                    <div dangerouslySetInnerHTML={{ __html: item.item.svg.english ?? '' }}></div>
                    {editMode && onFieldEdit != null && (
                      <div>
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
                       
                      </div>
                    )}
                    <p className=' mt-3  text-lg font-semibold leading-5 text-gray-800 md:text-xl'>
                      <Localization
                        language={language}
                        text={item.item.title}
                      />
                      {editMode && onFieldEdit != null && (
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
                      )}
                    </p>
                    <p className=' my-2  text-sm font-normal leading-6 text-gray-600 md:text-base'>
                      <Localization
                        language={language}
                        text={item.item.description}
                      />
                      {editMode && onFieldEdit != null && (
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
                      )}
                    </p>
                    <div className='self mt-auto'>
                      {item.item.link != null && (
                        <InertiaLink
                          link={item.item.link}
                          className='cursor-pointer border-b-2 border-gray-800 text-sm  font-medium leading-4 text-gray-800 hover:text-gray-600 md:text-base '
                        />
                      )}
                      {editMode && onFieldEdit != null && (
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
                      )}
                    </div>
                    {editMode && dispatch != null && (
                      <div>
                        <span
                          className='cursor-pointer text-red-500 hover:font-bold hover:text-red-600'
                          onClick={() =>
                            dispatch({
                              action: 'REMOVE_LIST_ITEM',
                              blockId: blockData?.id,
                              fieldName: 'actions',
                              itemId: item.id,
                            })
                          }
                        >
                          [REMOVE]
                        </span>
                      </div>
                    )}
                  </div>
                </Slide>
              )
            })}
          </div>
        </Slideshow>
      </div>
      {editMode && (
        <div className='my-10 flex justify-end'>
          <AddButton onClick={addNewAction} />
        </div>
      )}
    </AppLayoutPadding>
  )
}

export default ActionCarousel
