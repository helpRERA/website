import { useMemo } from 'react'
import { UploadedImage } from '../../../DataStructures/krera_interfaces'

const useProjectImages = (images: UploadedImage[]) => {
  return useMemo(() => {
    let list: { ID: number | null }[] = []
    if (images != undefined) {
      list = [...images]
    }
    while (list.length < 2) {
      list.push({
        ID: null,
      })
    }
    return list.slice(0, 2)
  }, [images])
}

export default useProjectImages
