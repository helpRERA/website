import { router } from '@inertiajs/react'
import { FormEvent, useCallback, useState } from 'react'
import { Image } from '../../../../DataStructures/data_interfaces'
import Button from '../../../../ui/button/Button'
import CardHeader from '../../../../ui/card/CardHeader'
import Input from '../../../../ui/form/Input'
import Modal from '../../../../ui/modal/Modal'
import { Paginator } from '../../../../ui/ui_interfaces'
import UploadNewImage from '../../../Common/ImageUpload/UploadNewImage'
import ManageImageList from './ManageImageList'

interface Properties {
  images: Paginator<Image>
}

const ManageImages = ({ images }: Properties) => {
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
    <div className='w-full'>
      <CardHeader
        title='Images'
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
      <ManageImageList images={images} />
      {showAdd && (
        <Modal
          title='Upload New File'
          setShowModal={setShowAdd}
        >
          <div className='p-2'>
            <UploadNewImage onUpload={newFile} />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ManageImages
