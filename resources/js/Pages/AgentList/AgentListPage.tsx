import { useMemo } from 'react'
import AgentList, { AgentData, AgentManualData } from '../../Components/AgentList/AgentList'
import AppLayout from '../../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../../Components/Layout/AppLayout/AppLayoutPadding'
import PageTitle from '../../Components/UiBuilder/Blocks/PageTitle'
import { Language, Paginator } from '../../ui/ui_interfaces'
import AgentListFilter from '../../Components/AgentList/AgentListFilter'
import { District } from '../../DataStructures/krera_interfaces'

interface Properties {
  agents?: Paginator<AgentData>
  manual?: Paginator<AgentManualData>
  districts: District[]
  lang?: Language
  oldAgentName?: string
  oldRegistrationNumber?: string
  oldDistrict?: string
  oldTaluk?: string
  oldVillage?: string
  oldPincode?: string
  section: string
  expiredAgents: Paginator<ExpiredAgent>
}

export interface ExpiredAgent {
  AgentName: string
  CreatedOn: string
  ExpiredOn: string
}

const AgentListPage = ({
  agents,
  manual,
  lang = 'en',
  districts,
  oldAgentName,
  oldVillage,
  oldRegistrationNumber,
  oldDistrict,
  oldTaluk,
  oldPincode,
  section,
  expiredAgents,
}: Properties) => {
  const links = useMemo(() => {
    return {
      title: { english: 'Agents', malayalam: '' },
      links: {
        lastUUID: 2,
        items: [
          {
            id: 1,
            item: { name: { english: 'Home', malayalam: '' }, link: '/', external: false },
          },
          {
            id: 2,
            item: { name: { english: 'Agents', malayalam: '' }, link: '/agents', external: false },
          },
        ],
      },
    }
  }, [])

  return (
    <AppLayout>
      <PageTitle
        block={links}
        language='en'
      />
      <AppLayoutPadding>
        <AgentListFilter
          lang={lang}
          districts={districts}
          oldAgentName={oldAgentName}
          oldRegistrationNumber={oldRegistrationNumber}
          oldDistrict={oldDistrict}
          oldTaluk={oldTaluk}
          oldVillage={oldVillage}
          oldPincode={oldPincode}
          section={section}
        />
        <AgentList
          agents={agents}
          manual={manual}
          expiredAgents={expiredAgents}
        />
      </AppLayoutPadding>
    </AppLayout>
  )
}

export default AgentListPage
