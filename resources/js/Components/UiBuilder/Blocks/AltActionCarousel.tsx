import {
  BlockConfiguration,
  ItemListField,
  loremIpsum,
  placeholderImage,
  placeholderTitle,
} from '../DefaultBlockData'
import {
  Block,
  BlockImage,
  LinkData,
  TextData,
} from '../../../DataStructures/ui_builder_interfaces'
import { PageBuilderAction } from '../PageBuilder/pageBuilderService'
import { Language } from '../../../ui/ui_interfaces'
import { BlocKFieldInfo } from '../PageBuilder/BlockEditor'
import Localization from '../../../ui/Localization'
import { useCallback, useEffect, useState } from 'react'
import useWindowResize from '../../../hooks/useWindowResize'
import EditLabel from '../../../ui/button/EditLabel'
import { Slide } from 'pure-react-carousel'
import AddLabel from '../AddLabel'
import InertiaLink from '../../../ui/Link/InertiaLink'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import SlideShowTopButton from '../../../ui/SlideShow/SlideShowTopButton'

export interface ImageActionCard {
  id?: number
  image: BlockImage
  title: TextData
  link: LinkData
}

export interface AltActionCarouselBlock extends Block, BlockConfiguration {
  title: TextData
  description: TextData
  actions: ItemListField<ImageActionCard>
}

export const defaultImageActionBlock = {
  description: { english: placeholderTitle, malayalam: '' },
  title: { english: loremIpsum, malayalam: '' },
  actions: {
    lastUUID: 0,
    items: [],
  },
}

const defaultImageActionCard: ImageActionCard = {
  image: placeholderImage,
  title: { english: loremIpsum, malayalam: '' },
  link: {
    external: false,
    link: '',
    name: { english: loremIpsum, malayalam: '' },
  },
}

export interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: AltActionCarouselBlock
  language?: Language
  dispatch?: React.Dispatch<PageBuilderAction>
}

export default function AltActionCarousel({
  editMode,
  onFieldEdit,
  blockData,
  language = 'en',
  dispatch,
}: Properties) {
  const width = useWindowResize()
  const [visibleSlides, setVisibleSlides] = useState(3)

  useEffect(() => {
    if (width > 1024) {
      setVisibleSlides(3)
      return
    }
    if (width > 768) {
      setVisibleSlides(2)
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
        fieldValue: defaultImageActionCard,
      })
    }
  }, [dispatch, blockData])

  return (
    <AppLayoutPadding>
      <div className='flex flex-col items-start justify-between py-12 lg:flex-row lg:items-center'>
        <div className='flex w-full flex-col items-start justify-start px-4 lg:w-1/3'>
          <h1 className='text-xl font-semibold leading-6 md:text-2xl xl:text-4xl xl:leading-10'>
            <Localization
              text={blockData?.title}
              language={language}
            />
            {editMode && onFieldEdit != null && (
              <EditLabel
                onClick={() =>
                  onFieldEdit({
                    action: 'INSERT',
                    field: 'title',
                    fieldType: 'text',
                    oldValue: blockData?.title,
                  })
                }
              />
            )}
          </h1>
          <p className='mt-4 text-base leading-normal text-gray-600'>
            <Localization
              text={blockData?.description}
              language={language}
            />
            {editMode && onFieldEdit != null && (
              <EditLabel
                onClick={() =>
                  onFieldEdit({
                    action: 'UPDATE',
                    field: 'description',
                    fieldType: 'textarea',
                    oldValue: blockData?.description,
                  })
                }
              />
            )}
          </p>
        </div>
        <div className='flex w-full flex-col px-2 lg:w-2/3'>
          <SlideShowTopButton
            totalSlides={blockData == null ? 0 : blockData.actions.items.length}
            visibleSlides={visibleSlides}
            currentSlide={0}
        isPlaying={true}
        infinite={true}
        interval={3000}
          >
            <div className='flex h-full w-full py-5'>
              {blockData?.actions.items.map((item, index) => {
                return (
                  <Slide
                    key={item.id.toString()}
                    index={index}
                    className='my-10 flex h-full justify-center px-5'
                  >
                    <div className='flex h-full flex-col gap-3 bg-primary-100 shadow'>
                      <div className='group relative flex cursor-pointer items-center justify-center rounded-t-xl'>
                        <img
                          className='aspect-square  w-full rounded-t-xl object-cover object-center'
                          src={item.item.image.url ?? ''}
                          alt={item.item.title.english ?? ''}
                        />
                      </div>
                      <div>
                        {editMode && onFieldEdit != null && (
                          <EditLabel
                            onClick={() =>
                              onFieldEdit({
                                field: 'actions',
                                oldValue: null,
                                itemField: 'image',
                                itemIndex: item.id,
                                fieldType: 'image',
                                action: 'UPDATE',
                              })
                            }
                          />
                        )}
                      </div>
                      <div className='flex w-full flex-col items-start justify-between rounded-b-xl  bg-primary-100 px-4 py-6'>
                        <p className='mt-3 text-base font-semibold leading-none text-gray-800'>
                          <Localization
                            text={item.item.title}
                            language={language}
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
                        <InertiaLink
                          className='mt-6 flex items-center justify-start space-x-3 text-sm leading-none text-blue-700
                           transition duration-500 ease-in-out hover:-translate-y-1'
                          link={item.item.link}
                        />
                        {editMode && onFieldEdit != null && (
                          <EditLabel
                            label='Edit Link'
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
                        {editMode && dispatch != null && (
                          <EditLabel
                            label='REMVOVE SLIDE'
                            onClick={() => {
                              dispatch({
                                action: 'REMOVE_LIST_ITEM',
                                blockId: blockData?.id,
                                fieldName: 'actions',
                                itemId: item.id,
                              })
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </Slide>
                )
              })}
            </div>
          </SlideShowTopButton>
          {editMode && onFieldEdit != null && (
            <div>
              <AddLabel
                label='ADD SLIDE'
                onClick={addNewAction}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayoutPadding>
  )
}
