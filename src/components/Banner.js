import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import BackgroundImage from 'gatsby-background-image';

const Banner = props => {
  const imageData = getImage(props.bannerImage);
  const bgImage = convertToBgImage(imageData);

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
          <h2>{props.title}</h2>
          <p>
            {props.titleDescription}
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


export default Banner;
