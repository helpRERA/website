import React, { useEffect, useState } from 'react'
import { LinkData } from '../../../DataStructures/ui_builder_interfaces'
import Button from '../../../ui/button/Button'
import CheckBox from '../../../ui/form/CheckBox'
import Input from '../../../ui/form/Input'

interface Properties {
  onLink: (data: LinkData | null) => void
  data?: LinkData
  showRemove?: boolean
}

const LinkForm = ({ onLink, data, showRemove = false }: Properties) => {
  const [linkName, setLinkName] = useState('')
  const [malayalamName, setMalayalamName] = useState('')
  const [link, setLink] = useState('')
  const [external, setExternal] = useState(false)

  useEffect(() => {
    if (data != null) {
      setLink(data.link == null ? '' : data.link)
      setLinkName(data.name.english == null ? '' : data.name.english)
      setMalayalamName(data.name.malayalam == null ? '' : data.name.malayalam)
      setExternal(data.external)
    }
  }, [data])

  const addLink = () => {
    onLink({
      name: {
        english: linkName,
        malayalam: malayalamName,
      },
      link,
      external,
    })
  }

  return (
    <>
      <div className='flex w-full flex-col p-2'>
        <Input
          label='English Name'
          data={linkName}
          setData={setLinkName}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <Input
          label='Malayalam Name'
          data={malayalamName}
          setData={setMalayalamName}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <Input
          label='link'
          data={link}
          setData={setLink}
          error=''
        />
      </div>
      <div className='flex w-full flex-col p-2'>
        <CheckBox
          label='Link To Another Website'
          data={external}
          toggle={() => setExternal((old) => !old)}
        />
      </div>
      <div className='flex w-full justify-end gap-x-2 p-2'>
        <Button
          label={data == null ? 'ADD' : 'UPDATE'}
          onClick={addLink}
        />
        {showRemove && (
          <Button
            label='REMOVE'
            type='danger'
            onClick={() => onLink(null)}
          />
        )}
      </div>
    </>
  )
}

export default LinkForm
