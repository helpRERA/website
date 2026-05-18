import { useMemo } from 'react'

interface Properties {
  progress: number | string
  backgroundColor?: string
  progressColor?: string
}

const ProgressLine = ({
  progress,
  progressColor = 'bg-teal-500',
  backgroundColor = 'bg-amber-200',
}: Properties) => {
  const width = useMemo(() => {
    const numberFormat = Number(progress)
    if (Number.isNaN(numberFormat)) {
      return 0
    }
    if (numberFormat < 0) {
      return 0
    }
    if (numberFormat > 100) {
      return 100
    }
    return Math.ceil(numberFormat)
  }, [progress])

  return (
    <div className='relative w-full'>
      <hr className={`h-2 ${backgroundColor} rounded-sm`} />
      <hr
        className={`absolute top-0 h-2 rounded-sm ${progressColor}`}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

export default ProgressLine
