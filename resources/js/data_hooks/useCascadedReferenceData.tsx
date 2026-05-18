import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { handleHttpErrors } from '../ui/alerts'
import { ReferenceDataValue } from './useReferenceValue'

const useCascadedReferenceData = (
  domain: string,
  parameter: string,
  secondValue: string
): [values: ReferenceDataValue[]] => {
  const [values, setValues] = useState<ReferenceDataValue[]>([])
  const fetchValues = useCallback(() => {
    console.log(
      `/get-cascaded-reference-values?domain=${domain}&parameter=${parameter}&value=${secondValue}`
    )
    axios
      .get(
        `/get-cascaded-reference-values?domain=${domain}&parameter=${parameter}&value=${encodeURIComponent(
          secondValue
        )}`
      )
      .then((result) => {
        setValues(result.data)
      })
      .catch(handleHttpErrors)
  }, [domain, parameter, secondValue])

  useEffect(() => {
    fetchValues()
  }, [fetchValues])

  return [values]
}

export default useCascadedReferenceData
