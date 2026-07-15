import React, { useCallback } from 'react'
import SelectList from '../../../ui/form/SelectList'
import useTalukData from '../../../data_hooks/taluk-data'
import RangeSlider from '../../../ui/form/RangeSlider'
import AmenitiesCheckList from './AmenitiesCheckList'
import useCustomForm from '../../../hooks/useCustomForm'
import { ExploreProjectProperties } from '../../../Pages/ExploreProjectsPage'
import Button from '../../../ui/button/Button'
import { router } from '@inertiajs/react'
import { localization } from '../../../Localization/localization'
import { displayText } from '../../../ui/Localization'
import { Language } from '../../../ui/ui_interfaces'
import useReferenceValue from '../../../data_hooks/useReferenceValue'
import ProjectDisclaimer from '../ProjectDisclaimer/ProjectDisclaimer'
import useVillage from '../../../data_hooks/useVillage'
import Input from '../../../ui/form/Input'

interface FormField {
  district: string
  taluk: string
  village: string
  search: string
  minimum_units: number
  maximum_units: number
  minimum_available_units: number
  maximum_available_units: number
  project_type: string
  building_type: string
  amenities: string
  sort_order: string
  sort_by: string
  status: string
  lang?: Language
}

const statuses = [
  { value: 'completed', label: 'Completed' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'expired', label: 'Expired Projects' },
  { value: 'extended', label: 'Extended Projects' },
]

export const PROJECT_TYPE_PLOT = '15'
export const PROJECT_TYPE_SHOP = '12'
export const PROJECT_TYPE_RESIDENTIAL = '13'
export const PROJECT_TYPE_VILLAGE = '33'
export const PROJECT_TYPE_MIXED = '16'

// data from tbl_CommonDDMaster
const projectTypes = [
  {
    id: PROJECT_TYPE_SHOP,
    TypeName: 'Shops/Office Space (Commercial)',
  },
  {
    id: PROJECT_TYPE_RESIDENTIAL,
    TypeName: 'Residential',
  },
  {
    id: PROJECT_TYPE_PLOT,
    TypeName: 'Plots',
  },
  {
    id: PROJECT_TYPE_VILLAGE,
    TypeName: '	Villas (Plots & Buildings)',
  },
  {
    id: PROJECT_TYPE_MIXED,
    TypeName: 'Mixed (Commercial & Residential)',
  },
]

interface Properties extends Omit<ExploreProjectProperties, 'projects'> {
  setLoading: (loading: boolean) => void
}

/**
 * Form To Filter Project List in Explore Project Page
 *
 * @constructor
 */
