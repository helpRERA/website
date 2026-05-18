import React from 'react'
import { Paginator } from '../../ui/ui_interfaces'
import { ExpiredAgent } from '../../Pages/AgentList/AgentListPage'
import Table from '../../ui/table/Table'
import Pagination from '../../ui/table/Pagination'

interface ExpiredAgentsProps {
  expiredAgents: Paginator<ExpiredAgent>
}

const ExpiredAgentsList = ({ expiredAgents }: ExpiredAgentsProps) => {
  return (
    <>
      <Table heads={['Agent Name', 'Expired On']}>
        <tbody>
          {expiredAgents.data.map((agent) => (
            <tr
              key={agent.AgentName + '-' + agent.CreatedOn}
              className='standard-tr'
            >
              <td className='standard-td'>{agent.AgentName}</td>
              <td className='standard-td'>{agent.ExpiredOn}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {
        <div className='my-5'>
          <Pagination pagination={expiredAgents} />
        </div>
      }
    </>
  )
}

export default ExpiredAgentsList
