import { District } from '../../DataStructures/krera_interfaces'
import { ProjectListData } from '../../Pages/ProjectList/ProjectListPage'
import Pagination from '../../ui/table/Pagination'
import Table from '../../ui/table/Table'
import { Language, Paginator } from '../../ui/ui_interfaces'
import ProjectListFilter from './ProjectListFilter'
import { useMemo } from 'react'

interface Properties {
  districts: District[]
  lang?: Language
  oldProjectName?: string
  oldRegistrationNumber?: string
  oldDistrict?: string
  oldTaluk?: string
  oldVillage?: string
  oldPincode?: string
  oldWorkStatus?: string
  oldFrom?: string
  oldTo?: string
  projects: Paginator<ProjectListData>
}

const heads = [
  'Project',
  'Promoter Name',
  'Project Type',
  'Project Start Date',
  'Date of Completion',
  'Certificate No',
  'Certificate Date',
  'Last Modified Date',
  'Total',
  'Sold',
  'Status',
  'District',
  'Village',
  'Taluk',
]

const ProjectList = ({
  projects,
  districts,
  lang = 'en',
  oldProjectName = '',
  oldRegistrationNumber = '',
  oldDistrict = '',
  oldTaluk = '',
  oldVillage = '',
  oldWorkStatus = '',
  oldFrom = '',
  oldTo = '',
}: Properties) => {
  const exportUrl = useMemo(() => {
    const urlParameters = new URLSearchParams()
    urlParameters.set('project_name', oldProjectName)
    urlParameters.set('registration_number', oldRegistrationNumber)
    urlParameters.set('district', oldDistrict)
    urlParameters.set('taluk', oldTaluk)
    urlParameters.set('village', oldVillage)
    urlParameters.set('work_status', oldWorkStatus)
    urlParameters.set('from', oldFrom)
    urlParameters.set('to', oldTo)

    return `/export-projects?${urlParameters.toString()}`
  }, [
    oldFrom,
    oldTo,
    oldDistrict,
    oldTaluk,
    oldVillage,
    oldWorkStatus,
    oldProjectName,
    oldRegistrationNumber,
  ])

  return (
    <>
      <ProjectListFilter
        districts={districts}
        lang={lang}
        oldProjectName={oldProjectName}
        oldRegistrationNumber={oldRegistrationNumber}
        oldDistrict={oldDistrict}
        oldTaluk={oldTaluk}
        oldVillage={oldVillage}
        oldWorkStatus={oldWorkStatus}
        oldFrom={oldFrom}
        oldTo={oldTo}
      />
      <div className='flex w-full justify-end'>
        <a
          className='text-blue-500 underline hover:font-semibold hover:text-blue-600'
          target='_blank'
          href={exportUrl}
          rel='noreferrer'
        >
          EXPORT
        </a>
      </div>
      <Table heads={heads}>
        <tbody>
          {projects.data.map((project) => (
            <tr
              key={project.Project}
              className='standard-tr'
            >
              <td className='standard-td'>{project.Project}</td>
              <td className='standard-td'>{project.PromoterName}</td>
              <td className='standard-td'>{project.ProjectType}</td>
              <td className='standard-td'>{project.ProjectStartDate}</td>
              <td className='standard-td'>{project.DateOfCompletion}</td>
              <td className='standard-td'>{project.CertiNo}</td>
              <td className='standard-td'>{project.Certificate_Date}</td>
              <td className='standard-td'>{project.lastModifiedDate}</td>
              <td className='standard-td'>{project.Total}</td>
              <td className='standard-td'>{project.Sold}</td>
              <td className='standard-td'>{project.Status}</td>
              <td className='standard-td'>{project.District}</td>
              <td className='standayd-td'>{project.Village}</td>
              <td className='standard-td'>{project.Taluka}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='my-5'>
        <Pagination pagination={projects} />
      </div>
    </>
  )
}

export default ProjectList
