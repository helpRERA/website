import { useCallback, useEffect, useState } from 'react'
import { Taluk } from '../DataStructures/krera_interfaces'
import axios from 'axios'

const useTalukData = (districtId: number | null) => {
  const [taluks, setTaluks] = useState<Taluk[]>([])

  const fetchData = useCallback(() => {
    axios
      .get(`/taluk-list?district=${districtId}`)
      .then((res) => {
        setTaluks(res.data)
      })
      .catch((error) => console.log(error))
  }, [districtId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return taluks
}

export default useTalukData
