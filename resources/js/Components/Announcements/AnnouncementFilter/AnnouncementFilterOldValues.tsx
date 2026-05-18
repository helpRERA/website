import React, { useCallback, useMemo } from 'react'
import { getDisplayDate } from '../../../libs/dates'
import { AnnouncementListPageProperties } from '../../../Pages/AnnouncementListing/AnnouncementListingPage'
import BorderedPill from '../../../ui/Pills/BorderedPill'

interface Properties
  extends Pick<
    AnnouncementListPageProperties,
    'oldSearch' | 'oldFrom' | 'oldTo' | 'oldType' | 'oldSort' | 'oldSubType'
  > {
  performSearch: (
    search: string,
    from: string,
    to: string,
    type: string,
    subType: string,
    sort: string
  ) => void
}

const AnnouncementFilterOldValues = ({
  oldSearch,
  oldFrom,
  oldTo,
  oldType,
  oldSort,
  oldSubType,
  performSearch,
}: Properties) => {
  const datesLabel = useMemo(() => {
    if (oldFrom == '' && oldTo == '') {
      return null
    }
    if (oldFrom != '' && oldTo != '') {
      return `Between ${getDisplayDate(oldFrom)}  ${getDisplayDate(oldTo)}`
    } else if (oldFrom == '') {
      return `Before ${getDisplayDate(oldTo)}`
    } else {
      return `After ${getDisplayDate(oldFrom)}`
    }
  }, [oldFrom, oldTo])

  const searchAgain = useCallback(
    (search: string, from: string, to: string, type: string, subType: string) => {
      performSearch(search, from, to, type, subType, oldSort)
    },
    [oldSort, performSearch]
  )

  return (
    <div className='flex flex-wrap justify-center gap-5'>
      {oldSearch != '' && (
        <BorderedPill
          value={oldSearch}
          onClose={() => searchAgain('', oldFrom, oldTo, oldType, oldSubType)}
        />
      )}
      {datesLabel != null && (
        <BorderedPill
          value={datesLabel}
          onClose={() => searchAgain(oldSearch, '', '', oldType, oldSubType)}
        />
      )}
      {oldType != '' && (
        <BorderedPill
          value={oldType}
          onClose={() => searchAgain(oldSearch, oldFrom, oldTo, '', oldSubType)}
        />
      )}
      {oldSubType != '' && (
        <BorderedPill
          value={oldSubType}
          onClose={() => searchAgain(oldSearch, oldFrom, oldTo, oldType, '')}
        />
      )}
    </div>
  )
}

export default AnnouncementFilterOldValues
