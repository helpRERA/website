import React, { useState } from 'react'
import ReferenceDataForm, { ReferenceDataFormFields } from './Forms/ReferenceDataForm'
import { ReferenceCode, ReferenceDomain } from '../../../DataStructures/data_interfaces'
import DeleteModal from '../../../ui/modal/DeleteModal'
import useInertiaPost from '../../../hooks/useInertiaPost'

interface Properties {
  domains: ReferenceDomain[]
  referenceData: ReferenceCode
}

const UpdateReferenceData = ({ domains, referenceData }: Properties) => {
  const { errors, post, loading } = useInertiaPost(`/reference-data/${referenceData.id}`)

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const saveData = (data: ReferenceDataFormFields) => {
    post({
      ...data,
      _method: 'PUT',
    })
  }

  return (
    <>
      <ReferenceDataForm
        domains={domains}
        errors={errors}
        processing={loading}
        onSubmit={saveData}
        referenceData={referenceData}
        data={referenceData}
        openDelete={() => setShowDeleteModal(true)}
      />
      {showDeleteModal && (
        <DeleteModal
          url={`/reference-data/${referenceData.id}`}
          setShowModal={setShowDeleteModal}
          title={`Delete Reference Code`}
        >
          <span>Are You Sure You Want To Delete Reference Data?</span>
        </DeleteModal>
      )}
    </>
  )
}

export default UpdateReferenceData
