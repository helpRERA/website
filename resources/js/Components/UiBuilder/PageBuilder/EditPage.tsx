import { router } from '@inertiajs/react'
import { useCallback } from 'react'
import Card from '../../../ui/card/Card'
import CardHeader from '../../../ui/card/CardHeader'
import { Page } from '../../../DataStructures/ui_builder_interfaces'
import PageInfoForm, { PageDataForm } from './PageInfoForm'

interface Properties {
  page: Page
}

const EditPage = ({ page }: Properties) => {
  const onSubmit = useCallback(
    (form: PageDataForm) => {
      router.post(`/page-builder`, {
        ...form,
        id: page.id,
      })
    },
    [page]
  )

  return (
    <Card>
      <CardHeader
        title='Edit Title & Description'
        back='/page-builder'
      />
      <div className='flex w-full md:w-1/2'>
        <PageInfoForm
          page={page}
          onSubmit={onSubmit}
        />
      </div>
    </Card>
  )
}

export default EditPage
