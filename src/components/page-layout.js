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
      contentfulPage: { title, teaser, body, featuredImage, gallery, location},
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
                {featuredImage && <GatsbyImage
                  image={getImage(featuredImage)}
                  alt={featuredImage.title || 'featuredImage'}
                />}
            </a>
            {location && 
              <>
              <div className="row">
                <div className="col-3 col-12-medium">
                  <span><RichText content={teaser} /></span>
                </div>
                <div className="col-9 col-12-medium">
                    <Map {...location} />
                </div>
              </div>
              <div><RichText content={body} /></div>
            </>}
            {!location && <RichText content={body} />}
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
      teaser {
        raw
      }
      title
      updatedAt
      featuredImage {
        gatsbyImageData
      }
      location {
        lat
        lon
      }
      gallery {
        thumb: gatsbyImageData(
              width: 270
              height: 270
              placeholder: BLURRED
              layout: FIXED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;

export default Page;
