export const DOC_LAST_DAY = 'last_day'
export const DOC_ALL = 'all_docs'
export const DOC_LATEST = 'latest_doc'

export interface ProjectCategory {
  id: number
  name: string
  type: 'document' | 'order'
  documents: { DocID: number; name: string; type: string }[]
}

export const projectDocCategories: ProjectCategory[] = [
  {
    id: 1,
    name: 'Main Documents',
    type: 'document',
    documents: [
      {
        DocID: 36,
        name: 'Copy of latest Land Tax Receipt*',
        type: DOC_LAST_DAY,
      },
      {
        DocID: 25,
        name: 'Performa of Agreement for Sale (As per Annexure A)*',
        type: DOC_LAST_DAY,
      },
      {
        DocID: 21,
        name: 'Copy of Valid Building Permit*',
        type: DOC_ALL,
      },
      {
        DocID: 22,
        name: 'Copy of Valid Development Permit*',
        type: DOC_ALL,
      },
      {
        DocID: 122,
        name: 'Occupancy Certificate',
        type: DOC_ALL,
      },
      {
        DocID: 3150,
        name: 'Final Fire NOC',
        type: DOC_LATEST,
      },
      {
        DocID: 3585,
        name: 'Development certificate(for plots & villas)',
        type: DOC_ALL,
      },
      {
        DocID: 121,
        name: 'Declaration by the Promoter - Form No. 6',
        type: DOC_LATEST,
      },
      {
        DocID: 53,
        name: 'Annual report on statement of accounts in Form No. 5',
        type: DOC_LATEST,
      },
    ],
  },
  {
    id: 2,
    name: 'Plan & Brochures',
    type: 'document',
    documents: [
      {
        DocID: 16,
        name: 'Site Plan/Site map',
        type: DOC_LAST_DAY,
      },
      {
        DocID: 23,
        name: 'Copy of Sanctioned Plans*',
        type: DOC_LAST_DAY,
      },
      {
        DocID: 124,
        name: 'Brochure / prospectus issued in regard to this project',
        type: DOC_ALL,
      },
    ],
  },
  {
    id: 3,
    name: 'Separate bank Account - Withdrawal Forms',
    type: 'document',
    documents: [
      {
        DocID: 41,
        name: "Architect's Certificate in Form 2",
        type: DOC_LATEST,
      },
      {
        DocID: 42,
        name: "Engineer's certificate in Form No. 3",
        type: DOC_LATEST,
      },
      {
        DocID: 45,
        name: "Chartered Accountant's Certificate in Form 4",
        type: DOC_LATEST,
      },
    ],
  },
  {
    id: 4,
    name: 'Related Orders ',
    type: 'order',
    documents: [
      {
        DocID: 37,
        name: 'Registration Order',
        type: DOC_ALL,
      },
      {
        DocID: 36,
        name: 'Extension Order',
        type: DOC_ALL,
      },
      {
        DocID: 39,
        name: 'Correction Orders',
        type: DOC_ALL,
      },
      {
        DocID: 88,
        name: 'Other orders',
        type: DOC_ALL,
      },
    ],
  },
]
