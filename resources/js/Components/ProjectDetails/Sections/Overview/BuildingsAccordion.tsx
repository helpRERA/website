import React, { useMemo } from 'react'
import { ProjectDetailBuilding, ProjectDetailData } from '../../../../Pages/ProjectDetails'
import AccordionItem from '../../../Common/Accordion/AccordionItem'

const BuildingsAccordion = ({ building }: { building: ProjectDetailBuilding }) => {
  const [totalApartments, bookedApartments] = useMemo(() => {
    let totalApartments = 0
    let bookedApartments = 0
    building.apartments.forEach((apartment) => {
      totalApartments += Number.parseInt(apartment.apartment_count)
      bookedApartments += Number.parseInt(apartment.booked_count)
    })
    return [totalApartments, bookedApartments]
  }, [building])

  const title = useMemo(() => {
    return (
      `${building.apartments.length} Unit Types In ${building.Name} ` +
      `(${totalApartments} Units / ` +
      `${bookedApartments} Units Booked)`
    )
  }, [building, totalApartments, bookedApartments])

  return (
    <>
      <AccordionItem title={title}>
        {building.apartments?.map((apartmentType) => {
          return (
            <div
              className='grid grid-cols-3 gap-4'
              key={apartmentType.ApartmentType + ' ' + apartmentType.TotalArea}
            >
              <span className='text-xs md:text-sm'>
                <b>{apartmentType.ApartmentType}</b> , {Number.parseInt(apartmentType.TotalArea)}{' '}
                sqFt
              </span>
              <span className='text-xs md:text-sm'>
                <b>{apartmentType.apartment_count}</b> Total Units
              </span>
              <span className='text-xs md:text-sm'>
                <b>{apartmentType.booked_count}</b> Booked
              </span>
            </div>
          )
        })}
      </AccordionItem>
    </>
  )
}

export default BuildingsAccordion
