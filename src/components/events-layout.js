import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import Interact from "../components/Interact";
import { graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import Gallery from "@browniebroke/gatsby-image-gallery";
import { RichText, plainText } from "./RichText";
import Map from "./GoogleMap";


const Page = props => {

  let {
    data: {
      contentfulEventPage: { title, teaser, body, featuredImage, omitFeatureImage, gallery},
    },
  } = props;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={plainText({ content: teaser})} />
      </Helmet>

      <div id="main" className="wrapper style1">
        <div className="container">
          <header className="major">
            <h2>{title}</h2>
          </header>

          <section id="content">
              <a href="/" className="image fit">
              {featuredImage && !omitFeatureImage && <GatsbyImage
                  image={getImage(featuredImage)}
                  alt={featuredImage.title || 'featuredImage'}
                />}
            </a>
            {gallery && <div><Gallery images={gallery} /></div>}
          </section>
        </div>
      </div>
      <Interact id="last-section" />
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogEventQuery($slug: String) {
    contentfulEventPage(slug: { eq: $slug }) {
      id
      body {
        raw

      }
      
      teaser {
        raw
      }
      title
      updatedAt
      featuredImage {
        gatsbyImageData
      }
      omitFeatureImage

    }
  }
`;

export default Page;
