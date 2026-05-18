import { Project } from '../../DataStructures/krera_interfaces'
import Pagination from '../../ui/table/Pagination'
import { Language, Paginator } from '../../ui/ui_interfaces'
import GlobalSearchResultCard from './GlobalSearchResultCard'

interface Properties {
  projects: Paginator<Project>
  lang: Language
}

const GlobalSearchProjects = ({ projects, lang }: Properties) => {
  return (
    <>
      <div className='my-10 flex flex-col gap-5'>
        {projects?.data.map((project) => (
          <GlobalSearchResultCard
            lang={lang}
            key={project.ID.toString()}
            title={{ english: project.Name, malayalam: '' }}
            description={{
              english: project.certificate?.RegistrationNo ?? null,
              malayalam: '',
            }}
            link={`/projects/${project.ID}?lang=${lang}`}
          />
        ))}
      </div>
      <div className='my-5'>
        <Pagination pagination={projects} />
      </div>
    </>
  )
}

export default GlobalSearchProjects
