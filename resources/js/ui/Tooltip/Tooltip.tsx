interface Properties {
  text: string
}

// parent should have class tooltip-parent
const Tooltip = ({ text }: Properties) => {
  return (
    <div
      className='tooltip absolute top-full left-1/2 w-24 -translate-x-[3rem]
          rounded-md bg-gray-800 px-2 py-1 text-center text-white'
    >
      {text}
    </div>
  )
}

export default Tooltip
