import { useCallback, useState } from 'react'

/**
 * Group Multiple Form Inputs into a single object
 *
 * @param formFields
 * @returns
 */
function useCustomForm<T>(formFields: T) {
  const [form, setForm] = useState(formFields)

  //set one of the fields in form
  const setFormValue = useCallback(<U extends keyof T>(key: U) => {
    return (value: T[U]) => {
      setForm((previous) => {
        return { ...previous, [key]: value }
      })
    }
  }, [])

  // Set multiple form values
  const setAll = useCallback((values: Partial<T>) => {
    setForm((oldValues) => {
      return {
        ...oldValues,
        ...values,
      }
    })
  }, [])

  const toggleBoolean = useCallback(<U extends keyof T>(key: U) => {
    return () => {
      setForm((previous) => {
        return { ...previous, [key]: !previous[key] }
      })
    }
  }, [])

  return { form, setFormValue, setAll, toggleBoolean }
}

export default useCustomForm
