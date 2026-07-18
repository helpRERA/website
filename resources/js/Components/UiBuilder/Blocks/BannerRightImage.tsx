import { useState } from 'react'
import { router } from '@inertiajs/react'
import EditLabel from '../../../ui/button/EditLabel'
import Localization from '../../../ui/Localization'
import { BlocKFieldInfo, BlockFieldTypes, BlockFieldValues } from '../PageBuilder/BlockEditor'
import AddLabel from '../AddLabel'
import { HalfImageBlock, imageBlock } from '../DefaultBlockData'
import { Language } from '../../../ui/ui_interfaces'
import LinkButton from '../../../ui/button/LinkButton'
interface Properties {
  registeredProjects?: number
  registeredAgents?: number
  complaintsCount?: number
  promotersCount?: number
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: HalfImageBlock
  language?: Language
}


function BannerRightImage({
  registeredAgents,
  registeredProjects,
  complaintsCount,
  promotersCount,
  editMode = false,
  onFieldEdit,
  blockData = imageBlock,
  language = 'en',
}: Properties) {
  const [activeTab, setActiveTab] = useState<'projects' | 'agents' | 'complaints' | 'cases'>('projects')

  // Search state
  const [projectSearch, setProjectSearch] = useState('')
  const [agentSearch, setAgentSearch] = useState('')
  const [agentRegNo, setAgentRegNo] = useState('')
  const [complaintSearch, setComplaintSearch] = useState('')
  const [caseDate, setCaseDate] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeTab === 'projects') {
      router.get('/explore-projects', { search: projectSearch })
    } else if (activeTab === 'agents') {
      router.get('/agents', { agent_name: agentSearch, registration_number: agentRegNo })
    } else if (activeTab === 'complaints') {
      router.get('/complaint-list', { search: complaintSearch })
    } else if (activeTab === 'cases') {
      router.get('/cause-list', { date: caseDate })
    }
  }

  const activeTabClass = 'w-full sm:w-auto rounded-xl md:rounded-full bg-[#0b4b7a] px-6 py-2.5 text-sm font-medium text-white transition-colors'
  const inactiveTabClass = 'w-full sm:w-auto rounded-xl md:rounded-full px-6 py-2.5 text-sm font-medium text-[#246b9a] transition-colors hover:bg-gray-100 bg-white'

  const onEdit = (

    field: string,
    fieldType: BlockFieldTypes,
    oldValue: BlockFieldValues,
    action: 'UPDATE' | 'REMOVE' | 'INSERT',
    index?: number
  ) => {
    if (onFieldEdit) {
      onFieldEdit({
        field,
        fieldType,
        oldValue,
        action,
        itemIndex: index,
      })
    }
  }

  return (
      <div
        className='relative w-full overflow-hidden'
        style={{
          backgroundImage: `url('/imge/newhome.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
        <div className='cmpad relative z-10 flex min-h-[calc(100vh-48px)] flex-col items-center justify-center pb-16 pt-36 lg:pt-48'>
          <h1 className='text-center text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl font-urbanist'>
            Kerala Real Estate Regulatory Authority
          </h1>
          <p className='mt-4 text-center text-xl font-medium text-gray-200 md:text-2xl lg:text-3xl font-urbanist'>
            Ensuring Transparency in Real Estate
          </p>

          {/* Search Card UI */}
          <div className='mx-auto mt-12 w-full max-w-5xl px-4 md:mt-16 lg:max-w-[1000px]'>
            {/* Filter Tabs */}
            <div className='mb-6 flex justify-center'>
              <div className='flex w-full flex-col sm:w-auto sm:flex-row items-center justify-center gap-2 rounded-2xl bg-white p-2 shadow-md md:rounded-full'>
                <button onClick={() => setActiveTab('projects')} className={activeTab === 'projects' ? activeTabClass : inactiveTabClass}>
                  Registered Projects
                </button>
                <button onClick={() => setActiveTab('agents')} className={activeTab === 'agents' ? activeTabClass : inactiveTabClass}>
                  Registered Agents
                </button>
                <button onClick={() => setActiveTab('complaints')} className={activeTab === 'complaints' ? activeTabClass : inactiveTabClass}>
                  Complaints
                </button>
                <button onClick={() => setActiveTab('cases')} className={activeTab === 'cases' ? activeTabClass : inactiveTabClass}>
                  Daily Case List
                </button>
              </div>
            </div>
            
            <div className='w-full rounded-lg bg-white p-6 shadow-md md:p-8 md:pb-6'>
              <form onSubmit={handleSearch}>
                {activeTab === 'projects' && (
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_auto]'>
                    <div className='flex flex-col'>
                      <label className='mb-2 text-sm font-medium text-[#246b9a]'>Project Name</label>
                      <input
                        type='text'
                        value={projectSearch}
                        onChange={(e) => setProjectSearch(e.target.value)}
                        placeholder='Enter Project Name'
                        className='w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label className='mb-2 text-sm font-medium text-[#246b9a]'>District</label>
                      <select className='w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'>
                        <option value=''>Select District</option>
                      </select>
                    </div>
                    <div className='flex flex-col'>
                      <label className='mb-2 text-sm font-medium text-[#246b9a]'>Project Type</label>
                      <select className='w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'>
                        <option value=''>Select Project Type</option>
                      </select>
                    </div>
                    <div className='flex flex-col justify-end'>
                      <button type='submit' className='w-full min-w-[140px] rounded-md bg-[#0b4b7a] p-3 text-sm font-medium text-white transition hover:bg-[#083c63]'>
                        Search
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === 'agents' && (
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]'>
                    <div className='flex flex-col'>
                      <label className='mb-2 text-sm font-medium text-[#246b9a]'>Agent Name</label>
                      <input
                        type='text'
                        value={agentSearch}
                        onChange={(e) => setAgentSearch(e.target.value)}
                        placeholder='Enter Agent Name'
                        className='w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label className='mb-2 text-sm font-medium text-[#246b9a]'>Registration Number</label>
                      <input
                        type='text'
                        value={agentRegNo}
                        onChange={(e) => setAgentRegNo(e.target.value)}
                        placeholder='Enter Registration Number'
                        className='w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'
                      />
                    </div>
                    <div className='flex flex-col justify-end'>
                      <button type='submit' className='w-full min-w-[140px] rounded-md bg-[#0b4b7a] p-3 text-sm font-medium text-white transition hover:bg-[#083c63]'>
                        Search
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === 'complaints' && (
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]'>
                    <div className='flex flex-col'>
                      <label className='mb-2 text-sm font-medium text-[#246b9a]'>Complaint Number / Name</label>
                      <input
                        type='text'
                        value={complaintSearch}
                        onChange={(e) => setComplaintSearch(e.target.value)}
                        placeholder='Enter Complaint Details'
                        className='w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'
                      />
                    </div>
                    <div className='flex flex-col justify-end'>
                      <button type='submit' className='w-full min-w-[140px] rounded-md bg-[#0b4b7a] p-3 text-sm font-medium text-white transition hover:bg-[#083c63]'>
                        Search
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === 'cases' && (
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]'>
                    <div className='flex flex-col'>
                      <label className='mb-2 text-sm font-medium text-[#246b9a]'>Date</label>
                      <input
                        type='date'
                        value={caseDate}
                        onChange={(e) => setCaseDate(e.target.value)}
                        className='w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#0f2c59] focus:outline-none focus:ring-1 focus:ring-[#0f2c59]'
                      />
                    </div>
                    <div className='flex flex-col justify-end'>
                      <button type='submit' className='w-full min-w-[140px] rounded-md bg-[#0b4b7a] p-3 text-sm font-medium text-white transition hover:bg-[#083c63]'>
                        Search
                      </button>
                    </div>
                  </div>
                )}
              </form>
            <div className='mt-5 flex flex-col items-center justify-between sm:flex-row'>
              <span className='text-sm text-gray-500'>Choose one or more options above to search</span>
              <a href={activeTab === 'projects' ? '/explore-projects' : activeTab === 'agents' ? '/agents' : activeTab === 'complaints' ? '/complaint-list' : '/cause-list'} className='mt-2 flex items-center gap-2 text-sm font-medium text-[#4a4a4a] hover:text-[#0f2c59] sm:mt-0'>
                Advance Search <span className='text-xl leading-none'>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerRightImage
