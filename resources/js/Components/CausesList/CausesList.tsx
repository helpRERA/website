import { router } from '@inertiajs/react'
import { FormEvent, useEffect, useState } from 'react'
import useCustomForm from '../../hooks/useCustomForm'
import { CauseListItem } from '../../Pages/Causes/CauseListPage'
import Button from '../../ui/button/Button'
import DatePicker from '../../ui/form/DatePicker'
import Pagination from '../../ui/table/Pagination'
import Table from '../../ui/table/Table'
import { Paginator } from '../../ui/ui_interfaces'
import FullSpinnerWrapper from '../../ui/FullSpinnerWrapper'
import RadioInput from '../../ui/Radio/RadioInput'

const heads = [
  'ComplaintID',
  'Complainant Name',
  'Respondent Name',
  'Hearing Date',
  'Hearing Time',
  'Posting Records *',
]

interface Properties {
  causes: Paginator<CauseListItem>
  oldDate: string
  oldAuthority: string
}

const authorityList = [
  { id: '1', name: 'K-RERA Authority' },
  { id: '2', name: 'Adjudicating Officer' },
]

const CausesList = ({ causes, oldDate, oldAuthority }: Properties) => {
  const [processing, setProcessing] = useState(false)
  const [selectedProceeding, setSelectedProceeding] = useState<string | null>(null)

  const { form, setFormValue, setAll } = useCustomForm({
    date: '',
    authority: '',
  })

  useEffect(() => {
    setAll({
      date: oldDate,
      authority: oldAuthority,
    })
  }, [oldDate, oldAuthority, setAll])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProcessing(true)

    router.get(
      `/cause-list?date=${form.date}&authority=${form.authority}`,
      {},
      {
        onFinish: () => setProcessing(false),
      }
    )
  }

  return (
    <div>
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className='my-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
      >
        <div className='col-span-full flex flex-wrap gap-5'>
          <RadioInput
            data={form.authority}
            setData={setFormValue('authority')}
            list={authorityList}
            dataKey='id'
            displayKey='name'
          />
        </div>

        <div className='flex flex-col'>
          <DatePicker
            label='Date'
            data={form.date}
            setData={setFormValue('date')}
          />
        </div>

        <div className='flex items-end'>
          <Button label='Search' />
        </div>
      </form>

      {/* Heading */}
      <div className='my-5 flex flex-col'>
        <span className='font-bold'>
          Case List For:{' '}
          {oldAuthority === '1'
            ? 'K-RERA Authority'
            : 'Adjudicating Officer'}
        </span>
      </div>

      {/* Table */}
      <FullSpinnerWrapper processing={processing}>
        <Table heads={heads}>
          <tbody>
            {causes.data?.map((cause, index) => (
              <tr
                className='standard-tr'
                key={`${cause.ComplaintNumber}-${index}`}
              >
                <td className='standard-td'>{cause.ComplaintNumber}</td>
                <td className='standard-td'>{cause.ComplainantName}</td>
                <td className='standard-td'>{cause.Nameofrespondent}</td>
                <td className='standard-td'>{cause.HearingDate}</td>
                <td className='standard-td'>{cause.HearingTime}</td>
                <td className='standard-td pl-10' >
  {cause.DailyProceedings ? (
    <button
      type='button'
      className='text-blue-600 underline'
      onClick={() => setSelectedProceeding(cause.DailyProceedings)}
    >
      View
    </button>
  ) : (
    <span className='text-gray-400'>-</span>
  )}
</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='my-10'>
          * This posting record is a shortened version of the actual record of proceedings. Certified copies of the actual record of proceedings can be applied for using Form No. 10.
        </div>
        <div className='my-10'>
          <Pagination pagination={causes} />
        </div>
      </FullSpinnerWrapper>

      {/* Modal */}
      {selectedProceeding && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
          onClick={() => setSelectedProceeding(null)}
        >
          <div
            className='bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6'
            onClick={(e) => e.stopPropagation()}
          >
            {/* <h2 className='text-lg font-bold mb-4'>Posting Records</h2> */}

            <div className='max-h-96 overflow-y-auto whitespace-pre-wrap'>
              {selectedProceeding}
            </div>

            <div className='mt-6 text-right'>
              <button
                className='px-4 py-2 bg-gray-600 text-white rounded'
                onClick={() => setSelectedProceeding(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CausesList