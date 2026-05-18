import React from 'react'
import Card from '../../ui/card/Card'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import CardHeader from '../../ui/card/CardHeader'
import AddReferenceData from '../../Components/AdminPages/ReferenceData/AddReferenceData'
import { ReferenceCode, ReferenceDomain } from '../../DataStructures/data_interfaces'
import UpdateReferenceData from '../../Components/AdminPages/ReferenceData/UpdateReferenceData'

interface Properties {
  domains: ReferenceDomain[]
  referenceData: ReferenceCode
}

const ReferenceDataEdit = ({ domains, referenceData }: Properties) => {
  return (
    <PaddedDashboardContent>
      <Card processing={false}>
        <CardHeader
          title={`Update Reference Data`}
          back={'/reference-data'}
        />
        <UpdateReferenceData
          domains={domains}
          referenceData={referenceData}
        />
      </Card>
    </PaddedDashboardContent>
  )
}

export default ReferenceDataEdit
