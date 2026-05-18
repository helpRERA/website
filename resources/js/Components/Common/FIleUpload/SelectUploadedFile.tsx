import React, { useCallback, useEffect, useState } from 'react'
import Input from '../../../ui/form/Input'
import axios from 'axios'
import { handleHttpErrors } from '../../../ui/alerts'
import { UploadedFile } from '../../../DataStructures/data_interfaces'
import FullSpinnerWrapper from '../../../ui/FullSpinnerWrapper'
import { getDisplayDate } from '../../../libs/dates'
import ButtonBorderIcon from '../../../ui/button/ButtonBorderIcon'
import { CheckBadgeIcon, CheckCircleIcon } from '@heroicons/react/20/solid'

interface Properties {
  onUpload: (file: UploadedFile) => void
}

const SelectUploadedFile = ({ onUpload }: Properties) => {
  const [fileName, setFileName] = useState('')
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [processing, setProcessing] = useState(false)

  const fetchData = useCallback(() => {
    setProcessing(true)
    axios
      .get(`/file-search?search=${fileName}`)
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
        <div className='grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-4'>
          {files.map((file) => (
            <div
              key={file.id}
              onClick={() => onUpload(file)}
              className='flex cursor-pointer gap-2 rounded-md bg-neutral-600 px-5 py-3 shadow hover:bg-neutral-500 hover:shadow-lg'
            >
              <div className='flex flex-grow flex-col gap-2'>
                <div className='flex flex-row gap-2'>
                  <span className='text-xl'>{file.name}</span>
                </div>
                <div className='flex flex-row gap-2'>
                  <span className='text-sm'>Uploaded At</span>
                  <span className='text-sm font-bold'>{getDisplayDate(file.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FullSpinnerWrapper>
    </div>
  )
}

export default SelectUploadedFile
