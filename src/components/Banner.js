import React from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { graphql, useStaticQuery } from 'gatsby'

import { getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from 'gatsby-background-image'

const Banner = props => {

  const data = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "banner.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              width: 2000
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    `
  );
  const imageData = getImage(data.desktop);
  const bgImage = convertToBgImage(imageData)


  return (
    <BackgroundImage
      className=""
        Tag="section"
      id="banner"
        alt="banner image"
        {...bgImage}
        preserveStackingContext
    >
      <div className="content">
        <header>
          <h2>Hack the Lakes</h2>
          <p>
            Multi week, sustainable, rural hack camp.
        </p>
      </header>
      </div>

            
      <ScrollLink
        to={props.nextSection}
        className="goto-next"
        activeClass="active"
        smooth={true}
        offset={0}
        duration={1500}
        spy={true}
      >
      Next
    </ScrollLink>
      </BackgroundImage >
  );
};


export default Banner
