import Pagination from '../../ui/table/Pagination'
import Table from '../../ui/table/Table'
import { Paginator } from '../../ui/ui_interfaces'
import { AgentData } from './AgentList'
import DisplayEmail from '../Common/DisplayEmail'

const heads = [
  'Agent Name',
  'Agent Type',
  'Address',
  'Land Mark',
  'Email ID',
  'Mobile No',
  'Certificate No',
]

interface Properties {
  agents: Paginator<AgentData>
}

const RegisteredAgentList = ({ agents }: Properties) => {
  return (
    <>
      <Table
        heads={heads}
        editColumn
      >
        <tbody>
          {agents.data.map((agent) => (
            <tr
              key={agent.AgentName}
              className='standard-tr'
            >
              <td className='standard-td'>{agent.AgentName}</td>
              <td className='standard-td'>
                {agent.InfoTypeValue === '1' ? 'Individual' : 'Other Than Individual'}
              </td>
              <td className='standard-td'>{agent.Address}</td>
              <td className='standard-td'>{agent.Landmark}</td>
              <td className='standard-td'>
                <DisplayEmail
                  email={
                    agent.InfoTypeValue === '1' ? agent.IndivisualEmailID : agent.CompanyEmailID
                  }
                />
              </td>
              <td className='standard-td'>
                {agent.InfoTypeValue === '1' ? agent.IndivisualMobileNo : agent.CompanyMobileNo}
              </td>
              <td className='standard-td'>{agent.CertificateNo}</td>
              <td className='standard-td flex flex-wrap gap-3'>
                <a
                  className='link'
                  href={`/agent-certification/${agent.UserID}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  Certificate
                </a>
                <a
                  className='link text-xs'
                  href={`/agent-print-preview/${agent.UserID}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  Agent Information
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='my-5'>
        <Pagination pagination={agents} />
      </div>
    </>
  )
}

export default RegisteredAgentList
