import * as React from 'react';
import { graphql } from 'gatsby';
import { Link as ScrollLink } from 'react-scroll';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Fade from 'react-reveal/Fade';

const Columns = props => {

  let children = props.children;
  console.log({ children });

  let sections = children.split('<hr>');
  console.log('sections', { sections, children });
  return (
    <>
      {sections.map(section => (
        <div className="col-4 col-12-medium" dangerouslySetInnerHTML={{ __html: section }}></div>
      ))}
    </>
  );

};


const Pages = ({ nodes }) =>
  nodes.map(node => {
    let { style, title, teaser, featuredImage, featuredImageAlt } = node.frontmatter;
    let direction = (style % 2) ? 'left' : 'right';
    let img = getImage(featuredImage);
    console.log({ style, title, teaser, featuredImage, featuredImageAlt, direction, img});
    switch (style) {
      case 1:
        return (
          <section key={node.id} className={`style${style} bottom inactive`} >
            <Fade bottom big>
              <div className="content">
                <div className="container">
                  <div className="row">
                    <div className="col-4 col-12-medium">
                      <header>
                        <h2>{title}</h2>
                        <p>
                          {teaser}
                        </p>
                      </header>
                    </div>
                    <Columns>{node.html}</Columns>
                  </div>
                </div>
              </div>
            </Fade>
            <ScrollLink
              to="two"
              className="goto-next"
              activeClass="active"
              smooth={true}
              offset={50}
              duration={1500}
              spy={true}
            >
              Next
            </ScrollLink>
          </section>);
      default:
        return (
          <section
            key={node.id}
            className={`spotlight style${style} ${direction} inactive`}
            style={{ backgroundImage: `url(${img.images.fallback.src})` }}>
            <span className="image fit main">
              <GatsbyImage
                image={img}
                alt={featuredImageAlt}
              />
            </span>
            <Fade right big>
              <div className="content">
                <header>
                  <h2>{title}</h2>
                  <p>{teaser}</p>
                </header>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                <ul className="actions">
                  <li>
                    <a href="/" className="button">
                      Learn More
            </a>
                  </li>
                </ul>
              </div>
            </Fade>
            <ScrollLink
              to="three"
              className="goto-next"
              activeClass="active"
              smooth={true}
              offset={50}
              duration={1500}
              spy={true}
            >
              Next
    </ScrollLink>
          </section>
        );

    }
  });

export default Pages;