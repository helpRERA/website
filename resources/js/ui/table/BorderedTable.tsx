import React from 'react'

const BorderedTable = ({
  children,
  heads,
  editColumn,
}: {
  children?: React.ReactNode
  heads?: string[]
  editColumn?: boolean
}) => {
  return (
    <div className='overflow-auto'>
      <table className='w-full border-2 border-black'>
        {heads != null && heads.length > 0 && (
          <thead className=''>
            <tr className='bordered-tr'>
              {heads.map((head) => {
                return (
                  <th
                    scope='col'
                    className='bordered-td'
                    key={head}
                  >
                    {head}
                  </th>
                )
              })}
              {editColumn && (
                <th
                  scope='col'
                  className='bordered-td'
                ></th>
              )}
            </tr>
          </thead>
        )}
        {children}
      </table>
    </div>
  )
}

export default BorderedTable
