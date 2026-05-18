import { Project } from '../../DataStructures/krera_interfaces'
import { useMemo } from 'react'
import dayjs from 'dayjs'

export default function useProjectsState(projects: Partial<Project>[], today: string) {
  return useMemo(() => {
    let ongoingProjects = 0
    let completedProjects = 0
    let expiredProjects = 0
    const totalProjects = projects.length ?? 0
    const todayDate = dayjs(today)

    projects.forEach((project) => {
      if ((project.documents?.length ?? 0) > 0) {
        completedProjects++
        return
      }
      if (project.ProposedDateOfCompletion == null) {
        ongoingProjects++
        return
      }
      const proposedDate = dayjs(project.ProposedDateOfCompletion)
      if (proposedDate.isBefore(todayDate)) {
        expiredProjects++
        return
      }
      ongoingProjects++
    })

    return {
      ongoingProjects,
      completedProjects,
      totalProjects,
      expiredProjects,
    }
  }, [projects, today])
}
