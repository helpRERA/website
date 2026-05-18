import { router } from '@inertiajs/react'
import React, { FormEvent, useCallback, useState } from 'react'
import { UploadedFile } from '../../../../DataStructures/data_interfaces'
import Button from '../../../../ui/button/Button'
import Card from '../../../../ui/card/Card'
import CardHeader from '../../../../ui/card/CardHeader'
import Input from '../../../../ui/form/Input'
import Modal from '../../../../ui/modal/Modal'
import { Paginator } from '../../../../ui/ui_interfaces'
import UploadNewFile from '../../../Common/FIleUpload/UploadNewFile'
import ManageDocumentList from './ManageDocumentList'

interface Properties {
  documents: Paginator<UploadedFile>
}

const ManageDocuments = ({ documents }: Properties) => {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const submitSearch = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      router.reload({
        data: {
          search: search,
        },
      })
    },
    [search]
  )

  const newFile = useCallback(() => {
    setShowAdd(false)
    router.reload()
  }, [])

  return (
    <Card>
      <CardHeader
        title='Documents'
        onAdd={() => setShowAdd(true)}
      />
      <form
        className='my-5 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4'
        onClick={submitSearch}
      >
        <div className='flex flex-col'>
          <Input
            placeholder='Search...'
            data={search}
            setData={setSearch}
          />
        </div>
        <div className='flex items-center'>
          <Button label='search' />
        </div>
      </form>
      <ManageDocumentList documents={documents} />
      {showAdd && (
        <Modal
          title='Add New File'
          setShowModal={setShowAdd}
        >
          <div className='p-2'>
            <UploadNewFile onUpload={newFile} />
          </div>
        </Modal>
      )}
    </Card>
  )
}

export default ManageDocuments
