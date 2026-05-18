import { router } from '@inertiajs/react'
import React, { FormEvent, useEffect, useState } from 'react'
import useCustomForm from '../../hooks/useCustomForm'
import { Complaint } from '../../Pages/ComplaintList/ComplaintListPage'
import Button from '../../ui/button/Button'
import Input from '../../ui/form/Input'
import Pagination from '../../ui/table/Pagination'
import Table from '../../ui/table/Table'
import { Paginator } from '../../ui/ui_interfaces'
import FullSpinnerWrapper from '../../ui/FullSpinnerWrapper'
import ComplaintListItem from './ComplaintListItem'
import SelectList from '../../ui/form/SelectList'
import Modal from '../../ui/modal/Modal'
import ComplaintMoreInfo from './ComplaintMoreInfo'
import { ReliefSought } from '../../DataStructures/krera_interfaces'

const heads = [
  'Complaint No',
  'Complainant Name',
  'Respondent Name',
  'Project Name',
  'Order Detail',
  '',
]

const rulingTypes = [
  { value: 'Rulings of K-RERA Authority' },
  { value: 'Judgements by Adjudicating Officers' },
]

const sort = [{ value: 'newest' }, { value: 'oldest' }]

const ComplaintList = ({
  complaints,
  oldSearch,
  oldRulingBy,
  oldSort,
  reliefSought,
}: {
  complaints: Paginator<Complaint>
  oldSearch: string
  oldRulingBy: string
  oldSort: string
  reliefSought: ReliefSought[]
}) => {
  const [processing, setProcessing] = useState(false)
  const { form, setFormValue, setAll } = useCustomForm({
    search: '',
    ruling_by: 'Rulings of K-RERA Authority',
    sort: '',
  })

  useEffect(() => {
    setAll({
      search: oldSearch,
      ruling_by: oldRulingBy,
      sort: oldSort,
    })
  }, [oldSearch, setAll, oldRulingBy, oldSort])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProcessing(true)
    router.get(
      `/complaint-list?search=${form.search}&ruling_by=${form.ruling_by}&sort=${form.sort}`,
      {},
      {
        onFinish: () => setProcessing(false),
      }
    )
  }

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='my-10 flex flex-col gap-5'
      >
        <div className='flex w-full flex-col md:w-1/2'>
          <Input
            label='Search'
            placeholder='ComplaintNo / Respondent Name / Project Name / Year'
            data={form.search}
            setData={setFormValue('search')}
          />
        </div>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col '>
            <SelectList
              list={rulingTypes}
              dataKey='value'
              displayKey='value'
              setData={setFormValue('ruling_by')}
              data={form.ruling_by}
              label='Judgement / Ruling By'
            />
          </div>
          <div className='flex flex-col'>
            <SelectList
              list={sort}
              dataKey='value'
              displayKey='value'
              setData={setFormValue('sort')}
              data={form.sort}
              label='Sort'
            />
          </div>
          <div className='flex items-end'>
            <Button label='Search' />
          </div>
        </div>
      </form>
      <FullSpinnerWrapper processing={processing}>
        <Table heads={heads}>
          <tbody>
            {complaints.data?.map((complaint) => {
              return (
                <ComplaintListItem
                  complaint={complaint}
                  key={complaint.ComplaintNo}
                  setComplaint={setSelectedComplaint}
                />
              )
            })}
          </tbody>
        </Table>
        <div className='my-10'>
          <Pagination pagination={complaints} />
        </div>
        {selectedComplaint != null && (
          <Modal
            setShowModal={() => setSelectedComplaint(null)}
            title={`Complaint No: ${selectedComplaint.ComplaintNo}`}
          >
            <ComplaintMoreInfo
              complaintId={selectedComplaint.ID}
              reliefSought={reliefSought}
            />
          </Modal>
        )}
      </FullSpinnerWrapper>
    </div>
  )
}

export default ComplaintList
