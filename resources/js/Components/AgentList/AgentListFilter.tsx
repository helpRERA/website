import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { District } from '../../DataStructures/krera_interfaces'
import useTalukData from '../../data_hooks/taluk-data'
import useVillage from '../../data_hooks/useVillage'
import useCustomForm from '../../hooks/useCustomForm'
import { localization } from '../../Localization/localization'
import Button from '../../ui/button/Button'
import Input from '../../ui/form/Input'
import SelectList from '../../ui/form/SelectList'
import { displayText } from '../../ui/Localization'
import { Language } from '../../ui/ui_interfaces'
import CheckBox from '../../ui/form/CheckBox'

interface Properties {
  districts: District[]
  lang?: Language
  oldAgentName?: string
  oldRegistrationNumber?: string
  oldDistrict?: string
  oldTaluk?: string
  oldVillage?: string
  oldPincode?: string
  section: string
}

const AgentListFilter = ({
  districts,
  lang = 'en',
  oldAgentName = '',
  oldDistrict = '',
  oldTaluk = '',
  oldRegistrationNumber = '',
  oldVillage = '',
  section,
}: Properties) => {
  const [processing, setProcessing] = useState(false)

  const { form, setFormValue, setAll } = useCustomForm({
    agent_name: oldAgentName,
    registration_number: oldRegistrationNumber,
    district: oldDistrict,
    taluk: oldTaluk,
    village: oldVillage,
  })

  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false)

  useEffect(() => {
    setAll({
      agent_name: oldAgentName,
      registration_number: oldRegistrationNumber,
      district: oldDistrict,
      taluk: oldTaluk,
      village: oldVillage,
    })
  }, [oldAgentName, oldRegistrationNumber, oldDistrict, oldTaluk, oldVillage, setAll])

  const taluks = useTalukData(Number(form.district))
  const villages = useVillage(form.taluk)

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProcessing(true)
    router.get(
      '/agents',
      {
        ...form,
        section: section,
      },
      {
        onFinish: () => setProcessing(false),
      }
    )
  }

  const hasAdditionalFilter = oldTaluk != '' || oldVillage != '' || oldDistrict != ''

  return (
    <>
      <form
        className='my-10 flex flex-col gap-5'
        onSubmit={submitForm}
      >
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col'>
            <Input
              label='Agent Name'
              data={form.agent_name}
              setData={setFormValue('agent_name')}
            />
          </div>
          {section !== 'Expired Agents' && (
            <div className='flex flex-col'>
              <Input
                label='Registration Number'
                data={form.registration_number}
                setData={setFormValue('registration_number')}
              />
            </div>
          )}
        </div>
        {section === 'Registered Agents' && (
          <>
            <div className='flex flex-col'>
              <CheckBox
                toggle={() => setShowAdditionalFilters((old) => !old)}
                data={hasAdditionalFilter || showAdditionalFilters}
                label='Show Additional Filters'
              />
            </div>
            {(showAdditionalFilters || hasAdditionalFilter) && (
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
            )}
          </>
        )}
        <div className='flex flex-wrap gap-5'>
          <Button
            label='SEARCH'
            processing={processing}
          />
          <Button
            label='RESET'
            type='secondary'
            buttonType='button'
            onClick={() => router.get('/agents')}
          />
        </div>
      </form>{' '}
    </>
  )
}

export default AgentListFilter
