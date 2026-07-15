import React from 'react'

interface Properties {
  image: { ID: number | null }
  altText: string
  onClick: () => void
  className?: string
}

const ProjectImageThumbnail = ({ image, altText, onClick, className }: Properties) => {
  return (
    <>
      <div
        className='cursor-pointer h-full w-full'
        onClick={() => onClick()}
      >
        <img
          src={image.ID == null ? '/placeholder.png' : `/uploaded-images/${image.ID}`}
          alt={altText}
          className={className ? className : `aspect-[4/3] h-auto w-full rounded object-cover object-center`}
          loading='lazy'
          decoding='async'
        />
      </div>
    </>
  )
}

export default ProjectImageThumbnail
