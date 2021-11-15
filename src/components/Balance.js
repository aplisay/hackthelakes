import React from 'react'
import pano from '../assets/images/pic01.jpg'
import { Link as ScrollLink } from 'react-scroll'
import Fade from 'react-reveal/Fade'

const Three = props => (
  <section
    id="three"
    className="spotlight style2 right inactive"
    style={{ backgroundImage: `url(${pano})` }}
  >
    <span className="image fit main bottom">
      <img src={pano} alt="" />
    </span>
    <Fade left big>
      <div className="content">
        <header>
          <h2>Balance</h2>
          <p>Inspired comes first, software development second</p>
        </header>
        <p>
          Traditional tech hackathons are typically 2-3 days and based on focussed "macho" short cycle prototype development.
        </p>
        <p>
          Our vision for HTL is so much more than this. We want to create relaxing and recharging environment for all participants.
          We will create a rich programme of optional visits to derive inspiration from the rich surrounding area. We want to make the whole event enjoyable for technologists, and anyone they choose to accompany them. 
          Families will be welcome, and participation in creating stuff optional.
        </p>
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
      to="four"
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

export default Three
