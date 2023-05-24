import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Banner from "../components/Banner";
import Pages from "../components/Pages";
import Interact from "../components/Interact";

class Home extends React.Component {
  render() {
    let homepage = this.props.data.allContentfulHomepage.nodes[0];

    return (
      <Layout location="/">
        <Helmet>
          <title>{homepage.title}</title>
          <meta name="description" content={homepage.titleDescription + homepage.bodyTeaser} />
        </Helmet>
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
        gatsbyImageData(width: 2000, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
      body {
        raw
      }
      slug
      bodyTeaser {
        raw
      }
      bodyTitle
      title
      titleDescription
      pages {
        ... on ContentfulPage {
        id
        slug
        title
        teaser {
          raw
        }
        featuredImage {
          gatsbyImageData
        }
        gallery {
          thumb: gatsbyImageData(width: 270, height: 270, placeholder: BLURRED)
          full: gatsbyImageData(layout: FULL_WIDTH)
        }
        location {
          lat
          lon
        }
        body {
          raw
        }
      }
      ... on ContentfulEventPage {
        id
        slug
        title
        teaser {
          raw
        }
        featuredImage {
          gatsbyImageData
        }
        body {
          raw
        }
      }
      }
    }
  }

  }
`;

export default Home;
