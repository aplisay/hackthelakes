import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import '../assets/scss/main.scss';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, ...props }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
        allSitePage{
           nodes {
             path
             component
             pageContext
          }
       }
     }
     `}
    render={data => (
      <React.Fragment>
        <div className={props.location === '/' ? 'landing' : ''}>
          <div id="page-wrapper">
            <Header
              menuLinks={data.allSitePage.nodes
                .filter(node => node.pageContext.menu)
                .sort((a, b) => (a.pageContext?.order || 0) - (b.pageContext?.order || 0))
                .map(node => ({ name: (node.pageContext.title || node.path), link: node.path }))}
              siteTitle={data.site.siteMetadata.title}
              landing={props.location === '/'}
            />
            {children}
            <Footer />
          </div>
        </div>

      </React.Fragment>
    )}
  />
);

export default Layout;
