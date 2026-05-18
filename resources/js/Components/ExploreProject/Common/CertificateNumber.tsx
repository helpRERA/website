import React from 'react'
import { Certificate } from '../../../DataStructures/krera_interfaces'

interface Properties {
  certificateNumber?: string | null
  certificate?: Pick<Certificate, 'CertificateNo'> | null
}

const CertificateNumber = ({ certificateNumber, certificate }: Properties) => {
  return <>{certificate == null ? certificateNumber : certificate.CertificateNo}</>
}

export default CertificateNumber
