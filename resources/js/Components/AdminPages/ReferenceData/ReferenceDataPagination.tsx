import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { Paginator } from '../../../ui/ui_interfaces'
import { ReferenceCode, ReferenceDomain } from '../../../DataStructures/data_interfaces'
import Table from '../../../ui/table/Table'
import Pagination from '../../../ui/table/Pagination'
import SelectList from '../../../ui/form/SelectList'
import { Link, router, useForm } from '@inertiajs/react'
import useReferenceDataParameter from '../../../data_hooks/reference-parameter'
import useCustomForm from '../../../hooks/useCustomForm'
import Button from '../../../ui/button/Button'

interface Properties {
  pagination: Paginator<ReferenceCode>
  domains: ReferenceDomain[]
  domainId: string
  parameterId: string
}

const tableColumns = ['Domain', 'Parameter', 'Sort Id', 'Value', 'Second Value']

const ReferenceDataPagination = ({ domainId, parameterId, pagination, domains }: Properties) => {
  const { form, setFormValue, setAll } = useCustomForm({
    domain: domainId,
    parameter: parameterId,
  })
  const [parameters] = useReferenceDataParameter(form.domain)

  const changeDomain = useCallback(
    (id: string) => {
      setAll({
        domain: id,
        parameter: '',
      })
    },
    [setAll]
  )

  const submitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log('form submitted')
      router.get(`/reference-data?domain=${form.domain}&parameter=${form.parameter}`)
    },
    [form]
  )

  return (
    <>
      <form
        onSubmit={submitForm}
        className='my-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'
      >
        <div className='flex flex-col'>
          <SelectList
            label='Domain'
            list={domains}
            dataKey='id'
            displayKey='domain'
            data={form.domain}
            setData={changeDomain}
          />
        </div>
        <div className='flex flex-col'>
          <SelectList
            label='Parameter'
            list={parameters}
            dataKey='id'
            displayKey='parameter'
            data={form.parameter}
            setData={setFormValue('parameter')}
          />
        </div>
        <div className='flex items-end'>
          <Button label='SEARCH' />
        </div>
      </form>
      <div className='my-5 w-full'>
        <Table
          heads={tableColumns}
          editColumn
        >
          <tbody>
            {pagination.data.map((referenceData) => {
              return (
                <tr
                  className='standard-tr'
                  key={referenceData.id.toString()}
                >
                  <td className='standard-td'>{referenceData.domain}</td>
                  <td className='standard-td'>{referenceData.parameter}</td>
                  <td className='standard-td'>{referenceData.sort_order}</td>
                  <td className='standard-td'>{referenceData.value_one}</td>
                  <td className='standard-td'>{referenceData.value_two}</td>
                  <td className='standard-td'>
                    <Link
                      as='a'
                      className='text-blue-500 hover:text-blue-600 hover:underline'
                      href={`/reference-data/${referenceData.id}/edit`}
                    >
                      VIEW
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <Pagination pagination={pagination} />
    </>
  )
}

export default ReferenceDataPagination
