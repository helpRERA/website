import React, { useState } from 'react'
import useProjectImages from '../ProjectImages/useProjectImages'
import ProjectImageThumbnail from '../ProjectImages/ProjectImageThumbnail'
import ProjectImageSlideShow from '../ProjectImages/ProjectImageSlideShow'
import { ProjectDetailData } from '../../../Pages/ProjectDetails'

interface Properties {
  project: ProjectDetailData
}

const ProjectImagesList = ({ project }: Properties) => {
  const images = useProjectImages(project.images ?? [])
  const [showModal, setShowModal] = useState(false)
  const [currentSlide, setSelectedImage] = useState<number | null>(null)

  const setCurrentSlide = (imageListIndex: number) => {
    setShowModal(true)
    setSelectedImage(imageListIndex)
  }

  return (
    <>
      <div className='grid grid-cols-1  gap-5 md:grid-cols-2'>
        {images.map((image, index) => {
          return (
            <ProjectImageThumbnail
              key={image.ID?.toString() + ' ' + index + ' ' + project.ID.toString()}
              image={image}
              altText={project.Name}
              onClick={() => setCurrentSlide(index)}
            />
          )
        })}
      </div>
      {project.images != null && project.images.length > 2 && (
        <div className='flex justify-end'>
          <span
            className='cursor-pointer text-xs underline'
            onClick={() => setCurrentSlide(2)}
          >
            show {project.images.length - 2} more
          </span>
        </div>
      )}
      {showModal && currentSlide != null && (
        <ProjectImageSlideShow
          images={project.images != null && project.images.length > 2 ? project.images : images}
          setShowModal={setShowModal}
          currentSlide={currentSlide}
        />
      )}
    </>
  )
}

export default ProjectImagesList
