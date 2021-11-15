import React from 'react'
import { Link as ScrollLink } from 'react-scroll'
import Fade from 'react-reveal/Fade'

const One = ({ data }) => (
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
                <h2>What?</h2>
                <p>
                 Multi-week drop in and out hack camp in the heart of a world heritage site.
                </p>
              </header>
            </div>
            <div className="col-4 col-12-medium">
              <p>
                The unique landscape of the Lake District has a history of inspiring great minds: William Wordsworth, John Ruskin, Arthur Ransome, Beatrix Potter J. M. W. Turner and dozens more.
                 </p><p>
                Scratch the surface of any part of this area and you find the birthplace of ideas that shaped our world.
              </p>
            </div>
            <div className="col-4 col-12-medium">
              <p>
                The event will give space and provide inspiration to explore technology that solves today's problems. We aim to put a mixture of technologists and problem owners in an area
                 in the heart of the Lake District for a few weeks over summer, spend time together to generate meaningful and sustainable prototype technology solutions.
              </p>
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
)
export default One
