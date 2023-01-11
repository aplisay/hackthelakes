import React from 'react';
import Fade from 'react-reveal/Fade';
import { useStaticQuery, graphql } from 'gatsby';
import { renderRichText } from "gatsby-source-contentful/rich-text";

const Interact = props => {
  const {
    allContentfulContactForm: { nodes }
  } = useStaticQuery(graphql`
    query ContactQuery {
  allContentfulContactForm(sort: {format: ASC}) {
    nodes {
      id
      heading
      description {
        raw
      }
      link
      linkText
      format
    }
  }
}`);
  return (
    <>
      {nodes.length && <section id={props.id || 'interact'} className="wrapper style2 special fade inactive">
        <Fade duration={2500}>
          <div className="container">
            <div className="row">
              {nodes.map(form => (
                <div className="col-6 col-12-medium container " key={`contact-${form.link}`}>
                  <div className="col-4 col-12-medium container">
                    <header>
                      <h2>{form.heading}</h2>
                        {form.description && renderRichText(form.description)}
                    </header>
                    <ul className="actions fit">
                      <li>
                        <a href={form.link} target="_blank" rel="noreferrer" className={`button fit ${form.format === 'primary' ? 'primary large' : 'secondary'}`}>
                          {form.linkText}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </section >
      }
    </>
  );
};


export default Interact;
