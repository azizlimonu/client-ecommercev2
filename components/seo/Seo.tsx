import Head from 'next/head'
import React from 'react'

const Seo = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <Head>
      <title>
        {pageTitle && `${pageTitle} - E-commerce Shops`}
      </title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content="Generated by create next app" />
      <meta name="robots" content="noindex, follow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
  )
}

export default Seo