import React from 'react';
import Fade from 'react-reveal/Fade';
import Typeform from './Typeform.js';

const Interact = props => (
  <section id={props.id || 'interact'} className="wrapper style2 special fade inactive">
    <Fade duration={2500}>
      <div className="container">
        <div className="row">
          <div className="col-5 col-12-medium">
            <header>
              <h2>Get involved</h2>
              <p>
                Join us in the Hack the Lakes Matrix room to help develop this idea.
              </p>
            </header>
            <ul className="actions fit">
              <li>
                <a href="https://matrix.to/#/#general:hackthelakes.uk" target="_blank" rel="noreferrer" className="button primary fit large">
                  #general:hackthelakes.uk
              </a>
              </li>
            </ul>
          </div>
          <div className="col-2 col-12-medium"><h2>or</h2></div>
          <div className="col-5 col-12-medium">
            <header>
              <h2>Register an Interest</h2>
              <p>Fill in this Contact form if you would like to contact us directly.</p>
            </header>

          <ul className="actions fit">
            <li>
                <a href="https://forms.gle/VeBGCn2raRLpeAQW9" target="_blank" rel="noreferrer" className="button secondary fit">
                Contact Form
              </a>
            </li>
          </ul>

        </div>
      </div>
      </div>
    </Fade>
  </section >
);
export default Interact;
