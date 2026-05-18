import React from 'react'
import { Head } from '@inertiajs/react'

export interface MetaTagsFields {
  title?: string
  description?: string
  image?: string
}

const MetaTags = ({
  title = 'KRERA: Kerala real Estate regulatory Authority',
  description = "Homepage of KRERA - The regulatory body tasked with ensuring greater compliance, responsibility and healthy competition in Kerala's real estate sector. ",
  image = 'https://rera.kerala.gov.in/logo.png',
}: MetaTagsFields) => {
  return (
    <Head title={title}>
      <meta
        name='twitter:card'
        content='summary_large_image'
      />
      <meta
        name='twitter:title'
        content={title}
      />
      <meta
        name='twitter:domain'
        content='https://rera.kerala.gov.in/'
      />
      <meta
        name='twitter:image:src'
        content={image}
      />
      <meta
        name='twitter:description'
        content={description}
      />
      <meta
        name='title'
        property='og:title'
        content={title}
      />
      <meta
        property='og:type'
        content='article'
      />
      <meta
        name='og:url'
        content='https://rera.kerala.gov.in/'
      />
      <meta
        name='image'
        property='og:image'
        content={image}
      />
      <meta
        name='description'
        property='og:description'
        content={description}
      />
      <meta
        name='author'
        content='KRERA: Kerala real Estate regulatory Authority'
      />
      <meta
        property='og:title'
        content={title}
      />
      <meta
        property='og:type'
        content='article'
      />
      <meta
        property='og:url'
        content='https://rera.kerala.gov.in/'
      />
      <meta
        property='og:image'
        content={image}
      />
      <meta
        property='og:description'
        content={description}
      />
    </Head>
  )
}

export default MetaTags
