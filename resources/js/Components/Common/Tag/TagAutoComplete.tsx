import axios from 'axios'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Tag } from '../../../DataStructures/data_interfaces'
import useClick from '../../../hooks/useClick'
import { handleHttpErrors } from '../../../ui/alerts'
import Input from '../../../ui/form/Input'

interface Properties {
  onTagSelect: (tag: string) => unknown
}

const TagAutoComplete = ({ onTagSelect }: Properties) => {
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState<Tag[]>([])
  const listReference = useRef<HTMLDivElement | null>(null)
  const [clickTarget] = useClick()
  const [selectedDropDown, setSelectedDropDown] = useState(0)

  useEffect(() => {
    if (listReference.current?.contains(clickTarget) !== true) {
      setTags([])
    }
  }, [clickTarget])

  const fetchData = useCallback(async () => {
    try {
      setSelectedDropDown(0)
      if (tag == '') {
        setTags([])
        return
      }
      const response = await axios.get(`/tags?search=${tag}`)
      setTags([
        {
          tag: tag,
          id: 0,
        },
        ...response.data,
      ])
    } catch (error) {
      handleHttpErrors(error)
    }
  }, [tag])

  const selectFormList = (tag: string) => {
    onTagSelect(tag)
    setTag('')
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && selectedDropDown < tags.length) {
      selectFormList(tags[selectedDropDown].tag)
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (selectedDropDown === null) {
        setSelectedDropDown(0)
      } else if (selectedDropDown < tags.length - 1) {
        setSelectedDropDown(selectedDropDown + 1)
      }
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (selectedDropDown !== null && selectedDropDown > 0) {
        setSelectedDropDown(selectedDropDown - 1)
      }
    }
  }

  useEffect(() => {
    console.log(selectedDropDown)
  }, [selectedDropDown])

  return (
    <div className='flex flex-col'>
      <div
        className='relative flex w-full flex-col md:w-1/2'
        ref={listReference}
      >
        <div className='flex flex-col'>
          <label className='mb-1 text-sm tracking-normal text-gray-800'>Enter Tag</label>
          <input
            type='text'
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className='bg-accent-light rounded-lg border border-gray-300 py-3 pl-3 text-sm text-gray-800
            shadow-sm focus:border-indigo-700 focus:outline-none disabled:bg-gray-100'
            onKeyDown={handleKeyDown}
          />
        </div>
        {tags.length > 0 && (
          <div className='absolute top-full z-10 w-full rounded bg-gray-100 pt-2 shadow'>
            <>
              {tags.map((item, index) => {
                return (
                  <div
                    key={item.tag}
                    className={`${
                      selectedDropDown === index ? 'bg-gray-200' : ''
                    } flex cursor-pointer flex-wrap p-2 text-sm hover:bg-gray-200 hover:font-semibold`}
                    onClick={() => selectFormList(item.tag)}
                  >
                    {item.tag}
                  </div>
                )
              })}
            </>
          </div>
        )}
      </div>
    </div>
  )
}

export default TagAutoComplete
