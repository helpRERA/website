import React, { FormEvent, useCallback, useEffect, useMemo } from 'react'
import SelectList from '../../../../ui/form/SelectList'
import NumberInput from '../../../../ui/form/NumberInput'
import Input from '../../../../ui/form/Input'
import Button from '../../../../ui/button/Button'
import { ReferenceCode, ReferenceDomain } from '../../../../DataStructures/data_interfaces'
import useReferenceDataParameter from '../../../../data_hooks/reference-parameter'
import useCustomForm from '../../../../hooks/useCustomForm'

export interface ReferenceDataFormFields {
  domain: string
  parameter: string
  value_id: string
  value: string
  second_value: string
}

interface Properties {
  data?: ReferenceCode
  domains: ReferenceDomain[]
  errors: Record<string | number | symbol, string | undefined>
  processing: boolean
  onSubmit: (data: ReferenceDataFormFields) => void
  referenceData?: ReferenceCode
  openDelete?: () => void
}

const ReferenceDataForm = ({
  data,
  domains,
  errors,
  processing,
  onSubmit,
  referenceData,
  openDelete,
}: Properties) => {
  const { form, setFormValue, setAll } = useCustomForm<ReferenceDataFormFields>({
    domain: '',
    parameter: '',
    value_id: '',
    value: '',
    second_value: '',
  })

  const [parameters] = useReferenceDataParameter(form.domain)

  useEffect(() => {
    if (data != null) {
      setAll({
        domain: data.domain_id.toString(),
        parameter: data.parameter_id.toString(),
        value_id: data.sort_order?.toString(),
        value: data.value_one,
        second_value: data.value_two ?? '',
      })
    }
  }, [data, setAll])

  const changeDomain = useCallback(
    (id: string) => {
      setAll({
        domain: id,
        parameter: '',
      })
    },
    [setAll]
  )

  const hasSecondValue = useMemo(() => {
    const parameterIndex = parameters.findIndex(
      (parameter) => parameter.id === Number(form.parameter)
    )
    if (parameterIndex !== -1) {
      return parameters[parameterIndex].has_second_value === 1
    }
    return false
  }, [form.parameter, parameters])

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className='mt-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2'
    >
      <div className='flex flex-col'>
        <SelectList
          label='Domain'
          list={domains}
          dataKey='id'
          displayKey='domain'
          data={form.domain}
          setData={changeDomain}
          error={errors.domain}
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
          error={errors.parameter}
        />
      </div>

      <div className='flex flex-col'>
        <NumberInput
          label='Value Id'
          data={form.value_id}
          setData={setFormValue('value_id')}
          error={errors.value_id}
          min={0}
        />
      </div>

      <div className='flex flex-col'>
        <Input
          label='Value'
          data={form.value}
          setData={setFormValue('value')}
          error={errors.value}
        />
      </div>

      {hasSecondValue && (
        <div className='flex flex-col'>
          <Input
            label='Second Value'
            data={form.second_value}
            setData={setFormValue('second_value')}
            error={errors.second_value}
          />
        </div>
      )}

      <div className='flex gap-5 md:col-span-2'>
        {referenceData == null && (
          <Button
            label='SAVE'
            processing={processing}
          />
        )}
        {referenceData != null && (
          <>
            <Button
              label='UPDATE'
              processing={processing}
            />
            <Button
              label='DELETE'
              type='danger'
              buttonType='button'
              processing={processing}
              onClick={openDelete}
            />
          </>
        )}
      </div>
    </form>
  )
}

export default ReferenceDataForm
