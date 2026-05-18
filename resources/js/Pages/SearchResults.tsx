import React, { useEffect, useState } from 'react'
import AppLayout from '../Components/Layout/AppLayout/AppLayout'
import AppLayoutPadding from '../Components/Layout/AppLayout/AppLayoutPadding'
import Result from '../Components/SearchResults/Result'

export default function SearchResults() {
  return (
    <AppLayout>
      <AppLayoutPadding>
        <main className='flex w-full flex-col'></main>
      </AppLayoutPadding>
    </AppLayout>
  )
}
