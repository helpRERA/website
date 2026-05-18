import React from 'react'

interface Properties {
  image: { ID: number | null }
  altText: string
  onClick: () => void
}

const ProjectImageThumbnail = ({ image, altText, onClick }: Properties) => {
  return (
    <>
      <div
        className='cursor-pointer'
        onClick={() => onClick()}
      >
        <img
          src={image.ID == null ? '/placeholder.png' : `/uploaded-images/${image.ID}`}
          alt={altText}
          className={`aspect-[4/3] h-auto w-full rounded object-cover object-center`}
          loading='lazy'
          decoding='async'
        />
      </div>
    </>
  )
}

export default ProjectImageThumbnail
