import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Village } from '../DataStructures/krera_interfaces'
import { handleHttpErrors } from '../ui/alerts'

const useVillage = (talukId: string) => {
  const [villages, setVillages] = useState<Village[]>([])

  const fetchData = useCallback(() => {
    axios
      .get(`/village-list?taluk=${talukId}`)
      .then((result) => {
        setVillages(result.data)
      })
      .catch(handleHttpErrors)
  }, [talukId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return villages
}

export default useVillage
