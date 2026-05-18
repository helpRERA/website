import React from 'react'

interface Props {
  label: string;
  data: boolean;
  toggle: () => unknown;
  error?: string | undefined;
}

export default function Switch({ label, data, toggle, error }: Props) {

  const toggleClass = ' transform translate-x-6'

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="standard-label">{ label }</span>
      <div
        className={'w-12 h-6 md:w-14 md:h-7 flex items-center rounded-full p-1 cursor-pointer trasnsform '
          + (data ? 'bg-accent-dark' : 'bg-gray-300')}
        onClick={toggle}
      >
        <div
          className={
            'h-5 w-5 md:w-6 md:h-6 bg-white rounded-full shadow-md transform duration-300 ease-in-out'
            + (data ? toggleClass : null)}
        >
        </div>
      </div>
      {error &&
        <div className="w-full">
          <div className="error-text">{error}</div>
        </div>
      }
    </div>
  )
}
