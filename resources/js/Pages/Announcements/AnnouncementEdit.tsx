import React from 'react'
import { Announcement } from '../../DataStructures/data_interfaces'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import EditAnnouncementForm from '../../Components/AdminPages/Announcement/EditAnnouncementForm'

interface Properties {
  announcement: Announcement
}

const AnnouncementEdit = ({ announcement }: Properties) => {
  return (
    <PaddedDashboardContent>
      <EditAnnouncementForm announcement={announcement} />
    </PaddedDashboardContent>
  )
}

export default AnnouncementEdit
