import Input from '../../../ui/form/Input'
import TextArea from '../../../ui/form/TextArea'
import DatePicker from '../../../ui/form/DatePicker'
import useReferenceValue from '../../../data_hooks/useReferenceValue'
import SelectList from '../../../ui/form/SelectList'
import useCascadedReferenceData from '../../../data_hooks/useCascadedReferenceData'
import CheckBox from '../../../ui/form/CheckBox'
import CategoryMultiSelect from '../../../ui/form/CategoryMultiSelect'



export const ANNOUNCEMENT_CATEGORIES = [
  { value_one: 'Project' },
  { value_one: 'Promoters' },
  { value_one: 'Agents' },
  { value_one: 'Legal' },
  { value_one: 'Others' },
]

export interface AnnouncementFormFields {
  title: string
  title_malayalam: string
  description: string
  description_malayalam: string
  date: string
  type: string
  sub_type: string
  published: boolean
  ticker: boolean
  is_new: boolean
  category: string[]
}

interface Properties<T> {
  form: T
  setFormValue: (key: keyof T) => (value: T[keyof T]) => void
  toggleBoolean: (key: keyof T) => () => unknown
  errors: Record<keyof T, string | undefined>
}

export default function AnnouncementForm({
  form,
  setFormValue,
  toggleBoolean,
  errors,
}: Properties<AnnouncementFormFields>) {
  const [types] = useReferenceValue('Announcement', 'Type')

  const [subTypes] = useCascadedReferenceData('Announcement', 'Sub Type', form.type)

  return (
    <div className='my-10 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2'>
      <div className='flex flex-col'>
        <Input
          label='Announcement Title *'
          setData={setFormValue('title')}
          data={form.title}
          error={errors.title}
        />
      </div>
      <div className='flex flex-col'>
        <Input
          label='Announcement Title (Malayalam)'
          setData={setFormValue('title_malayalam')}
          data={form.title_malayalam}
          error={errors.title_malayalam}
        />
      </div>

      <div className='flex flex-col'>
        <TextArea
          label='Announcement Description *'
          setData={setFormValue('description')}
          data={form.description}
          error={errors.description}
        />
      </div>
      <div className='flex flex-col'>
        <TextArea
          label='Announcement Description (Malayalam)'
          setData={setFormValue('description_malayalam')}
          data={form.description_malayalam}
          error={errors.description_malayalam}
        />
      </div>

      <div className='flex flex-col'>
        <DatePicker
          label='Date *'
          setData={setFormValue('date')}
          data={form.date}
          error={errors.date}
        />
      </div>
      <div className='flex flex-col'>
        <CategoryMultiSelect
          label='Category *'
          setData={setFormValue('category')}
          data={form.category}
          list={ANNOUNCEMENT_CATEGORIES}
          error={errors.category}
        />
      </div>

      <div className='flex flex-col'>
        <SelectList
          label='Type *'
          setData={setFormValue('type')}
          data={form.type}
          list={types}
          dataKey='value_one'
          displayKey='value_one'
          error={errors.type}
        />
      </div>
      <div className='flex flex-col'>
        <SelectList
          label='Sub Type *'
          setData={setFormValue('sub_type')}
          data={form.sub_type}
          list={subTypes}
          dataKey='value_one'
          displayKey='value_one'
          error={errors.sub_type}
        />
      </div>

      {/* Checkboxes grouped in one row, spanning both columns */}
      <div className='flex flex-wrap items-center gap-8 md:col-span-2'>
        <CheckBox
          label='Published'
          data={form.published}
          toggle={toggleBoolean('published')}
        />
        <CheckBox
          label='Publish to Ticker'
          data={form.ticker}
          toggle={toggleBoolean('ticker')}
        />
        <CheckBox
          label='Mark as Important'
          data={form.is_new}
          toggle={toggleBoolean('is_new')}
        />
      </div>
    </div>
  )
}
