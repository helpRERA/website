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
      <div className='flex h-[300px] lg:h-[400px] w-full gap-4'>
        {/* Left Large Image */}
        <div className={`h-full ${images.length > 1 ? 'w-1/2' : 'w-full'}`}>
          {images.length === 0 ? (
            <div className='flex h-full w-full flex-col items-center justify-center rounded-xl bg-gray-100 text-gray-400'>
              <svg className='w-24 h-24 mb-4 opacity-50' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z' clipRule='evenodd' />
              </svg>
              <span className='text-sm font-medium'>No images available</span>
            </div>
          ) : (
            images[0] && (
              <ProjectImageThumbnail
                key={images[0].ID?.toString() + ' 0 ' + project.ID.toString()}
                image={images[0]}
                altText={project.Name}
                onClick={() => setCurrentSlide(0)}
                className='h-full w-full object-cover rounded-xl'
              />
            )
          )}
        </div>
        {/* Right Small Images */}
        {images.length > 1 && (
          <div className='flex h-full w-1/2 flex-col gap-4'>
            {images[1] && (
              <div className={`w-full ${images.length > 2 ? 'h-[calc(50%-0.5rem)]' : 'h-full'}`}>
                <ProjectImageThumbnail
                  key={images[1].ID?.toString() + ' 1 ' + project.ID.toString()}
                  image={images[1]}
                  altText={project.Name}
                  onClick={() => setCurrentSlide(1)}
                  className='h-full w-full object-cover rounded-xl'
                />
              </div>
            )}
            {images[2] && (
              <div className='relative h-[calc(50%-0.5rem)] w-full'>
                <ProjectImageThumbnail
                  key={images[2].ID?.toString() + ' 2 ' + project.ID.toString()}
                  image={images[2]}
                  altText={project.Name}
                  onClick={() => setCurrentSlide(2)}
                  className='h-full w-full object-cover rounded-xl'
                />
                {project.images != null && project.images.length > 3 && (
                  <div
                    className='absolute inset-0 flex cursor-pointer items-center justify-center rounded-xl bg-black/50 transition hover:bg-black/40'
                    onClick={() => setCurrentSlide(3)}
                  >
                    <span className='text-lg font-medium text-white'>
                      +{project.images.length - 3}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
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
