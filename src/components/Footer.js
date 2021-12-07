import React from 'react'

const Footer = props => (
  <footer id="footer">
    <ul className="icons">

      <li>
        <a href="https://github.com/aplisay/hackthelakes" className="icon brands alt fa-github">
          <span className="label">GitHub</span>
        </a>
      </li>
      <li>
        <a href="mailto:hello@hackthelakes.uk" className="icon solid alt fa-envelope">
          <span className="label">Email</span>
        </a>
      </li>
    </ul>
    <ul className="copyright">
      <li>&copy; Hack the Lakes. Website and domain operated by <a href="https://aplisay.com/">Aplisay Ltd</a> (Registered in England No: 12018215) on behalf of the Hack the Lakes Project. <a href="/privacy">Legal notice including privacy policy</a></li>
    </ul>
  </footer>
)

export default Footer
