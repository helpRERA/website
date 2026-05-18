import { Dispatch, SetStateAction } from 'react'

interface Props {
  showChart: boolean
  setShowChart: Dispatch<SetStateAction<boolean>>
}

export default function VisualizationToggle({ showChart, setShowChart }: Props) {
  return (
    <div className='mb-2 flex w-full justify-end'>
      <div
        className='cursor-pointer'
        onClick={() => setShowChart((old) => !old)}
      >
        {showChart && (
          <img
            src='/dashboard-svgs/graph.svg'
            alt='chart'
            className='h-auto w-20'
          />
        )}
        {!showChart && (
          <img
            src='/dashboard-svgs/table.svg'
            alt='table'
            className='h-auto w-20'
          />
        )}
      </div>
    </div>
  )
}
