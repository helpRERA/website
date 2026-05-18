import React from 'react'
import Input from './Input'
import SearchSolid from '../icons/SearchSolid'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

interface Properties {
  data: string
  setData: (value: string) => void
  placeholder: string
}

const SearchField = ({ data, setData, placeholder }: Properties) => {
  return (
    <div className='relative flex w-full  flex-col'>
      <MagnifyingGlassIcon className='absolute right-2 top-[50%] -mt-2 h-6 w-6' />
      <Input
        placeholder={placeholder}
        data={data}
        setData={setData}
      />
    </div>
  )
}

export default SearchField
