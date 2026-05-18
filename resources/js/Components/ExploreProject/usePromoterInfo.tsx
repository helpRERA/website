import { useEffect, useState } from 'react'
import { UserProfile } from '../../DataStructures/krera_interfaces'

/**
 * promoters name, address, landmark, pin code, email, phone are calculated
 * if InfoTypeValue is  1 then promoter is individual else promoter is company
 *
 * @param userProfile
 */
const usePromoterInfo = (userProfile: UserProfile | null) => {
  const [promoterName, setPromoterName] = useState('')
  const [promoterAddress, setPromoterAddress] = useState('')
  const [promoterLandmark, setPromoterLandmark] = useState('')
  const [promoterPinCode, setPromoterPinCode] = useState('')
  const [promoterEmail, setPromoterEmail] = useState('')
  const [promoterPhone, setPromoterPhone] = useState('')
  const [promoterDistrict, setPromoterDistrict] = useState('')

  useEffect(() => {
    if (userProfile) {
      if (userProfile.InfoTypeValue === '1') {
        setPromoterName(
          userProfile.IndivisualName +
            ' ' +
            userProfile.IndivisualMName +
            ' ' +
            userProfile.IndivisualLName
        )
        setPromoterAddress(
          userProfile.IndivisualHouseNo +
            ', ' +
            userProfile.IndivisualBuilding +
            ', ' +
            userProfile.IndivisualStreet +
            ', ' +
            userProfile.IndivisualLocality
        )
        setPromoterLandmark(userProfile.IndivisualLandmark ?? '')
        setPromoterPinCode(userProfile.IndivisualPinCode ?? '')
        setPromoterEmail(userProfile.IndivisualEmailID ?? '')
        setPromoterPhone(userProfile.IndivisualMobileNo ?? '')
        setPromoterDistrict(userProfile.individual_district?.Districtname ?? '')
      } else {
        setPromoterName(userProfile.CompanyName)
        setPromoterAddress(
          userProfile.CompanyHouseNo +
            (userProfile.CompanyHouseNo == '' ? '' : ', ') +
            userProfile.CompanyBuilding +
            (userProfile.CompanyBuilding == '' ? '' : ', ') +
            userProfile.CompanyStreet +
            ', ' +
            userProfile.CompanyLocality
        )
        setPromoterLandmark(userProfile.CompanyLandmark ?? '')
        setPromoterPinCode(userProfile.CompanyPinCode ?? '')
        setPromoterEmail(userProfile.CompanyEmailID ?? '')
        setPromoterPhone(userProfile.CompanyMobileNo ?? '')
        setPromoterDistrict(userProfile.company_district?.Districtname ?? '')
      }
    }
  }, [userProfile])

  return {
    promoterName,
    promoterAddress,
    promoterLandmark,
    promoterPinCode,
    promoterEmail,
    promoterPhone,
    promoterDistrict,
  }
}

export default usePromoterInfo
