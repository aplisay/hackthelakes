import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Banner from '../components/Banner';
import Pages from '../components/Pages';
import Five from '../components/Five';

class Home extends React.Component {
  render() {

    return (
      <Layout location="/" nodes={this.props.data.allMarkdownRemark.nodes}>
        <Banner key="banner" />
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
