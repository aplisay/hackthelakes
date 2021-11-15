import * as React from 'react';
import { graphql } from 'gatsby';
import { Link as ScrollLink } from 'react-scroll';
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Fade from 'react-reveal/Fade';

const Columns = props => {

  let children = props.children;
  console.log({ children });

  let sections = children.reduce((o, e) => {
    console.log('O', o.length)
    if (e.type === 'hr')
      o.push([]);
    else
      o[o.length - 1].push(e);
    return (o);
  }, [[]]);
  console.log('secions', { sections, children });
  return sections.length === 1 ? sections :
    sections.map(section => (<div className="col-4 col-12-medium">
      section
    </div>));

};


const Pages = ({ nodes }) => {
  return (
    <>
      {
        nodes.map(node => (
          <section key={node.id} className={`style${node} bottom inactive`} >
            <Fade bottom big>
              <div className="content">
                <div className="container">
                  <div className="row">
                    <div className="col-4 col-12-medium">
                      <header>
                        <h2>{node.frontmatter.title}</h2>
                        <p>
                          {node.frontmatter.teaser}
                        </p>
                      </header>
                    </div>

   
                      <MDXProvider>
                       <MDXRenderer>
                        {node.body}
                        </MDXRenderer>
                      </MDXProvider>
    

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
          </section>
        ))
      }
    </>
  );
};

export default Pages;