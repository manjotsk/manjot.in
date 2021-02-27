import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import Profile from "../components/Profile"

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Manjot Singh says Hi!</title>
        <meta name="title" content="Manjot Singh says Hi!" />
        <meta
          name="description"
          content="Software/IT needs? Hire Me! I blend experience, imagination and code to solve real world problems."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manjot.in/" />
        <meta property="og:title" content="Manjot Singh says Hi!" />
        <meta
          property="og:description"
          content="Software/IT needs? Hire Me! I blend experience, imagination and code to solve real world problems."
        />
        <meta property="og:image" content="/home-bg.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://manjot.in/" />
        <meta property="twitter:title" content="Manjot Singh says Hi!" />
        <meta
          property="twitter:description"
          content="Software/IT needs? Hire Me! I blend experience, imagination and code to solve real world problems."
        />
        <meta property="twitter:image" content="/home-bg.jpg" />
      </Helmet>
      <Profile />
    </Layout>
  )
}
