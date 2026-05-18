import { router } from '@inertiajs/react'
import React, { useEffect, useReducer, useState } from 'react'
import {
  BlockImage,
  FooterData,
  LinkData,
  PageBlock,
  TextData,
} from '../../../DataStructures/ui_builder_interfaces'
import use419Error from '../../../hooks/use419Error'
import Button from '../../../ui/button/Button'
import { Language } from '../../../ui/ui_interfaces'
import { ItemListField } from '../../UiBuilder/DefaultBlockData'
import BlockEditor from '../../UiBuilder/PageBuilder/BlockEditor'
import PageBuilderService from '../../UiBuilder/PageBuilder/pageBuilderService'

export interface FooterDataInterface {
  image?: BlockImage | null
  description: TextData | null
  sectionOne: TextData | null
  sectionTwo: TextData | null
  sectionThree: TextData | null
  sectionFour: TextData | null
  oneLinks?: ItemListField<LinkData>
  twoLinks?: ItemListField<LinkData>
  threeLinks?: ItemListField<LinkData>
  fourLinks?: ItemListField<LinkData>
  facebook?: LinkData
  instagram?: LinkData
  twitter?: LinkData
}

const defaultFooterData: FooterDataInterface = {
  image: null,
  description: { english: '', malayalam: '' },
  sectionOne: { english: '', malayalam: '' },
  sectionTwo: { english: '', malayalam: '' },
  sectionThree: { english: '', malayalam: '' },
  sectionFour: { english: '', malayalam: '' },
  oneLinks: {
    lastUUID: 0,
    items: [],
  },
  twoLinks: {
    lastUUID: 0,
    items: [],
  },
  threeLinks: {
    lastUUID: 0,
    items: [],
  },
  fourLinks: {
    lastUUID: 0,
    items: [],
  },
}

interface Properties {
  footer: FooterData
}

const getPage = (footer: FooterData | null): PageBlock => {
  let data = defaultFooterData
  if (footer != null && footer.items != null) {
    data = footer.items
  }
  return {
    lastUUID: 1,
    blocks: [
      {
        id: 1,
        blockName: 'Footer',
        position: 1,
        ...data,
      },
    ],
  }
}

const FooterEditor = ({ footer }: Properties) => {
  const [footerData, dispatch] = useReducer(PageBuilderService, getPage(footer))
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en')

  use419Error()

  useEffect(() => {
    console.log(footerData)
  }, [footerData])

  const saveChanges = () => {
    router.post('/footer-editor', {
      data: footerData.blocks[0],
    } as any)
  }

  const changeLanguage = () => {
    if (selectedLanguage === 'en') {
      setSelectedLanguage('mal')
    } else {
      setSelectedLanguage('en')
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between gap-5'>
        <Button
          label='SAVE'
          onClick={saveChanges}
        />
        <Button
          type='secondary'
          label={selectedLanguage}
          onClick={changeLanguage}
        />
      </div>
      {footerData.blocks.length > 0 && (
        <BlockEditor
          block={footerData.blocks[0]}
          dispatch={dispatch}
          language={selectedLanguage}
        />
      )}
    </div>
  )
}

export default FooterEditor
