import React from 'react'

const ListButton = () => {
  const onClick = () => {
  }

  return (
    <button
      onClick={onClick}
      className="p-2 bg-accent-dark hover:bg-primary-hover text-white
        transition ease-in duration-200 text-center text-base font-semibold
        rounded-[100%] shadow focus:ring-2 focus:ring-offset-1 focus:ring-accent-dark"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    </button>
  )
}

export default ListButton
