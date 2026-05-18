import React from 'react'
import Card from '../../ui/card/Card'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import CardHeader from '../../ui/card/CardHeader'
import AddReferenceData from '../../Components/AdminPages/ReferenceData/AddReferenceData'
import { ReferenceDomain } from '../../DataStructures/data_interfaces'

interface Properties {
  domains: ReferenceDomain[]
}

const ReferenceDataCreate = ({ domains }: Properties) => {
  return (
    <PaddedDashboardContent>
      <Card processing={false}>
        <CardHeader
          title='Create Reference Data'
          back={'/reference-data'}
        />
        <AddReferenceData domains={domains} />
      </Card>
    </PaddedDashboardContent>
  )
}

export default ReferenceDataCreate
