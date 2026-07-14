import React, { useCallback, useEffect, useState } from 'react'
import CheckBox from '../../../ui/form/CheckBox'
import useReferenceValue from '../../../data_hooks/useReferenceValue'
import CheckList from '../../../ui/form/CheckList'
import Localization from '../../../ui/Localization'
import { localization } from '../../../Localization/localization'
import { Language } from '../../../ui/ui_interfaces'

interface CheckList {
  value: string
  checked: boolean
}

interface Properties {
  onAmenitiesChange: (amenities: string) => void
  oldAmenities: string
  lang?: Language
}

/**
 * Check List of Amenities Based On Amenities Reference Data
 * on check change it will call onAmenitiesChange with comma separated string of amenities
 * oldAmenities is used to set the initial checked state of amenities
 */
const AmenitiesCheckList = ({ onAmenitiesChange, oldAmenities, lang = 'en' }: Properties) => {
  const [amenities] = useReferenceValue('Project', 'Amenity')
  const [checkList, setCheckList] = useState<CheckList[]>([])

  useEffect(() => {
    const oldAmenitiesList = oldAmenities.split(',')
    setCheckList(() => {
      return amenities.map((amenity) => {
        return {
          value: amenity.value_one,
          checked: oldAmenitiesList.includes(amenity.value_one),
        }
      })
    })
  }, [amenities, oldAmenities])

  const onChange = useCallback((key: string) => {
    setCheckList((oldCheckList) => {
      return oldCheckList.map((checkListItem) => {
        if (checkListItem.value === key) {
          return {
            value: checkListItem.value,
            checked: !checkListItem.checked,
          }
        }
        return checkListItem
      })
    })
  }, [])

  useEffect(() => {
    const result = checkList
      .filter((item) => item.checked)
      .map((item) => item.value)
      .join(',')
    onAmenitiesChange(result)
  }, [checkList, onAmenitiesChange])

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex flex-wrap gap-8 w-full'>
        {checkList.map((amenity) => {
          return (
            <div
              className='flex flex-col'
              key={amenity.value}
            >
              <CheckBox
                data={amenity.checked}
                toggle={() => onChange(amenity.value)}
                label={amenity.value}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AmenitiesCheckList
