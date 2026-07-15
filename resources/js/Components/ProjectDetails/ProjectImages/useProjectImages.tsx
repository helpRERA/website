import { useMemo } from 'react'
import { UploadedImage } from '../../../DataStructures/krera_interfaces'

const useProjectImages = (images: UploadedImage[]) => {
  return useMemo(() => {
    if (!images || images.length === 0) {
      return []
    }
    return images
  }, [images])
}

export default useProjectImages
