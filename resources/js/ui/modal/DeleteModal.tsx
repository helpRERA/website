import React, { useState } from 'react'
import Button from '../button/Button'
import Modal from './Modal'
import { useForm } from '@inertiajs/react'

interface Properties {
  setShowModal: (show: boolean) => any
  title: string
  children: JSX.Element
  url: string
}

export default function DeleteModal({ setShowModal, children, title, url }: Properties) {
  const { data, post, processing } = useForm({
    _method: 'DELETE',
  })

  const onDelete = () => {
    post(url, {
      preserveState: false,
    })
  }

  return (
    <Modal
      setShowModal={setShowModal}
      title={title}
    >
      <div className='flex w-full flex-col gap-3 p-2'>
        {children}
        <div className='flex w-full justify-end'>
          <Button
            label='DELETE'
            onClick={onDelete}
            processing={processing}
            type='danger'
          />
        </div>
      </div>
    </Modal>
  )
}
