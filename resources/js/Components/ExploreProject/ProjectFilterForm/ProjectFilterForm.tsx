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
    <div className='flex flex-grow flex-col gap-5'>
      <form
        className={`'grid-cols-1 gap-5 p-1 first:grid md:grid-cols-2`}
        onSubmit={submit}
      >
        <div className='grid-col-1 grid gap-5 md:grid-cols-2'>
          <div className='flex flex-col md:col-span-2'>
            <Input
              data={form.search}
              setData={setFormValue('search')}
              placeholder={`${displayText(
                localization['Project Name / Locality / Promoter / Registration Number'],
                lang
              )}`}
            />
          </div>
          <div className='flex flex-col'>
            <SelectList
              list={districts}
              data={form.district}
              dataKey='Districtcode'
              displayKey='Districtname'
              setData={handleDistrictChange}
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
              setData={handleTalukChange}
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
              allOptionText={`${displayText(localization['All Villages'], lang)}`}
            />
          </div>
          <div className='flex flex-col'>
            <SelectList
              list={projectTypes}
              data={form.project_type}
              dataKey='id'
              displayKey='TypeName'
              setData={setFormValue('project_type')}
              placeholder=''
              showAllOption
              allOptionText={`${displayText(localization['All Project Types'], lang)}`}
            />
          </div>
          <div className='flex flex-col'>
            <SelectList
              list={buildingTypes}
              data={form.building_type}
              dataKey='value_one'
              displayKey='value_one'
              setData={setFormValue('building_type')}
              placeholder=''
              showAllOption
              allOptionText={`${displayText(localization['All Building Types'], lang)}`}
            />
          </div>
          <div className='flex flex-col'>
            <SelectList
              list={statuses}
              data={form.status}
              dataKey='value'
              displayKey='label'
              setData={setFormValue('status')}
              placeholder=''
              showAllOption
              allOptionText={`${displayText(localization['Any Status'], lang)}`}
            />
          </div>
        </div>
        <div className='grid-col-1 grid gap-5 md:grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <RangeSlider
              label={`${displayText(localization['Total Units'], lang)}`}
              min={0}
              max={300}
              step={5}
              infiniteEnd
              rangeStart={form.minimum_units}
              rangeEnd={form.maximum_units}
              setRangeStart={setFormValue('minimum_units')}
              setRangeEnd={setFormValue('maximum_units')}
              lang={lang}
              labelPrefix={lang === 'mal' ? 'മുതൽ' : 'Having'}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <RangeSlider
              label={`${displayText(localization['Available Units'], lang)}`}
              min={0}
              max={300}
              step={5}
              infiniteEnd
              rangeStart={form.minimum_available_units}
              rangeEnd={form.maximum_available_units}
              setRangeStart={setFormValue('minimum_available_units')}
              setRangeEnd={setFormValue('maximum_available_units')}
              lang={lang}
              labelPrefix={lang === 'mal' ? 'മുതൽ' : 'Having'}
            />
          </div>
          <div className='py-3 md:col-span-2'>
            <AmenitiesCheckList
              onAmenitiesChange={onAmenitiesChange}
              oldAmenities={oldAmenities}
              lang={lang}
            />
          </div>
        </div>
        <div className={`mx-4 flex flex-wrap gap-5 py-14 md:col-span-2`}>
          <Button label={`${displayText(localization['Search'], lang)}`} />
          <Button
            label='RESET'
            onClick={handleReset}
            buttonType='button'
            type='secondary'
          />
          <ProjectDisclaimer />
        </div>
      </form>
      <div ref={listReference}></div>
    </div>
  )
}

export default ProjectFilterForm
