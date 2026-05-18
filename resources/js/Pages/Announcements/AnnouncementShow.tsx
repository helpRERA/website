import React from 'react'
import AnnouncementView from '../../Components/AdminPages/Announcement/AnnouncementView'
import { Announcement, AnnouncementFile } from '../../DataStructures/data_interfaces'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'

interface Properties {
  announcement: Announcement
  files: AnnouncementFile[]
}

const AnnouncementShow = ({ announcement, files }: Properties) => {
  return (
    <PaddedDashboardContent>
      <AnnouncementView
        announcement={announcement}
        files={files}
      />
    </PaddedDashboardContent>
  )
}

export default AnnouncementShow
