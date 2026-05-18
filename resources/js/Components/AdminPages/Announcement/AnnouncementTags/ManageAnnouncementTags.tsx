import { router } from '@inertiajs/react'
import { Announcement } from '../../../../DataStructures/data_interfaces'
import use419Error from '../../../../hooks/use419Error'
import BorderedPill from '../../../../ui/Pills/BorderedPill'
import TagAutoComplete from '../../../Common/Tag/TagAutoComplete'

interface Properties {
  announcement: Announcement
}

const ManageAnnouncementTags = ({ announcement }: Properties) => {
  use419Error()

  const addTag = (tag: string) => {
    router.post(`/announcement-tags`, {
      tag,
      announcement_id: announcement.id,
    })
  }

  const deleteTag = (tagId: number) => {
    router.delete(`/announcement-tags/${tagId}`)
  }

  return (
    <div className='flex flex-col gap-8 lg:col-span-4'>
      <TagAutoComplete onTagSelect={addTag} />
      <div className='flex flex-wrap gap-4'>
        {announcement.tags?.map((tag) => {
          return (
            <BorderedPill
              value={tag.tag}
              key={tag.id.toString()}
              onClose={() => deleteTag(tag.id)}
            />
          )
        })}
      </div>
      {announcement.tags?.length === 0 && (
        <div className=''>
          <span>{announcement.type} Has No Tags Attached To IT</span>
        </div>
      )}
    </div>
  )
}

export default ManageAnnouncementTags
