import Pagination from '../../ui/table/Pagination'
import Table from '../../ui/table/Table'
import { Paginator } from '../../ui/ui_interfaces'
import { AgentManualData } from './AgentList'

const heads = ['Registration Number', 'Agent Name', 'Agent Type', 'Address', 'Phone Number']

interface Properties {
  manual: Paginator<AgentManualData>
}

const ManualAgentList = ({ manual }: Properties) => {
  return (
    <>
      <Table
        heads={heads}
        editColumn
      >
        <tbody>
          {manual.data.map((agent) => (
            <tr
              key={agent.RegistrationNumber}
              className='standard-tr'
            >
              <td className='standard-td'>{agent.RegistrationNumber}</td>
              <td className='standard-td'>{agent.Agent_Name}</td>
              <td className='standard-td'>{agent.Agent_Type}</td>
              <td className='standard-td'>{agent.PermanentAddress}</td>
              <td className='standard-td'>{agent.PhoneNumber}</td>
              <td className='standard-td'>
                {agent.Certificate_Path && (
                  <a
                    className='link'
                    href={agent.Certificate_Path}
                    target='_blank'
                  >
                    Certificate
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='my-5'>
        <Pagination pagination={manual} />
      </div>
    </>
  )
}

export default ManualAgentList
