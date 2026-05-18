import React from 'react'
import Button from '../button/Button'
import Modal from './Modal'

interface Props {
  onUpdate: () => unknown;
  setShowModal: ((show: boolean) => any);
  title: string;
  children: JSX.Element;
  processing?: boolean;
}

export default function UpdateModal(
  {
    setShowModal,
    onUpdate,
    children,
    title,
    processing = false
  }: Props
) {
  return (
    <Modal setShowModal={setShowModal} title={title}>
      <div className="flex flex-col w-full p-2 gap-3">
        {children}
        <div className="flex w-full justify-end">
          <Button label="UPDATE" onClick={onUpdate} processing={processing} type="info" />
        </div>
      </div>
    </Modal>
  )
}
