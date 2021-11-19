import React from 'react'
import Fade from 'react-reveal/Fade'
import Typeform from './Typeform.js'

const Five = props => (
  <section id="five" className="wrapper style2 special fade inactive">
    <Fade duration={2500}>
      <div className="container">
        <header>
          <p>Register an interest in Hack the Lakes to get involved, give feedback, or be kept in touch with the project.</p>
        </header>
        <Typeform />
      </div>
    </Fade>
  </section>
)
export default Five
