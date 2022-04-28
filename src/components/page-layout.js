import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import Interact from "../components/Interact";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const Page = props => {

  let {
    data: {
      contentfulPage: { title, teaser, body, featuredImage, updatedAt },
    },
  } = props;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={teaser} />
      </Helmet>

      <div id="main" className="wrapper style1">
        <div className="container">
          <header className="major">
            <h2>{title}</h2>
            <p>{teaser}</p>
          </header>

          <section id="content">
            {false && (
              <a href="/" className="image fit">
                <GatsbyImage
                  image={
                    featuredImage.gatsbyImageData
                  }
                  alt={featuredImage.title}
                />
              </a>
            )}
            <div>{renderRichText(body)}</div>
          </section>
        </div>
      </div>
      <Interact id="last-section" />
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostQuery($slug: String) {
    contentfulPage(slug: { eq: $slug }) {
      id
      body {
        raw
      }
      teaser
      title
      updatedAt
      featuredImage {
        gatsbyImageData
      }
    }
  }
`;

export default Page;
