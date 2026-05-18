import { useMemo } from 'react'
import { ProjectDetailData } from '../../Pages/ProjectDetails'

const useProjectAddress = (project: ProjectDetailData) => {
  return useMemo(() => {
    const locations = []
    if (project.village != null) {
      locations.push(project.village.Villagename)
    }
    if (project.taluk != null) {
      locations.push(project.taluk.SubDistrictname)
    }
    if (project.district != null) {
      locations.push(project.district.Districtname)
    }
    locations.push('Kerala')
    return locations.join(', ')
  }, [project])
}

export default useProjectAddress
