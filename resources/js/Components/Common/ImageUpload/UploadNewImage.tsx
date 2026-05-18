import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { Image } from '../../../DataStructures/data_interfaces'
import { handleHttpErrors, showError } from '../../../ui/alerts'
import Button from '../../../ui/button/Button'
import FileSelect from '../../../ui/form/FileSelect'
import Input from '../../../ui/form/Input'
import { CreateResponse } from '../../../ui/ui_interfaces'

interface Properties {
  onUpload: (file: Image) => void
}

const UploadNewImage = ({ onUpload }: Properties) => {
  const [processing, setProcessing] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')

  const uploadFile = useCallback(() => {
    setProcessing(true)
    axios
      .post(
        '/image-upload',
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
      .then((result: CreateResponse<Image>) => {
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
          label='Image Caption'
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

export default UploadNewImage
