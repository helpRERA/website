import React, { RefObject } from 'react'
import BorderedTable from '../../../../ui/table/BorderedTable'
import { ProjectDetailData } from '../../../../Pages/ProjectDetails'
import { Language } from '../../../../ui/ui_interfaces'
import Localization from '../../../../ui/Localization'
import { localization } from '../../../../Localization/localization'

interface Properties {
  reference: RefObject<HTMLDivElement>
  project: ProjectDetailData
  lang?: Language
}

const tableHeads = ['Common Amenities', 'Proposed - Percentage']

const ProjectQuickFact = ({ reference, project, lang = 'en' }: Properties) => {
  return (
    <div className='relative my-5 flex w-full flex-col gap-3 text-sm'>
      <div
        className='absolute -top-[6rem]'
        ref={reference}
      ></div>
      <span className='text-sm font-bold md:text-base'>
        <Localization
          text={localization['Quick Facts']}
          language={lang}
        />
      </span>
      <div className='flex flex-col '>
        <div className='grid grid-cols-1 gap-2'>
          <span className='text-xs md:text-sm'>
            <Localization
              text={localization['Total Floor Area Under Residential Use']}
              language={lang}
            />
            <b>
              {' '}
              {project.TotalFloorAreaUnderResidentialUse == '.00'
                ? 0
                : project.TotalFloorAreaUnderResidentialUse}{' '}
              sqm{' '}
            </b>
          </span>
          <span className='text-xs md:text-sm'>
            <Localization
              text={localization['Total Floor Area Under Other Use']}
              language={lang}
            />
            <b>
              {' '}
              {project.TotalFloorAreaUnderOtherUse == '.00'
                ? 0
                : project.TotalFloorAreaUnderOtherUse}{' '}
              sqm
            </b>
          </span>
        </div>
      </div>
      <BorderedTable heads={tableHeads}>
        <tbody>
          {project.facilities?.map((facility) => {
            return (
              <tr
                className='bordered-tr'
                key={facility.ID.toString()}
              >
                <td className='bordered-td text-left'>{facility.FDetailName}</td>
                <td className='bordered-td text-center'>
                  {facility.Available} - {facility.Percent}%
                </td>
              </tr>
            )
          })}
        </tbody>
      </BorderedTable>
    </div>
  )
}

export default ProjectQuickFact
