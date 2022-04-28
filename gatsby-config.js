console.log('ENV', process.env.NODE_ENV);

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ||
    process.env.CONTENTFUL_DELIVERY_TOKEN,
};

// If you want to use the preview API please define
// CONTENTFUL_HOST and CONTENTFUL_PREVIEW_ACCESS_TOKEN in your
// environment config.
//
// CONTENTFUL_HOST should map to `preview.contentful.com`
// CONTENTFUL_PREVIEW_ACCESS_TOKEN should map to your
// Content Preview API token
//
// For more information around the Preview API check out the documentation at
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
//
// To change back to the normal CDA, remove the CONTENTFUL_HOST variable from your environment.
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const { spaceId, accessToken } = contentfulConfig;

console.log({ contentfulConfig})

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
}
module.exports = {
  //pathPrefix: `/mygatsby`,
  siteMetadata: {
    title: 'Hack the lakes',
    author: 'rjp44',
    description: 'hackthelakes site',

  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'hackthelakes',
        short_name: 'hackthelakes',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/website-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images`,
        name: 'images',
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/pages`
      }
    },
    {
      resolve: `gatsby-remark-images`,
      options: {
        // It's important to specify the maxWidth (in pixels) of
        // the content container as this plugin uses this as the
        // base for generating different widths of each image.
        maxWidth: 3400,
        // Remove the default behavior of adding a link to each
        // image.
        linkImagesToOriginal: false,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: [`${__dirname}/src/scss`, `${__dirname}/src/scss/libs`],
        }
      }
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        headers: {
          "/.well-known/matrix/*": [
            "Access-Control-Allow-Origin: *",
          ],
        },
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: false,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        excerpt_separator: `<!-- end excerpt -->`,
        // Plugins configs
        plugins: [
          `gatsby-remark-images`
        ],
      },
    },
    

  ],
};
