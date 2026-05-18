import { Partner } from '../../DataStructures/krera_interfaces'
import AccordionItem from '../Common/Accordion/AccordionItem'
import React from 'react'

interface Props {
  partners: Partial<Partner>[]
}

export default function PartnersAccordion({ partners }: Props) {
  return (
    <>
      {partners?.map((partner) => (
        <>
          <AccordionItem
            key={partner.ID}
            title={`${partner.FName} ${partner.MName} ${partner.LName} - ${partner.member_designation?.Designation}`}
          >
            <div className='flex w-full'>
              <div className='flex w-1/3  flex-shrink-0 gap-2'>
                <div className='w-full'>
                  <img
                    src={
                      partner.FileName == null
                        ? '/placeholder.png'
                        : '/partner-images/' + partner.ID
                    }
                    alt={partner.FName ?? 'Partner Image'}
                    className={`aspect-[4/3] h-auto w-full rounded object-contain object-center`}
                    loading='lazy'
                    decoding='async'
                  />
                </div>
              </div>
              <div className='grid grid-cols-3 gap-1 pl-2'>
                <span className='col-span-1 text-xs font-semibold'>PAN NO</span>
                <span className='col-span-2 text-xs'>{partner.PanNo}</span>

                {/* <span className='col-span-1 text-xs font-semibold'>Mobile No</span>
                      <span className='col-span-2 text-xs'>{partner.MobileNo}</span> */}
                <span className='col-span-1 text-xs font-semibold'>Email</span>
                <span className='col-span-2 text-xs'>{partner.EmailID}</span>
                <span className='col-span-1 text-xs font-semibold'>Address</span>
                <span className='col-span-2 text-xs'>
                  {partner.HouseNo}, {partner.Building} <br />
                  {partner.Street}, {partner.Locality} <br />{' '}
                  {`${partner.district?.Districtname}, ${partner.district?.state?.stateName}`}{' '}
                  <br /> {partner.PinCode}
                </span>
              </div>
            </div>
          </AccordionItem>
        </>
      ))}
    </>
  )
}
