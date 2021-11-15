import * as React from 'react';
import { graphql } from 'gatsby';
import { Link as ScrollLink } from 'react-scroll';
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Fade from 'react-reveal/Fade'
const Pages = ({ nodes }) => {
  return (
    <section
      id="one"
      className="style1 bottom inactive"
    >
      <Fade bottom big>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-4 col-12-medium">
                <header>
                  <h2>Pages</h2>
                  {
                    nodes.map(node => (
                      <>
                      <h2 key={node.frontmatter.title}>
                        {node.frontmatter.title}
                        </h2>
                        <MDXRenderer>
                          {node.body}
                        </MDXRenderer>
                      </>
                    ))
                  }
                </header>
              </div>

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

  );
};

export default Pages;