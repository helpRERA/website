interface Props {
  value: number | string
  label: string
  unit?: string
}

export default function MetricDisplay({ value, label, unit }: Props) {
  return (
    <div className='flex flex-col'>
      <span className='text-sm'>{label}</span>
      <span className='text-lg'>
        <b>{value} </b> {unit}
      </span>
    </div>
  )
}
