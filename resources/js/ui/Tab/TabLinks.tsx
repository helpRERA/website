import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { tabs } from '../../../libs/config/config_data';
import useScreen from '../../../libs/hooks/useScreen'
import ChevronLeft from '../icons/ChevronLeft';
import ChevronRight from '../icons/ChevronRight';

export interface TabLink {
  label: string;
  link: string;
  id: number;
}


interface Props {
  items: TabLink[];
  url: string;
}

const TabLinks = ({ items, url }: Props) => {

  const [selectedIndex, setSelectedIndex] = useState(-1)
  const screen = useScreen()
  const [visibleItems, setVisibleItems] = useState(1)
  const [currentTab, setCurrentTab] = useState(1)
  const [tabCount, setTabCount] = useState(1)
  const [fromItem, setFromItem] = useState(1)
  const [toItem, setToItem] = useState(1)

  useEffect(() => {
    const index = items.findIndex(tab => tab.link === url)
    setSelectedIndex(index)
  }, [url, items])

  useEffect(() => {
    setTabCount(Math.ceil(items.length / visibleItems))
  }, [items, visibleItems])

  useEffect(() => {
    setFromItem((currentTab - 1) * visibleItems)
    setToItem(currentTab * visibleItems)
  }, [currentTab, visibleItems])

  useEffect(() => {
    if (selectedIndex === -1) {
      return
    }
    let newVisibleItems = 4
    switch (screen) {
      case '':
        newVisibleItems = 2
        break
      case 'sm':
        newVisibleItems = 2
        break
      case 'md':
        newVisibleItems = 3
        break
      case 'lg':
        newVisibleItems = 4
        break
      case 'xl':
        newVisibleItems = 4
        break
      case '2xl':
        newVisibleItems = 5
        break
    }
    setCurrentTab(Math.ceil((selectedIndex + 1) / newVisibleItems))
    setVisibleItems(newVisibleItems)
  }, [screen, selectedIndex])


  const tabBack = () => {
    setCurrentTab(oldValue => {
      if (oldValue > 1) {
        return oldValue - 1
      }
      return oldValue
    })
  }

  const tabForward = () => {
    setCurrentTab(oldValue => {
      if (oldValue < tabCount) {
        return oldValue + 1
      }
      return oldValue
    })
  }


  return (
    <div className="flex w-full items-center">
      {currentTab !== 1 &&
        <button
          onClick={tabBack}
          className="bg-transparent text-dark hover:text-accent-dark grow px-1 md:px-2 pt-2 pb-1 self-end cursor-pointer"
        >
          <ChevronLeft />
        </button>
      }
      <div className={`grid gap-1 w-full shrink grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5`}
      >
        <>
          {
            items.map((item, index) => {
              return (
                <React.Fragment key={item.id.toString()}>
                  {((index + 1) > fromItem && (index + 1) <= toItem) &&
                    <Link
                      href={item.link}
                    >
                      <a
                        className={`flex  justify-center break-words items-end text-sm pt-2 pb-1 font-semibold"
                          rounded-t-md cursor-pointer ${index !== selectedIndex ? 'bg-white text-dark' : 'bg-accent-dark text-white'}`}
                      >
                        {item.label}
                      </a>
                    </Link>
                  }
                </React.Fragment>
              )
            })
          }
        </>
      </div>
      {tabCount > currentTab &&
        <button
          onClick={tabForward}
          className="bg-transparent text-dark hover:text-accent-dark grow px-1 md:px-2 self-end cursor-pointer pt-2 pb-1"
        >
          <ChevronRight />
        </button>
      }
    </div>
  )
}

export default TabLinks
