import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

const isClient = typeof window !== "undefined";

const Analytics = (props) => {
  const {
    contentfulSiteInformation: { googleAnalyticsTag },
  } = useStaticQuery(graphql`
    query GTagQuery {
      contentfulSiteInformation {
        googleAnalyticsTag
      }
    }
  `);
  return (
    googleAnalyticsTag && (
      <Helmet>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTag}`}
        ></script>
        <script type="text/javascript">{
          `
          if(!window.dataLayer){
            window.dataLayer = [];
          }
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());

          gtag('config', '${googleAnalyticsTag}');
          `}</script>
      </Helmet>
    )
  );
};

export default Analytics;
