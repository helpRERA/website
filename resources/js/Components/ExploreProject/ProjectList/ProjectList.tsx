import React from 'react'
import { Language, Paginator } from '../../../ui/ui_interfaces'
import ProjectCard from './ProjectCard'
import { ProjectListItem } from '../ExploreProject'

interface Properties {
  projects: Paginator<ProjectListItem>
  lang?: Language
  today: string
}

const ProjectList = ({ projects, today, lang = 'en' }: Properties) => {
  return (
    <div className='mt-10 flex w-full flex-col gap-10'>
      {projects.data.map((project) => {
        return (
          <ProjectCard
            project={project}
            today={today}
            key={project.ID.toString()}
            lang={lang}
          />
        )
      })}
    </div>
  )
}
export default ProjectList
