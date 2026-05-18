import { router } from '@inertiajs/react'
import { useCallback } from 'react'
import Card from '../../../ui/card/Card'
import CardHeader from '../../../ui/card/CardHeader'
import PageInfoForm, { PageDataForm } from './PageInfoForm'

const MakePage = () => {
  const handleSubmit = useCallback((form: PageDataForm) => {
    router.post('/page-builder', form as any)
  }, [])

  return (
    <Card>
      <CardHeader
        title='Create A New Page'
        back='/page-builder'
      />
      <div className='flex w-full md:w-1/2'>
        <PageInfoForm onSubmit={handleSubmit} />
      </div>
    </Card>
  )
}

export default MakePage
