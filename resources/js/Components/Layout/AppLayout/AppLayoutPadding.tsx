import React from 'react'

interface Properties {
  children: React.ReactNode
}

const AppLayoutPadding = ({ children }: Properties) => {
  return <div className='px-3 md:px-5 lg:px-20 xl:px-24 2xl:px-40'>{children}</div>
}

export default AppLayoutPadding
