import { router } from '@inertiajs/react'
import React, { useState } from 'react'
import { HalfImageBlock, imageBlock } from '../DefaultBlockData'
import { BlocKFieldInfo, BlockFieldValues } from '../../AdminPages/PageBuilder/BlockEditor'
import { BlockFieldTypes } from '../PageBuilder/BlockEditor'
import Localization from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import AppLayoutPadding from '../../Layout/AppLayout/AppLayoutPadding'
import { localization } from '../../../Localization/localization'

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: HalfImageBlock
  language?: Language
}

const HomeSearch = ({
  editMode = false,
  onFieldEdit,
  blockData = imageBlock,
  language = 'en',
}: Properties) => {
  const [search, setSearch] = useState('')

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (search.length > 0) {
      router.get(`/explore-projects?search=${search}`)
    }
  }

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
    <AppLayoutPadding>
      <div className='overflow-y-hidden'>
        <div className='pb-16'>
          {/* Code block starts */}
          <section className='py-12 px-4 md:px-6 lg:px-20 2xl:container 2xl:mx-auto'>
            <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8'>
              <div className='hidden w-full items-center md:w-1/2 lg:block'>
                <img
                  loading='lazy'
                  className='rounded'
                  src='/imge/search.png'
                  alt='Explore Projects'
                  role='img'
                />
              </div>
              <div className='flex w-full flex-col justify-center md:w-1/2'>
                <div>
                  <h3
                    role='heading'
                    className='text-2xl font-semibold leading-6 text-gray-800 xl:text-4xl xl:leading-10'
                  >
                    <Localization
                      text={localization['Explore Projects']}
                      language={language}
                    />{' '}
                  </h3>
                  <p
                    role='contentinfo'
                    className='pt-2 text-base text-gray-600 lg:pt-4 xl:text-xl xl:leading-normal'
                  >
                    <Localization
                      text={localization['Search for a project by location or developer..']}
                      language={language}
                    />
                  </p>
                  <form
                    onClick={handleFormSubmit}
                    className='my-8 mt-8 w-full items-center rounded border border-gray-400 p-2 sm:flex md:px-4 lg:w-4/5 xl:mt-12 '
                    aria-label='Input Email'
                  >
                    <input
                      type='email'
                      className='w-full py-2 text-base placeholder-gray-400 focus:outline-none md:w-7/12 lg:w-full'
                      placeholder='Search...'
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                    <div className='mt-4 w-full justify-end sm:mt-0 sm:flex sm:w-5/12'>
                      <button className='f-m-m w-full rounded bg-primary-900 px-4 py-2.5 text-base font-normal leading-4 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 sm:w-auto md:py-2 md:px-8 md:text-base'>
                        Explore
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Code block ends */}
        </div>
      </div>
    </AppLayoutPadding>
  )
}

export default HomeSearch
