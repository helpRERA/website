import { ClickHandler } from '../ui_interfaces'

interface Properties {
  onClick: ClickHandler
}

const ImagePickButton = ({ onClick }: Properties) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='rounded-lg bg-primary-600 py-2 px-4 text-center text-base font-semibold
            text-white shadow-md transition duration-200 ease-in  hover:bg-primary-500'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
          clipRule='evenodd'
        />
      </svg>
    </button>
  )
}

export default ImagePickButton
