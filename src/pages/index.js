import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/Banner'
import One from '../components/One'
import Transport from '../components/Transport'
import Facilities from '../components/Facilities'
import Balance from '../components/Balance'
import Four from '../components/Four'
import Five from '../components/Five'

class Home extends React.Component {
  render() {
    return (
      <Layout location="/">
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title="Gatsby Starter - Landed"
          meta={[
            { name: 'description', content: 'Landed Gatsby Starter' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        ></Helmet>
        <Banner />
        <One />
        <Balance />
        <Facilities />
        <Transport />
        <Four />
        <Five />
        
      </Layout>
    )
  }
}

export default Home
