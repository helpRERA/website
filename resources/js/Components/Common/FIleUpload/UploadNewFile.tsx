import React, { useCallback, useState } from 'react'
import Input from '../../../ui/form/Input'
import FileSelect from '../../../ui/form/FileSelect'
import Button from '../../../ui/button/Button'
import axios from 'axios'
import { handleHttpErrors, showError } from '../../../ui/alerts'
import { CreateResponse } from '../../../ui/ui_interfaces'
import { UploadedFile } from '../../../DataStructures/data_interfaces'

interface Properties {
  onUpload: (file: UploadedFile) => void
}

const UploadNewFile = ({ onUpload }: Properties) => {
  const [processing, setProcessing] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')

  const uploadFile = useCallback(() => {
    setProcessing(true)
    axios
      .post(
        '/file-upload',
        {
          file: file,
          name: fileName,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((result: CreateResponse<UploadedFile>) => {
        if (result.data.created && result.data.record != null) {
          onUpload(result.data.record)
          return
        }
        showError(result.data.message)
      })
      .catch(handleHttpErrors)
      .finally(() => setProcessing(false))
  }, [fileName, file, onUpload])

  return (
    <div className='mt-5 flex flex-col gap-5'>
      <div className='flex flex-col'>
        <Input
          label='FileName'
          data={fileName}
          setData={setFileName}
        />
      </div>
      <div className='flex flex-col'>
        <FileSelect setData={setFile} />
      </div>
      <div className='flex'>
        <Button
          label='UPLOAD'
          processing={processing}
          onClick={uploadFile}
        />
      </div>
    </div>
  )
}

export default UploadNewFile
