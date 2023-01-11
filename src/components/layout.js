import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import "../assets/scss/main.scss";
import Header from "./Header";
import Footer from "./Footer";
import Analytics from "./Analytics";

const Layout = ({ children, ...props }) => (
  <StaticQuery
    query={graphql`
      query SiteMenu {
        allContentfulMainMenu {
          nodes {
            contactLinkName
            references {
              ... on ContentfulPage {
                id
                title
                slug
              }
            }
          }
        }
        allContentfulSiteInformation {
          nodes {
            siteTitle
            id
            footerText {
              raw
            }
            links
          }
        }
      }
    `}
    render={(data) => {
      let menu = data?.allContentfulMainMenu?.nodes[0]?.references?.map(
        ({ title, slug }) => ({ name: title, link: slug && slug.replace(/^\/*/, "/") })
      );
      let {
        siteTitle: title,
        footerText,
        ...social
      } = data?.allContentfulSiteInformation?.nodes[0];
      let contactLink = data?.allContentfulMainMenu?.nodes[0]?.contactLinkName;
      return (
        <React.Fragment>
          <Analytics />
          <div className={props.location === "/" ? "landing" : ""}>
            <div id="page-wrapper">
              <Header
                menuLinks={menu}
                contact={contactLink}
                siteTitle={title}
                landing={props.location === "/"}
              />
              {children}
              <Footer {...social}>{renderRichText(footerText)}</Footer>
            </div>
          </div>
        </React.Fragment>
      );
    }}
  />
);

export default Layout;
