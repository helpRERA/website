import React, { useMemo } from 'react'

interface Props {
  progress: number | string;
  label?: string;
  showProgress?: boolean;
}

const Progress = ({ progress, label, showProgress = true }: Props) => {

  const width = useMemo(() => {
    const numberFormat = Number(progress)
    if (isNaN(numberFormat)) {
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
    <div className="flex flex-col w-full gap-2">
      <div className="relative w-full">
        <hr className="h-2 bg-gray-200 rounded-sm" />
        <hr
          className={`absolute top-0 h-2 rounded-sm bg-progress-bar`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="flex flex-wrap items-center justify-end gap-1">
        {showProgress &&
          <span
            className="text-xs font-normal leading-3 tracking-normal text-text-base">
            {progress} %
          </span>
        }
        {label != null &&
          <span
            className="text-sm font-normal leading-3 tracking-normal text-gray-600 ">
            {label}
          </span>
        }
      </div>
    </div>
  )
}

export default Progress
