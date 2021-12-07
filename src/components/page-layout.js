import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Interact from '../components/Interact';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const Page = ({ data: { markdownRemark: {frontmatter, html} } }) => (
  <Layout>
    <Helmet>
      <title>{frontmatter.title}</title>
      <meta name="description" content={frontmatter.teaser} />
    </Helmet>

    <div id="main" className="wrapper style1">
      <div className="container">
        <header className="major">
          <h2>{frontmatter.title}</h2>
          <p>
            {frontmatter.teaser}
          </p>
        </header>

        <section id="content">
          {
            false && (
              <a href="/" className="image fit">
                <GatsbyImage
                  image={frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                  alt={frontmatter.featuredImageAlt}
                />
              </a>
            )}
          <div dangerouslySetInnerHTML={{ __html: html }}/>
        </section>
      </div>
    </div>
    <Interact id="last-section"/>
  </Layout>
);

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        teaser
        title
        featuredImageAlt
        featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default Page;
