import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import Banner from '../components/Banner';
import Pages from '../components/Pages';
import One from '../components/One';
import Transport from '../components/Transport';
import Facilities from '../components/Facilities';
import Balance from '../components/Balance';
import Four from '../components/Four';
import Five from '../components/Five';

class Home extends React.Component {
  render() {
    console.log({ props: this.props });
    return (
      <Layout location="/" nodes={this.props.data.allMarkdownRemark.nodes}>
        <Banner />
        <Pages nodes={this.props.data.allMarkdownRemark.nodes} />
        <Five />

      </Layout>
    );
  }

}

export const query = graphql`
  query {
  allMarkdownRemark(sort: {fields: frontmatter___order, order: ASC}) {
    nodes {
      frontmatter {
        title
        teaser
        order
        style
        slug
        menu
        featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      id
      html
      excerpt(pruneLength: 500, format: HTML)
      fileAbsolutePath
    }
  }
}

`;

export default Home;
