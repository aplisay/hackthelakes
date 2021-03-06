import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Banner from '../components/Banner';
import Pages from '../components/Pages';
import Interact from '../components/Interact';

class Home extends React.Component {
  render() {

    let firstNode = this.props.data.allMarkdownRemark.nodes.filter(({ frontmatter: { order } }) => order >= 0).shift()

    return (
      <Layout location="/" nodes={this.props.data.allMarkdownRemark.nodes}>
        <Banner key="banner" nextSection={firstNode.id}/>
        <Pages nodes={this.props.data.allMarkdownRemark.nodes} />
        <Interact id="last-section"/>
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
