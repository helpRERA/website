import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Image } from '../../../DataStructures/data_interfaces'
import { handleHttpErrors } from '../../../ui/alerts'
import Input from '../../../ui/form/Input'
import FullSpinnerWrapper from '../../../ui/FullSpinnerWrapper'

interface Properties {
  onSelect: (file: Image) => void
}

const SelectUploadedImage = ({ onSelect }: Properties) => {
  const [fileName, setFileName] = useState('')
  const [files, setFiles] = useState<Image[]>([])
  const [processing, setProcessing] = useState(false)

  const fetchData = useCallback(() => {
    setProcessing(true)
    axios
      .get(`/image-search?search=${fileName}`)
      .then((result) => setFiles(result.data))
      .catch(handleHttpErrors)
      .finally(() => setProcessing(false))
  }, [fileName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col'>
        <Input
          label='Search'
          setData={setFileName}
          data={fileName}
        />
      </div>
      <FullSpinnerWrapper processing={processing}>
        <div className='grid grid-cols-2 gap-5 p-5 md:grid-cols-3 lg:grid-cols-4'>
          {files.map((file) => (
            <div
              key={file.id.toString()}
              className='flex cursor-pointer gap-2 rounded-md bg-neutral-600 px-5 py-3 shadow hover:bg-neutral-500 hover:shadow-lg'
              onClick={() => onSelect(file)}
            >
              <img
                src={file.url ?? ''}
                alt={file.name}
                className='aspect-[4/3] w-full'
              />
            </div>
          ))}
        </div>
      </FullSpinnerWrapper>
    </div>
  )
}

export default SelectUploadedImage
