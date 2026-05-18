import React, { Dispatch, SetStateAction } from 'react'
import CheckBox from './CheckBox';


export interface CheckListItem {
  id: number;
  label: string;
  checked: boolean;
}

interface Props {
  list: CheckListItem[];
  setList: Dispatch<SetStateAction<CheckListItem[]>>;
  singleSelect?: boolean;
}

export default function CheckList({ list, setList, singleSelect = false }: Props) {

  const toggle = (id: number) => {
    setList(oldList => {
      return oldList.map(item => {
        return item.id === id
          ? { ...item, checked: !item.checked }
          : (singleSelect ? { ...item, checked: false } : item)
      })
    })
  }

  return (
    <>
      {
        list.map((item) => {
          return (
            <CheckBox
              key={item.id}
              label={item.label}
              data={item.checked}
              toggle={() => toggle(item.id)}
            />
          )
        })
      }
    </>
  )
}
