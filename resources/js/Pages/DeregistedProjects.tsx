import React, { useEffect, useState } from 'react'
import AppLayout from '../Components/Layout/AppLayout/AppLayout'
import Body from '../Components/DeregisteredProjects/Body'
import Table from '../Components/DeregisteredProjects/Table/Table'
import AppLayoutPadding from '../Components/Layout/AppLayout/AppLayoutPadding'

export default function DeregisteredProjects() {
  return (
    <AppLayout>
      <AppLayoutPadding>
        <main className='flex w-full flex-col'>
          <Body />
          <Table />
        </main>
      </AppLayoutPadding>
    </AppLayout>
  )
}
