import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Gallery from "@browniebroke/gatsby-image-gallery";

const ImageGallery = (props) => {
  const {
    allContentfulAsset: { nodes },
  } = useStaticQuery(graphql`
    query ImageQuery {
      allContentfulAsset {
        nodes {
          id
          title
          thumb: gatsbyImageData(width: 270, placeholder: BLURRED)
          full: gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `);
    return <Gallery images={nodes} />
      

};

export default ImageGallery;
