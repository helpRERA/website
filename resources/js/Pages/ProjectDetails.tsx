import { Link } from '@inertiajs/react'
import React, { useEffect } from 'react'
import AppLayout from '../Components/Layout/AppLayout/AppLayout'
import ProjectDetailsContent from '../Components/ProjectDetails/ProjectDetailsContent'
import {
  Company,
  Coordinate,
  District,
  ExtensionCert,
  Facility,
  HSM,
  OrderFile,
  Taluk,
  UploadedImage,
  UserProfile,
  Village,
} from '../DataStructures/krera_interfaces'
import CloseSolid from '../ui/icons/CloseSolid'
import { Language } from '../ui/ui_interfaces'
import MetaTags from '../Components/Common/MetaTags'
import { DocumentsByType } from '../DataStructures/data_interfaces'

export interface ProjectDetailBuilding {
  ID: number
  Name: string | null
  OpenParking: string | null
  ClosedParking: string | null
  apartments: {
    TotalArea: string
    ApartmentType: string | null
    apartment_count: string
    booked_count: string
  }[]
}

export interface ProjectDetailData {
  ID: number
  Name: string
  ProposedDateOfCompletion: string | null
  NumberOfResidentialUnits: number | null
  NumberOfCommercialUnits: number | null
  BuildingCount: string | null
  ProjectRegistrationNumber: string | null
  TotalFloorAreaUnderResidentialUse: string | null
  TotalFloorAreaUnderOtherUse: string | null
  Street: string | null
  Village: string | null
  Locality: string | null
  district?: District
  taluk?: Taluk
  village?: Village
  buildings_count?: number
  images?: UploadedImage[]
  facilities?: Facility[]
  company?: Company
  coordinates: Coordinate | null
  FinancialProgress: string | null
  PhysicalProgress: string | null
  hsm?: HSM | null
  promoter?: UserProfile | null
  certificate_info: { CertificateNo: string | null }
  buildings: ProjectDetailBuilding[]
  booked_count: number
  apartment_count: number
  booked_plots: number | null
  plot_count: number | null
  PType: string
  IsDefault?: number | string
  DefaultReason?: string | null
}

export interface ProjectLastModified {
  date: string
  daysSinceLastModification: number
}

interface Properties {
  project: ProjectDetailData
  documents: DocumentsByType[]
  orders: DocumentsByType[]
  extensionOrder: OrderFile | null
  registrationOrder: OrderFile | null
  extensionCertificate: ExtensionCert | null
  lastModified?: ProjectLastModified | null
  lang?: Language
  projectHash: string
  prevUrl: string
  hasForm6: boolean
  today: string
}

export default function ProjectDetails({
  project,
  lang = 'en',
  documents,
  orders,
  extensionCertificate,
  extensionOrder,
  registrationOrder,
  lastModified,
  projectHash,
  prevUrl,
  hasForm6,
  today,
}: Properties) {
  useEffect(() => {
    //get last url in window history
  }, [])

  return (
    <>
      <MetaTags title={project.Name} />
      <AppLayout>
        <div className='cmpad relative mx-auto w-full flex-col pb-10 mt-10'>
          <ProjectDetailsContent
            project={project}
            lang={lang}
            documents={documents}
            orders={orders}
            hasForm6={hasForm6}
            extensionCertificate={extensionCertificate}
            extensionOrder={extensionOrder}
            registrationOrder={registrationOrder}
            lastModified={lastModified}
            projectHash={projectHash}
            today={today}
          />
        </div>
      </AppLayout>
    </>
  )
}
