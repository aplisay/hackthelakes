import * as React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Fade from 'react-reveal/Fade';
import Excerpt from './Excerpt.js';
import Gallery from "@browniebroke/gatsby-image-gallery";

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


const Style1 = ({ node, style, title, teaser, direction, gallery, slug }) => (
  <section id={node.id} key={node.id} className={`wrapper style${style} bottom inactive`} >

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
                {gallery && node.html}
              </div>
              {gallery && <div className="col-8 col-12-medium"><Gallery images={gallery} /></div>}
              {!gallery && <Columns>{node.html}</Columns>}
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
      

    </Fade>
  </section>
);

const StyleN = ({ node, style, direction, title, teaser, img, gallery, featuredImageAlt, slug }) => (
  <section
    id={node.id}
    key={node.id}
    className={`spotlight style${style} ${direction} inactive`}
    style={{ backgroundImage: `url(${img.images.fallback.src})` }}>
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
              More About {title}
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
      let { title, teaser, featuredImage, featuredImageAlt, slug, bodyTitle, bodyTeaser, gallery } = node;
      let style = (slug === '/' || (gallery && !featuredImage)) ? 1 : (index % 2) + 2;
      slug = slug.replace(/^\/*/, '/');
      let direction = (style % 2) ? 'left' : 'right';
      let img = getImage(featuredImage);
      node.html = renderRichText(node.body);

      if (style === 1)
        return (<Style1 key={node.id} {...{ node, style, title: bodyTitle || title, teaser: bodyTeaser || teaser, featuredImage, featuredImageAlt, direction, img, slug, gallery }} />);
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