module.exports = {
  //pathPrefix: `/mygatsby`,
  siteMetadata: {
    title: 'Hack the lakes',
    author: 'rjp44',
    description: 'hackthelakes site',
    menuLinks: [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'Layouts',
        link: '#',
        items: [
          {
            name: 'Left Sidebar',
            link: '/',
          },
          {
            name: 'Right Sidebar',
            link: '/',
          },
          {
            name: 'No Sidebar',
            link: '/',
          },
          {
            name: 'SubMenu',
            link: '#',
            items: [
              {
                name: 'Option 1',
                link: '#',
              },
              {
                name: 'Option 2',
                link: '#',
              },
              {
                name: 'Option 3',
                link: '#',
              },
              {
                name: 'Option 4',
                link: '#',
              },
            ],
          },
        ],
      },
      {
        name: 'Elements',
        link: '/',
      },
      {
        name: 'Sign Up',
        link: '#',
        cl: 'button primary',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
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
        path: `${__dirname}/src/images/`,
        name: 'images',
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/pages`
      }
    },
    `gatsby-remark-images`,
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
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: false,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          `gatsby-remark-images`
        ],
      },
    },
  ],
};
