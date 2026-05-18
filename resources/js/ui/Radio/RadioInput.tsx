interface Props<
  K extends keyof T,
  G extends keyof T,
  T extends Record<K, string> & Record<G, string>
> {
  data: string
  setData: (data: string) => void
  list: T[]
  dataKey: K
  displayKey: G
}

const RadioInput = <
  K extends keyof T,
  G extends keyof T,
  T extends Record<K, string> & Record<G, string>
>({
  data,
  setData,
  list,
  dataKey,
  displayKey,
}: Props<K, G, T>) => {
  return (
    <>
      {list.map((item: T) => {
        return (
          <div
            key={item[dataKey]}
            className='flex items-center gap-2'
          >
            <input
              type='radio'
              name='type'
              checked={item[dataKey] === data}
              onChange={() => setData(item[dataKey])}
            />
            <label>{item[displayKey]}</label>
          </div>
        )
      })}
    </>
  )
}

export default RadioInput
