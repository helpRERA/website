import { router } from '@inertiajs/react'
import { useState } from 'react'
import { District } from '../../DataStructures/krera_interfaces'
import useTalukData from '../../data_hooks/taluk-data'
import useVillage from '../../data_hooks/useVillage'
import useCustomForm from '../../hooks/useCustomForm'
import { localization } from '../../Localization/localization'
import Button from '../../ui/button/Button'
import DatePicker from '../../ui/form/DatePicker'
import Input from '../../ui/form/Input'
import SelectList from '../../ui/form/SelectList'
import { displayText } from '../../ui/Localization'
import { Language } from '../../ui/ui_interfaces'

interface Properties {
  districts: District[]
  lang?: Language
  oldProjectName?: string
  oldRegistrationNumber?: string
  oldDistrict?: string
  oldTaluk?: string
  oldVillage?: string
  oldWorkStatus?: string
  oldFrom?: string
  oldTo?: string
  oldPromoterName?: string
}

const workStatus = [
  { value: 'completed', label: 'Completed Projects As Per Promoter' },
  { value: 'In Progress', label: 'In Progress Projects' },
]

const ProjectListFilter = ({
  districts,
  lang = 'en',
  oldProjectName = '',
  oldPromoterName = '',
  oldRegistrationNumber = '',
  oldDistrict = '',
  oldTaluk = '',
  oldVillage = '',
  oldWorkStatus = '',
  oldFrom = '',
  oldTo = '',
}: Properties) => {
  const [processing, setProcessing] = useState(false)
  const { form, setFormValue } = useCustomForm({
    project_name: oldProjectName,
    registration_number: oldRegistrationNumber,
    district: oldDistrict,
    taluk: oldTaluk,
    village: oldVillage,
    promoter_name: oldPromoterName,
    work_status: oldWorkStatus,
    from: oldFrom,
    to: oldTo,
  })

  const taluks = useTalukData(Number(form.district))
  const villages = useVillage(form.taluk)

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProcessing(true)
    router.get(
      '/projects',
      {
        ...form,
      },
      {
        onFinish: () => setProcessing(false),
      }
    )
  }

  return (
    <>
      <form
        className='my-10 flex flex-col gap-5'
        onSubmit={submitForm}
      >
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col'>
            <Input
              label='Project Name'
              data={form.project_name}
              setData={setFormValue('project_name')}
            />
          </div>
          <div className='flex flex-col'>
            <Input
              label='Promoter Name'
              data={form.promoter_name}
              setData={setFormValue('promoter_name')}
            />
          </div>
          <div className='flex flex-col'>
            <Input
              label='Registration Number'
              data={form.registration_number}
              setData={setFormValue('registration_number')}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col'>
            <SelectList
              label={'Work Status'}
              list={workStatus}
              data={form.work_status}
              dataKey='value'
              displayKey='label'
              setData={setFormValue('work_status')}
              showAllOption
              allOptionText={`All`}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col'>
            <SelectList
              list={districts}
              data={form.district}
              dataKey='Districtcode'
              displayKey='Districtname'
              setData={setFormValue('district')}
              placeholder='Select District'
              showAllOption
              allOptionText={`${displayText(localization['All Districts'], lang)}`}
            />
          </div>
          <div className='flex flex-col'>
            <SelectList
              list={taluks}
              data={form.taluk}
              dataKey='Subdistrictcode'
              displayKey='SubDistrictname'
              setData={setFormValue('taluk')}
              placeholder='Select Taluk'
              showAllOption
              allOptionText={`${displayText(localization['All Taluks'], lang)}`}
            />
          </div>
          <div className='flex flex-col'>
            <SelectList
              list={villages}
              data={form.village}
              dataKey='Villagecode'
              displayKey='Villagename'
              setData={setFormValue('village')}
              placeholder='Select Village'
              showAllOption
              allOptionText={`All Villages`}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col'>
            <DatePicker
              label='Proposed Date of Completion From'
              data={form.from}
              setData={setFormValue('from')}
            />
          </div>
          <div className='flex flex-col'>
            <DatePicker
              label='To Date'
              data={form.to}
              setData={setFormValue('to')}
            />
          </div>
        </div>
        <div className='flex flex-wrap gap-5'>
          <Button
            label='SEARCH'
            processing={processing}
          />
          <Button
            label='RESET'
            type='secondary'
            buttonType='button'
            onClick={() => router.get('/projects')}
          />
        </div>
      </form>{' '}
    </>
  )
}

export default ProjectListFilter
