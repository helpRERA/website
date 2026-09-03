import React from 'react'
import { DocumentsByType } from '../../../../DataStructures/data_interfaces'
import { ProjectDetailData } from '../../../../Pages/ProjectDetails'
import { projectDocCategories } from '../../../ExploreProject/project-document-categories'
import ProjectDocumentAccordion from '../QuickFact/ProjectDocumentAccordion'

interface Properties {
  project: ProjectDetailData
  orders: DocumentsByType[]
}

const ProjectOrders = ({ project, orders }: Properties) => {
  const orderCategory = projectDocCategories.find((category) => category.type === 'order')

  return (
    <div className='mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-4 mb-10'>
      <h3 className='text-[20px] font-medium text-[#085484] mb-2' style={{ fontFamily: "'Urbanist', sans-serif" }}>
        Project Related Orders
      </h3>
      {orders.length === 0 && (
        <div className='text-sm text-gray-400'>No orders available</div>
      )}
      {orderCategory != null && (
        <ProjectDocumentAccordion
          documents={orders}
          projectCategory={orderCategory}
          project={project}
        />
      )}
    </div>
  )
}

export default ProjectOrders
