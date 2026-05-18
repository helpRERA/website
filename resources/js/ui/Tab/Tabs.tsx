import React from 'react'
import Dropdown from '../button/DropDown'
import { Language } from '../ui_interfaces'
import Localization from '../Localization'

interface Properties {
  items: TabItem[]
  selectedTab: string
  setSelectedTab: (tabName: string) => void
  lang?: Language
}

interface TabItem {
  value: string
  value_malayalam?: string
  subtitle?: string
  subtitleMalayalam?: string
}

const Tabs = ({ items, selectedTab, setSelectedTab, lang = 'en' }: Properties) => {
  return (
    <div className='flex w-full items-center'>
      <div
        className={`hidden w-full shrink grid-cols-2 gap-1 md:grid-cols-3 lg:grid lg:grid-cols-4 2xl:grid-cols-5`}
      >
        <>
          {items.map((item) => {
            return (
              <button
                key={item.value}
                className={`flex-1 border-r border-x-gray-200 px-5 py-6 hover:bg-indigo-50
                  ${selectedTab === item.value ? ' border-b-2 border-y-indigo-700  ' : ''}
                `}
                onClick={() => setSelectedTab(item.value)}
              >
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium text-gray-800'>
                    <Localization
                      text={{ english: item.value, malayalam: item.value_malayalam ?? '' }}
                      language={lang}
                    />
                  </p>
                  {item.subtitle != null && (
                    <p className='text-xs text-gray-500'>
                      <Localization
                        text={{ english: item.subtitle, malayalam: item.subtitleMalayalam ?? '' }}
                        language={lang}
                      />
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </>
      </div>
      <div className='flex w-full flex-col lg:hidden'>
        <Dropdown
          list={items}
          dataKey='value'
          displayKey='value'
          data={selectedTab}
          setData={setSelectedTab}
        />
      </div>
    </div>
  )
}

export default Tabs
