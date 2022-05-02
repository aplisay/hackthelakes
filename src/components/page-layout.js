import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import Interact from "../components/Interact";
import { graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import Gallery from "@browniebroke/gatsby-image-gallery";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const Page = props => {

  let {
    data: {
      contentfulPage: { title, teaser, body, featuredImage, gallery, updatedAt },
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
              <a href="/" className="image fit">
                {featuredImage && <GatsbyImage
                  image={getImage(featuredImage)}
                  alt={featuredImage.title}
                />}
              </a>
            <div>{renderRichText(body)}</div>
            {gallery && <div><Gallery images={gallery} /></div>}
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
      gallery {
        thumb: gatsbyImageData(
              width: 270

              placeholder: BLURRED
              layout: FIXED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;

export default Page;
