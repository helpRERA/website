import React from 'react'

export default function CardBody({children}: {children: JSX.Element}) {
  return (
    <div className="w-full p-3">
      {children}
    </div>
  )
}
