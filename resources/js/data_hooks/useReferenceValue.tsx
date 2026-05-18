import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { handleHttpErrors } from '../ui/alerts'

export interface ReferenceDataValue {
  value_one: string
}

const useReferenceValue = (domain: string, parameter: string): [values: ReferenceDataValue[]] => {
  const [values, setValues] = useState<ReferenceDataValue[]>([])

  const fetchValues = useCallback(() => {
    axios
      .get(`/get-reference-data-values?domain=${domain}&parameter=${parameter}`)
      .then((result) => setValues(result.data))
      .catch(handleHttpErrors)
  }, [domain, parameter])

  useEffect(() => {
    fetchValues()
  }, [fetchValues])

  return [values]
}

export default useReferenceValue
