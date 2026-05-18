import { useCallback, useEffect, useState } from 'react'
import { DomainParameter } from '../DataStructures/data_interfaces'
import axios from 'axios'

const useReferenceDataParameter = (
  domain: string
): [parameters: DomainParameter[], loading: boolean] => {
  const [parameters, setParameters] = useState<DomainParameter[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(() => {
    setParameters([])
    if (domain === '') {
      return
    }
    setLoading(true)
    axios
      .get(`/parameters/${domain}`)
      // eslint-disable-next-line unicorn/prevent-abbreviations
      .then((res) => {
        setParameters(res.data)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [domain])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [parameters, loading]
}

export default useReferenceDataParameter
