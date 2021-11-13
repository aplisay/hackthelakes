import React from 'react'
import wifi from '../assets/images/wifi.jpg'
import { Link as ScrollLink } from 'react-scroll'
import Fade from 'react-reveal/Fade'

const Three = props => (
  <section
    id="three"
    className="spotlight style3 left inactive"
    style={{ backgroundImage: `url(${wifi})` }}
  >
    <span className="image fit main bottom">
      <img src={wifi} alt="" />
    </span>
    <Fade left big>
      <div className="content">
        <header>
          <h2>Facilities</h2>
          <p>Our aim is to provide rich facilities whilst making the event as accessible as possible to anyone who wants to contribute</p>
        </header>
        <p>
          We have use of a 10-acre site for up to 4 weeks, and this will be the HQ for the event. It has WiFi, electricity, water, toilets, and showers as well as a covered space to work together and create.
          Onsite accomodation will be based on bringing your own tent and camping on the site. We realise this won't suite everyone, and, if you wish to arrange your own holiday accomodation locally, it will still be possible to participate fully.
        </p>
        <p>
          For at least one of the weeks in 2023, "bunkhouse" shared accomodation may be made available within easy reach of the site.
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
