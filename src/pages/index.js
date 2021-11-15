import React from 'react'
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/Banner'
import Pages from '../components/Pages'
import One from '../components/One'
import Transport from '../components/Transport'
import Facilities from '../components/Facilities'
import Balance from '../components/Balance'
import Four from '../components/Four'
import Five from '../components/Five'

class Home extends React.Component {
  render() {
    console.log({ props: this.props });
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
        <Pages nodes={this.props.data.allMdx.nodes} />
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
 
export const query = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          title
          teaser
          order
          style
        }
        body
      }
    }
  }
`;

export default Home;
