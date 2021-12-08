module.exports = {
  //pathPrefix: `/mygatsby`,
  siteMetadata: {
    title: 'Hack the lakes',
    author: 'rjp44',
    description: 'hackthelakes site',
   
  },
  plugins: [
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
    'gatsby-plugin-sass',
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
