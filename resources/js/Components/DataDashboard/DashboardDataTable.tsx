import DashboardTable from '../../ui/table/DashboardTable'
import Table from '../../ui/table/Table'

interface Props {
  records: Record<string, string | number | null | undefined>[]
  keys: string[]
  primaryKey: string
  units?: (string | null)[]
}

export default function DashboardDataTable({ records, keys, primaryKey, units }: Props) {
  const colTitles = keys.map((key, index) => {
    const unit = units && units[index]
    return unit ? `${key.toUpperCase()} (${unit})` : key.toUpperCase()
  })

  return (
    <DashboardTable heads={colTitles}>
      <tbody>
        {records.map((record) => (
          <tr
            className='dashboard-tr'
            key={record[primaryKey]}
          >
            {keys.map((key) => (
              <td
                className='dashboard-td'
                key={key}
              >
                {record[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </DashboardTable>
  )
}
