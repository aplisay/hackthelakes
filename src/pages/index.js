import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Banner from "../components/Banner";
import Pages from "../components/Pages";
import Interact from "../components/Interact";
import ImageGallery from "../components/ImageGallery";

class Home extends React.Component {
  render() {
    let homepage = this.props.data.allContentfulHomepage.nodes[0];

    return (
      <Layout location="/">
        <Banner key="banner" nextSection={homepage.id} {...homepage} />
        <Pages nodes={[homepage, ...homepage.pages]} />
        <Interact id="last-section" />
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    allContentfulHomepage {
      nodes {
        id
        bannerImage {
          id
          gatsbyImageData(
            width: 2000
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
        body {
          raw
        }
        slug
        bodyTeaser
        bodyTitle
        title
        titleDescription
        pages {
          id
          slug
          title
          teaser
          featuredImage {
            gatsbyImageData
          }
          gallery {
            thumb: gatsbyImageData(
              width: 270
              height: 270
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
          body {
            raw
          }
        }
      }
    }
  }
`;

export default Home;
