import * as React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Fade from 'react-reveal/Fade';

const Columns = props => {

  let children = props.children;

  let sections = children.split('<hr>');
  return (
    <>
      {sections.map((section, index) => (
        <div className="col-4 col-12-medium" dangerouslySetInnerHTML={{ __html: section }} key={`Column${index}`}/>
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
        <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
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
  let displayNodes = nodes
    .filter(node => node.frontmatter.order >= 0);
  return displayNodes
    .map((node, index) => (
      {
        ...node,
        nextSection: (displayNodes[index + 1] && displayNodes[index + 1].id) || 'last-section'
      }
    ))
    .map((node) => {
      let { style, title, teaser, featuredImage, featuredImageAlt, slug } = node.frontmatter;
      let direction = (style % 2) ? 'left' : 'right';
      let img = getImage(featuredImage);
      slug = slug || node.fileAbsolutePath.replace(/.*\/([0-9A-Za-z-]+)\/[^/]*$/, '/$1') || `/${node.id}`;

      if (style === 1)
        return (<Style1 key={node.id} {...{ node, style, title, teaser, featuredImage, featuredImageAlt, direction, img, slug }} />);
      else
        return (<StyleN key={node.id} {...{ node, style, title, teaser, featuredImage, featuredImageAlt, direction, img, slug }} />);

    });
};


const Pages = ({ nodes }) => (
  <>
    {processNodes(nodes)}
  </>
)

export default Pages;