import React, { useState } from 'react'
import { Announcement, AnnouncementFile } from '../../../DataStructures/data_interfaces'
import Card from '../../../ui/card/Card'
import Button from '../../../ui/button/Button'
import AddButton from '../../../ui/button/AddButton'
import AnnouncementFileList from './AnnouncementDocuments/AnnouncementFileList'
import DeleteModal from '../../../ui/modal/DeleteModal'
import { router } from '@inertiajs/react'
import Tabs from '../../../ui/Tab/Tabs'
import CardHeader from '../../../ui/card/CardHeader'
import ManageAnnouncementTags from './AnnouncementTags/ManageAnnouncementTags'

interface Properties {
  announcement: Announcement
  files: AnnouncementFile[]
}

const tabs = [{ value: 'Documents' }, { value: 'Tags' }]

const AnnouncementView = ({ announcement, files }: Properties) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeTab, setActiveTab] = useState(tabs[0].value)

  const edit = () => {
    router.get(`/manage-announcements/${announcement.id}/edit`)
  }

  return (
    <>
      <Card>
        <CardHeader
          title={announcement.title}
          back={`/manage-announcements`}
        />
        <div className='my-5 grid  grid-cols-1 lg:grid-cols-5'>
          <div className='flex flex-col gap-8 lg:col-span-4'>
            <p className='text-base'>{announcement.description}</p>
            <div className='flex flex-wrap gap-5'>
              <Button
                label='EDIT'
                type='info'
                onClick={edit}
              />
              <Button
                label='DELETE'
                type='danger'
                onClick={() => setShowDeleteModal((old) => !old)}
              />
            </div>
          </div>
        </div>
        {showDeleteModal && (
          <DeleteModal
            url={`/manage-announcements/${announcement.id}`}
            setShowModal={setShowDeleteModal}
            title={`Delete ${announcement.type}`}
          >
            <p>Confirm Deleting {announcement.title}?</p>
          </DeleteModal>
        )}
      </Card>
      <div className='mt-5'>
        <Tabs
          items={tabs}
          selectedTab={activeTab}
          setSelectedTab={setActiveTab}
        />
      </div>
      {activeTab === 'Documents' && (
        <AnnouncementFileList
          announcement={announcement}
          files={files}
        />
      )}
      {activeTab === 'Tags' && <ManageAnnouncementTags announcement={announcement} />}
    </>
  )
}

export default AnnouncementView
