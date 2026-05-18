import React from 'react'
import { ReferenceDomain } from '../../../DataStructures/data_interfaces'
import ReferenceDataForm, { ReferenceDataFormFields } from './Forms/ReferenceDataForm'
import useInertiaPost from '../../../hooks/useInertiaPost'

interface Properties {
  domains: ReferenceDomain[]
}

const AddReferenceData = ({ domains }: Properties) => {
  const { errors, loading, post } = useInertiaPost('/reference-data')

  const saveData = (data: ReferenceDataFormFields) => {
    post(data)
  }

  return (
    <ReferenceDataForm
      domains={domains}
      errors={errors}
      processing={loading}
      onSubmit={saveData}
    />
  )
}

export default AddReferenceData
