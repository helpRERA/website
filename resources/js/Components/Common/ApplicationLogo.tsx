import React from 'react'

const ApplicationLogo = ({ className }: { className: string }) => {
  return (
    <img
      src='/imge/logo.png'
      alt='logo'
      className={className}
    />
  )
}

export default ApplicationLogo
