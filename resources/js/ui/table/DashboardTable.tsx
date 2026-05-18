import React from 'react'

export default function DashboardTable({
  children,
  heads,
  editColumn,
}: {
  children?: JSX.Element
  heads: string[]
  editColumn?: boolean
}) {
  return (
    <div className='overflow-auto'>
      <table className='w-full'>
        <thead className=''>
          <tr className='border-textbox-field border-b-2 leading-none text-gray-700 focus:outline-none'>
            {heads.map((head) => {
              return (
                <th
                  scope='col'
                  className='px-3 py-1 text-center text-xs text-gray-600'
                  key={head}
                >
                  {head}
                </th>
              )
            })}
            {editColumn && (
              <th
                scope='col'
                className='px-3 py-1 text-left text-sm font-semibold text-gray-500'
              ></th>
            )}
          </tr>
        </thead>
        {children}
      </table>
    </div>
  )
}
