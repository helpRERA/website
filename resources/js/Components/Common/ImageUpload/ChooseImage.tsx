import { useState } from 'react'
import { Image } from '../../../DataStructures/data_interfaces'
import Tabs from '../../../ui/Tab/Tabs'
import SelectUploadedImage from './SelectUploadedImage'
import UploadNewImage from './UploadNewImage'

const tabItems = [{ value: 'Upload New Image' }, { value: 'Select File' }]

interface Properties {
  onImage: (file: Image) => void
}

const ChooseImage = ({ onImage }: Properties) => {
  const [selectedTab, setSelectedTab] = useState('Upload New Image')

  return (
    <div className='p-2'>
      <div className='w-full'>
        <Tabs
          items={tabItems}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      {selectedTab == 'Upload New Image' && <UploadNewImage onUpload={onImage} />}
      {selectedTab === 'Select File' && <SelectUploadedImage onSelect={onImage} />}
    </div>
  )
}

export default ChooseImage
