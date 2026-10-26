import { router, usePage } from '@inertiajs/react'
import { useCallback, useMemo, useState } from 'react'
import Tabs from '../../ui/Tab/Tabs'
import { Paginator } from '../../ui/ui_interfaces'
//import ManualAgentList from './ManualAgentList'
import RegisteredAgentList from './RegisteredAgentList'
import { ExpiredAgent } from '../../Pages/AgentList/AgentListPage'
//import ExpiredAgentList from './ExpiredAgentList'

export interface AgentData {
  UserID: string | null
  AgentName: string | null
  Address: string | null
  CommAddress: string | null
  AgentData: string | null
  Landmark: string | null
  IndivisualEmailID: string | null
  IndivisualMobileNo: string | null
  CompanyEmailID: string | null
  CompanyMobileNo: string | null
  Pincode: string | null
  DistrictName: string | null
  CertificateNo: string | null
  InfoTypeValue: string | null
}

export interface AgentManualData {
  SNo: string | null
  RegistrationNumber: string | null
  Agent_Name: string | null
  Address?: string | null
  PermanentAddress: string | null
  CommAddress: string | null
  Agent_Type: string | null
  PhoneNumber: string | null
  Certificate: string | null
  Certificate_Path: string | null
}

interface Properties {
  agents?: Paginator<AgentData>
  manual?: Paginator<AgentManualData>
  expiredAgents?: Paginator<ExpiredAgent>
}

interface PageProperties {
  oldAgentName?: string
  oldRegistrationNumber?: string
  oldDistrict?: string
  oldTaluk?: string
  oldVillage?: string
  oldPincode?: string
  section: string
}

interface Properties {
  agents?: Paginator<AgentData>
}

interface PageProperties {
  oldAgentName?: string
  oldRegistrationNumber?: string
  oldDistrict?: string
  oldTaluk?: string
  oldVillage?: string
  oldPincode?: string
}

const SECTION = 'Registered Agents'

const AgentList = ({ agents }: Properties) => {
  const {
    oldAgentName = '',
    oldDistrict = '',
    oldTaluk = '',
    oldRegistrationNumber = '',
    oldVillage = '',
    oldPincode = '',
  } = usePage().props as unknown as PageProperties

  const url = useMemo(() => {
    const params = new URLSearchParams()
    params.append('section', SECTION)
    params.append('agent_name', oldAgentName)
    params.append('registration_number', oldRegistrationNumber)
    params.append('district', oldDistrict)
    params.append('taluk', oldTaluk)
    params.append('village', oldVillage)
    params.append('pincode', oldPincode)
    return `/export-agents?${params.toString()}`
  }, [oldAgentName, oldDistrict, oldTaluk, oldRegistrationNumber, oldVillage, oldPincode])

  const tabs = useMemo(
    () => [{ value: SECTION, subtitle: `${agents?.total ?? 0} Results` }],
    [agents]
  )

  return (
    <div className='flex flex-col gap-5'>
      <Tabs
        items={tabs}
        selectedTab={SECTION}
        setSelectedTab={() => {}}
      />
      <div className='w-full'>
        {agents != null && <RegisteredAgentList agents={agents} />}
      </div>
    </div>
  )
}

export default AgentList