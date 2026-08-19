export interface Model {
  id: number
  created_by: number | null
  updated_by: number | null
  created_at: string | null
  updated_at: string | null
  deleted_at: string | null
}

export interface ReferenceDomain extends Model {
  domain: string
  parameters?: DomainParameter[]
}

export interface DomainParameter extends Model {
  domain_id: number
  parameter: string
  has_second_value: number
}

export interface ReferenceCode extends Model {
  value_one: string
  value_two?: string
  parameter_id: number
  sort_order?: number
  domain_id: number
  domain?: string
  parameter?: string | null
}

export interface Announcement extends Model {
  title: string
  description: string
  type: string | null
  sub_type: string | null
  date: string
  published: 1 | 0
  ticker: 1 | 0
  title_malayalam: string | null
  description_malayalam: string | null
  documents?: AnnouncementFile[]
  tags?: AnnouncementTag[]
  is_new: number
  category: string | null
}

export interface AnnouncementTag extends Model {
  announcement_id: number
  tag: string
}

export interface UploadedFile extends Model {
  name: string
  url: string | null
  mime: string
}

export interface Image extends UploadedFile {
  name: string
  url: string | null
  mime: string
}

export interface AnnouncementFile extends Model {
  announcement_id: number
  document_id: number
  document?: UploadedFile
}

export interface Tag extends Model {
  tag: string
}

export const sortOrders = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
]

export interface Album extends Model {
  name: string
  name_malayalam: string | null
  description: string | null
  description_malayalam: string | null
  url: string
  cover_photo: string
  images?: AlbumImage[]
  published: number
  event_date: string | null
}

export interface AlbumImage extends Model {
  url: string
  caption: string
  album_id: number
  image_id: number
}

export interface GalleryVideo extends Model {
  caption: string
  caption_malayalam?: string
  description: string | null
  description_malayalam: string | null
  url: string
  published: number
  date: string | null
}

export interface DocumentsByType {
  DocID: string
  no_of_docs: number
  latest_date?: string
}

export interface ProjectType {
  id: number
  name: string
}