const ProjectFilterForm = ({
  districts,
  oldSearch,
  oldDistrict,
  oldTaluk,
  oldVillage,
  oldProjectType,
  oldBuildingType,
  oldAmenities,
  oldMinimumUnits,
  oldMaximumUnits,
  oldMinimumAvailableUnits,
  oldMaximumAvailableUnits,
  oldStatus,
  oldSortBy,
  oldSortOrder,
  lang = 'en',
  setLoading,
}: Properties) => {
  // old amenities value is set through onAmenitiesChange
  const { form, setFormValue } = useCustomForm<FormField>({
    district: oldDistrict,
    taluk: oldTaluk,
    village: oldVillage,
    search: oldSearch,
    project_type: oldProjectType,
    building_type: oldBuildingType,
    amenities: '',
    minimum_units: oldMinimumUnits,
    maximum_units: oldMaximumUnits,
    minimum_available_units: oldMinimumAvailableUnits,
    maximum_available_units: oldMaximumAvailableUnits,
    sort_order: oldSortOrder,
    sort_by: oldSortBy,
    status: oldStatus,
  })

  const listReference = React.useRef<HTMLDivElement>(null)

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    listReference.current?.scrollIntoView({ behavior: 'smooth' })
    let formData = {
      ...form,
      maximum_available_units:
        form.maximum_available_units >= 300 ? '' : form.maximum_available_units,
      maximum_units: form.maximum_units >= 300 ? '' : form.maximum_units,
    }

    if (lang === 'mal') {
      formData = {
        ...formData,
        lang: 'mal',
      }
    }
    setLoading(true)
    router.get('/explore-projects', formData, {
      preserveScroll: true,
      onFinish: () => {
        setLoading(false)
      },
    })
  }

  const taluks = useTalukData(Number(form.district))
  const villages = useVillage(form.taluk)
  const [buildingTypes] = useReferenceValue('Project', 'Type')

  const onAmenitiesChange = useCallback(
    (value: string) => {
      setFormValue('amenities')(value)
    },
    [setFormValue]
  )

  const handleDistrictChange = useCallback(
    (value: string) => {
      setFormValue('district')(value)
      setFormValue('taluk')('')
      setFormValue('village')('')
    },
    [setFormValue]
  )

  const handleTalukChange = useCallback(
    (value: string) => {
      setFormValue('taluk')(value)
      setFormValue('village')('')
    },
    [setFormValue]
  )

  const handleReset = useCallback(() => {
    listReference.current?.scrollIntoView({ behavior: 'smooth' })
    setLoading(true)
    router.get(
      '/explore-projects',
      { lang },
      { preserveScroll: true, onFinish: () => setLoading(false) }
    )
  }, [lang, setLoading])

  return (
    <div className='flex w-full flex-col rounded-xl bg-white p-6 shadow-lg lg:p-8'>
      <div className='mb-8'>
        <h2 className='text-[28px] font-medium text-[#444444]' style={{ fontFamily: "'Urbanist', sans-serif" }}>
          <span className='text-[28px] text-[#085484]'>Find Your</span> RERA Project
        </h2>
        <p className='mt-2 text-sm text-gray-400'>Choose one or more options above to search</p>
      </div>

      <form className='flex flex-col gap-6' onSubmit={submit}>
        {/* Row 1 */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr_1fr]'>
          <div className='flex flex-col'>
            <label className='mb-1.5 text-[13px] font-normal text-[#085484]' style={{ fontFamily: "'DM Sans', sans-serif" }}>Project Name / Locality / Promoter / Registration No.</label>
            <Input
              data={form.search}
              setData={setFormValue('search')}
              placeholder='Enter Name / locality / Promoter/ Reg. No.'
            />
          </div>
          <div className='flex flex-col'>
            <label className='mb-1.5 text-[13px] font-normal text-[#085484]' style={{ fontFamily: "'DM Sans', sans-serif" }}>Project Type</label>
            <SelectList
              list={projectTypes}
              data={form.project_type}
              dataKey='id'
              displayKey='TypeName'
              setData={setFormValue('project_type')}
              placeholder=''
              showAllOption
              allOptionText='Select Project Type'
            />
          </div>
          <div className='flex flex-col'>
            <label className='mb-1.5 text-[13px] font-normal text-[#085484]' style={{ fontFamily: "'DM Sans', sans-serif" }}>Building Type</label>
            <SelectList
              list={buildingTypes}
              data={form.building_type}
              dataKey='value_one'
              displayKey='value_one'
              setData={setFormValue('building_type')}
              placeholder=''
              showAllOption
              allOptionText='Select District'
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
          <div className='flex flex-col'>
            <label className='mb-1.5 text-[13px] font-normal text-[#085484]' style={{ fontFamily: "'DM Sans', sans-serif" }}>District</label>
            <SelectList
              list={districts}
              data={form.district}
              dataKey='Districtcode'
              displayKey='Districtname'
              setData={handleDistrictChange}
              placeholder=''
              showAllOption
              allOptionText='Select District'
            />
          </div>
          <div className='flex flex-col'>
            <label className='mb-1.5 text-[13px] font-normal text-[#085484]' style={{ fontFamily: "'DM Sans', sans-serif" }}>Village</label>
            <SelectList
              list={villages}
              data={form.village}
              dataKey='Villagecode'
              displayKey='Villagename'
              setData={setFormValue('village')}
              placeholder=''
              showAllOption
              allOptionText='Select Village'
            />
          </div>
          <div className='flex flex-col'>
            <label className='mb-1.5 text-[13px] font-normal text-[#085484]' style={{ fontFamily: "'DM Sans', sans-serif" }}>District</label>
            <SelectList
              list={taluks}
              data={form.taluk}
              dataKey='Subdistrictcode'
              displayKey='SubDistrictname'
              setData={handleTalukChange}
              placeholder=''
              showAllOption
              allOptionText='Select District'
            />
          </div>
          <div className='flex flex-col'>
            <label className='mb-1.5 text-[13px] font-normal text-[#085484]' style={{ fontFamily: "'DM Sans', sans-serif" }}>Status</label>
            <SelectList
              list={statuses}
              data={form.status}
              dataKey='value'
              displayKey='label'
              setData={setFormValue('status')}
              placeholder=''
              showAllOption
              allOptionText='Select Status'
            />
          </div>
        </div>

        <div className='mt-2 w-full'>
          <label className='mb-1.5 block text-[13px] font-normal text-[#085484]' style={{ fontFamily: "'DM Sans', sans-serif" }}>Amenities</label>
          <div className='rounded-lg w-full py-2'>
            <AmenitiesCheckList
              onAmenitiesChange={onAmenitiesChange}
              oldAmenities={oldAmenities}
              lang={lang}
            />
          </div>
        </div>

        <div
          className='grid grid-cols-1 gap-6 md:grid-cols-2 mt-6'
          style={{
            '--color-accent-dark': '#085484',
            '--color-accent-light': '#d1d5db'
          } as React.CSSProperties}
        >
          <div className='flex flex-col gap-2 text-center text-sm text-gray-600'>
            <RangeSlider
              label='total units'
              min={0}
              max={300}
              step={5}
              infiniteEnd
              rangeStart={form.minimum_units}
              rangeEnd={form.maximum_units}
              setRangeStart={setFormValue('minimum_units')}
              setRangeEnd={setFormValue('maximum_units')}
              lang={lang}
              labelPrefix='Having'
            />
          </div>
          <div className='flex flex-col gap-2 text-center text-sm text-gray-600'>
            <RangeSlider
              label='total units'
              min={0}
              max={300}
              step={5}
              infiniteEnd
              rangeStart={form.minimum_available_units}
              rangeEnd={form.maximum_available_units}
              setRangeStart={setFormValue('minimum_available_units')}
              setRangeEnd={setFormValue('maximum_available_units')}
              lang={lang}
              labelPrefix='Having'
            />
          </div>
        </div>

        <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6'>
          <button className='w-full sm:w-auto rounded-md bg-[#085484] px-10 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#06426a]'>
            Search
          </button>
          <button
            type='button'
            onClick={handleReset}
            className='w-full sm:w-auto rounded-md border border-[#085484] px-10 py-2.5 text-sm font-medium text-[#085484] transition-colors hover:bg-gray-50'
          >
            Reset
          </button>
          <ProjectDisclaimer className='w-full sm:w-auto' />
        </div>
      </form>
      <div ref={listReference}></div>
    </div>
  )
}

export default ProjectFilterForm
