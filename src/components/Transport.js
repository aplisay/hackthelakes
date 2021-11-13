import React from 'react'
import oxenholme from '../assets/images/oxenholme.jpg'
import { Link as ScrollLink } from 'react-scroll'
import Fade from 'react-reveal/Fade'

const Two = props => (
  <section
    id="two"
    className="spotlight style2 right inactive"
    style={{ backgroundImage: `url(${oxenholme})` }}
  >
    <span className="image fit main">
      <img src={oxenholme} alt="" />
    </span>
    <Fade right big>
      <div className="content">
        <header>
          <h2>Location and Transport</h2>
          <p>Whilst we are in the heart of the beautiful Lake District, our location is highly accessible for responsible transport</p>
        </header>
        <p>
          Sustainability is a key theme for this project. The location is directly on one of the few local bus routes, and participants are encouraged to use public transport to arrive at HTL and get around the Lake District once here.
        </p>
        <p>
          It is possible to travel here by train from major cities via the electrified West Coast Main Line, changing at Oxenholme for a local service on the Windermere Branch line. A bus (infrequently) travels directly to site from the station.
          We are happy to work on other solutions like station pickup from Windermere or Oxenholme for participants who find the interchanges difficult or inconvenient.
        </p>
        <p>
          We also recognise that for many, arriving by car may be the only viable option because of the stuff they are bringing. 
          Parking and EV charging will therefore be available onsite, but we will encourage you to use other options for local transport whilst at HTL.
          We are investigating cycle hire provision, and there will be informal arrangements on offer during the pilot year. 
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
)

export default Two
