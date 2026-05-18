import React, { useEffect } from 'react'
import Card from '../../ui/card/Card'
import PaddedDashboardContent from '../../Components/Layout/Dashboard/PaddedDashboardContent'
import CardHeader from '../../ui/card/CardHeader'
import ReferenceDataPagination from '../../Components/AdminPages/ReferenceData/ReferenceDataPagination'
import { Paginator } from '../../ui/ui_interfaces'
import { ReferenceCode, ReferenceDomain } from '../../DataStructures/data_interfaces'

interface Properties {
  data: Paginator<ReferenceCode>
  domains: ReferenceDomain[]
  domainId: string
  parameterId: string
}

const ReferenceDataList = ({ data, domains, domainId, parameterId }: Properties) => {
  return (
    <PaddedDashboardContent>
      <Card processing={false}>
        <CardHeader
          title='List Of Reference Data'
          add={'/reference-data/create'}
        />
        <ReferenceDataPagination
          pagination={data}
          domains={domains}
          domainId={domainId}
          parameterId={parameterId}
        />
      </Card>
    </PaddedDashboardContent>
  )
}

export default ReferenceDataList
