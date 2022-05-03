import React from "react";

const linkTypes = [
  [/github.com/i, "GitHub", "icon brands alt fa-github"],
  [/facebook.com/i, "Facebook", "icon brands alt fa-facebook"],
  [/twitter.com/i, "Twitter", "icon brands alt fa-twitter"],
  [/linkedin.com/i, "LinkedIn", "icon brands alt fa-linkedin"],
  [
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.\-_]*$/i,
    "EMail",
    "icon solid alt fa-envelope",
  ],
  [
    /^mailto:[a-zA-Z0-9_.-]+@[a-zA-Z0-9.\-_]*/i,
    "EMail - preformat",
    "icon solid alt fa-envelope",
  ],
  [/.*/, "Link", "icon solid alt fa-link"],
];

const Footer = (props) => (
  <footer id="footer">
    <ul className="icons">
      {props.links.map((link, index) => {
        let { type, className } = linkTypes.reduce(
          (o, [regex, type, className]) =>
            o || (link.match(regex) && { type, className }),
          null
        );
        if (type === "EMail") {
          link = `mailto:${link}`;
        }
        return (
          <li key={`icon-${index}`}>
            <a
              href={link}
              className={className}
              target="_blank"
              rel="noreferrer"
              title={type}
            >
              <span className="label">{type}</span>
            </a>
          </li>
        );
      })}
    </ul>
    <ul className="copyright">
      <li>{props.children}</li>
    </ul>
  </footer>
);

export default Footer;
