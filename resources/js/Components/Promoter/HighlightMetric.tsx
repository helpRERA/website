interface Props {
  value: number | string
  label: string
  labelLineTwo?: string
  alignCenter?: boolean
  valueStyle?: string
  labelStyle?: string
}

export default function HighlightMetric({
  value,
  label,
  labelLineTwo,
  alignCenter = true,
  valueStyle,
  labelStyle,
}: Props) {
  return (
    <div className={`flex w-full flex-col justify-center ${alignCenter ? 'items-center' : ''}`}>
      {/* <span className='text-xl font-semibold'>{value}</span>
      <span className='text-xs'>{label}</span> */}

      {valueStyle ? (
        <span className={` ${valueStyle}`}>{value}</span>
      ) : (
        <span className='text-xl font-semibold'>{value}</span>
      )}

      {labelStyle ? (
        <span className={` ${labelStyle}`}>{label}</span>
      ) : (
        <span className='text-xs'>{label}</span>
      )}

      {labelStyle ? (
        <span className={` ${labelStyle}`}>{labelLineTwo}</span>
      ) : (
        <span className='text-xs'>{labelLineTwo}</span>
      )}
    </div>
  )
}
