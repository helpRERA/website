import { router, usePage } from '@inertiajs/react'
import { useCallback, useMemo, useState } from 'react'
import Tabs from '../../ui/Tab/Tabs'
import { Paginator } from '../../ui/ui_interfaces'
import ManualAgentList from './ManualAgentList'
import RegisteredAgentList from './RegisteredAgentList'
import { ExpiredAgent } from '../../Pages/AgentList/AgentListPage'
import ExpiredAgentList from './ExpiredAgentList'

export interface AgentData {
  UserID: string | null
  AgentName: string | null
  Address: string | null
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
  PermanentAddress: string | null
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

const AgentList = ({ agents, manual, expiredAgents }: Properties) => {
  const {
    section,
    oldAgentName = '',
    oldDistrict = '',
    oldTaluk = '',
    oldRegistrationNumber = '',
    oldVillage = '',
    oldPincode = '',
  } = usePage().props as unknown as PageProperties

  console.log(section)
  console.log(expiredAgents)

  const [selectedTab, setSelectedTab] = useState(section)

  const onTabChange = useCallback(
    (tabName: string) => {
      router.get('/agents', {
        section: tabName,
        agent_name: oldAgentName,
        registration_number: oldRegistrationNumber,
        district: oldDistrict,
        taluk: oldTaluk,
        village: oldVillage,
      })
      setSelectedTab(tabName)
    },
    [oldAgentName, oldRegistrationNumber, oldTaluk, oldDistrict, oldVillage]
  )

  const url = useMemo(() => {
    const params = new URLSearchParams()
    params.append('section', section)
    params.append('agent_name', oldAgentName)
    params.append('registration_number', oldRegistrationNumber)
    params.append('district', oldDistrict)
    params.append('taluk', oldTaluk)
    params.append('village', oldVillage)
    params.append('pincode', oldPincode)
    return `/export-agents?${params.toString()}`
  }, [section, oldAgentName, oldDistrict, oldTaluk, oldRegistrationNumber, oldVillage, oldPincode])

  const tabs = useMemo(() => {
    return [
      {
        value: 'Registered Agents',
        subtitle: (agents?.total ?? 0).toString() + ' Results',
      },
      {
        value: 'Manually Registered Agents',
        subtitle: (manual?.total ?? 0).toString() + ' Results',
      },
      {
        value: 'Expired Agents',
        subtitle: `${expiredAgents?.total ?? 0} Results`,
      },
    ]
  }, [agents, manual, expiredAgents])

  return (
    <div className='flex flex-col gap-5'>
      <div className=''>
        <Tabs
          items={tabs}
          selectedTab={selectedTab}
          setSelectedTab={onTabChange}
        />
      </div>
      <div className='w-full'>
        {section === 'Registered Agents' && agents != null && (
          <RegisteredAgentList agents={agents} />
        )}
      </div>
      {section === 'Manually Registered Agents' && manual != null && (
        <div className='w-full'>
          <ManualAgentList manual={manual} />
        </div>
      )}
      {section === 'Expired Agents' && expiredAgents != null && (
        <div className='w-full'>
          <ExpiredAgentList expiredAgents={expiredAgents} />
        </div>
      )}
    </div>
  )
}

export default AgentList
