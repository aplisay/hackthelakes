import * as React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Fade from 'react-reveal/Fade';
import Excerpt from './Excerpt.js';

const Columns = props => {



  let { children } = props;

  let sections = children.reduce((o, c) => {
    if (c.type === 'hr')
      o.push([]);
    else
      o[o.length - 1].push(c);
    return o;
  }, [[]]);

  return (
    <>
      {sections.map((section, index) => (
        <div className="col-4 col-12-medium" key={`Column${index}`}>{section}</div>
      ))}
    </>
  );

};


const Style1 = ({ node, style, title, teaser, direction, slug }) => (
  <section id={node.id} key={node.id} className={`style${style} bottom inactive`} >

    <span className="image fit main">

    </span>
    <Fade bottom big>
      <div>
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
        <ScrollLink
          to={node.nextSection}
          className="goto-next"
          activeClass="active"
          smooth={true}
          offset={50}
          duration={1500}
          spy={true}
        >
          Next
        </ScrollLink>
      </div>

    </Fade>
  </section>
);

const StyleN = ({ node, style, direction, title, teaser, img, featuredImageAlt, slug }) => (
  <section
    id={node.id}
    key={node.id}
    className={`spotlight style${style} ${direction} inactive`}
    style={{ backgroundImage: `url(${img.images.fallback.src})` }}>
    <span className="image fit main">
      <GatsbyImage
        image={img}
        alt={featuredImageAlt || title}
      />
    </span>
    <Fade right big>
      <div className="content">
        <header>
          <h2>{title}</h2>
          <p>{teaser}</p>
        </header>
        <Excerpt>{node.html}</Excerpt>
        <ul className="actions">
          <li>
            <a href={slug} className="button" alt="featuredImageAlt">
              Learn More
            </a>
          </li>
        </ul>
      </div>
    </Fade>
    <ScrollLink
      to={node.nextSection}
      className="goto-next"
      activeClass="active"
      smooth={true}
      offset={25}
      duration={1500}
      spy={true}
    >
      Next
    </ScrollLink>
  </section >
);


const processNodes = nodes => {
  let displayNodes = nodes;
  return displayNodes
    .map((node, index) => (
      {
        ...node,
        nextSection: (displayNodes[index + 1] && displayNodes[index + 1].id) || 'last-section'
      }
    ))
    .map((node, index) => {
      let { title, teaser, featuredImage, featuredImageAlt, slug, bodyTitle, bodyTeaser } = node;
      let style = (slug === '/') ? 1 : (index % 2) + 2;
      let direction = (style % 2) ? 'left' : 'right';
      let img = getImage(featuredImage);
      node.html = renderRichText(node.body);

      if (style === 1)
        return (<Style1 key={node.id} {...{ node, style, title: bodyTitle, teaser: bodyTeaser, featuredImage, featuredImageAlt, direction, img, slug }} />);
      else
        return (<StyleN key={node.id} {...{ node, style, title, teaser, featuredImage, featuredImageAlt, direction, img, slug }} />);

    });
};


const Pages = ({ nodes }) => (
  <>
    {processNodes(nodes)}
  </>
);

export default Pages;