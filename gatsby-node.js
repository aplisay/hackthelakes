/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");

const DEBUG_webpack = false;


exports.createSchemaCustomization = ({ actions: { createTypes }, schema }) => {
  console.log('Schema', { schema });
  const interface = schema.buildInterfaceType({

  })
  const typeDefs = [
    `interface ContentfulPagelike implements Node {
      id: ID!
      title: String
      slug: String
    }
    type ContentfulPage implements ContentfulReference & ContentfulEntry & ContentfulPagelike & Node @derivedTypes
    type ContentfulEventPage implements ContentfulReference & ContentfulEntry & ContentfulPagelike & Node @derivedTypes
    `
  ];
  console.log({ typeDefs });
  createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      allContentfulPagelike: {
        type: ["ContentfulPagelike"],
        resolve: async (source, args, context, info) => {
          // Whenever possible, use `limit` and `skip` on findAll calls to increase performance
          const results = [
            context.nodeModel.findAll({ type: "ContentfulPage", query: { limit: args.limit, skip: args.skip } }),
            context.nodeModel.findAll({ type: "ContentfulEventPage", query: { limit: args.limit, skip: args.skip } })
          ]
          let entries = Array.from(await Promise.all(results)).reduce((o, e) => ([...o, ...(e.entries)]), []);
          console.log('results', Promise.all(results));
          return entries;
        },
      },
    }
  };
  createResolvers(resolvers);
}

const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = args => {

  const { actions, node: {file, sys} } = args;

  //console.log('create node', {file, sys});
  
};



exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allContentfulPagelike {
        nodes {
          slug
          title
          id
          internal {
            type
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
    return;
  }
  // Create blog post pages.
  result.data.allContentfulPagelike.nodes.forEach(({ slug, title, id, internal: { type } }, index) => {
    let slugPath = slug.replace(/^\/*/, "/");
    let layout = (type === 'ContentfulEventPage') ? 'events-layout' : 'page-layout'; 
    createPage({
      slug,
      // You can prepend it with any prefix you want
      path: slugPath,
      // This component will wrap our MDX content
      component: path.resolve(`src/components/${layout}.js`),
      // You can use the values in this context in
      // our page layout component
      context: { id, title, slug },
    });
  });
  return true;
};
// TODO: temporary workaround for https://github.com/gatsbyjs/gatsby/issues/31878
exports.onCreateWebpackConfig = ({ actions, plugins, stage, getConfig }) => {
  DEBUG_webpack &&
    console.info(
      `webpack: ${stage}: \n`,
      JSON.stringify(getConfig(), null, "  ")
    );
  // override config only during production JS & CSS build
  if (stage === "build-javascript") {
    // get current webpack config
    const config = getConfig();

    const options = {
      minimizerOptions: {
        preset: [
          `default`,
          {
            svgo: {
              full: true,
              plugins: [
                // potentially destructive plugins removed - see https://github.com/gatsbyjs/gatsby/issues/15629
                // use correct config format and remove plugins requiring specific params - see https://github.com/gatsbyjs/gatsby/issues/31619
                `removeUselessDefs`,
                `cleanupAttrs`,
                `cleanupEnableBackground`,
                `cleanupIDs`,
                `cleanupListOfValues`,
                `cleanupNumericValues`,
                `collapseGroups`,
                `convertColors`,
                `convertPathData`,
                `convertStyleToAttrs`,
                `convertTransform`,
                `inlineStyles`,
                `mergePaths`,
                `minifyStyles`,
                `moveElemsAttrsToGroup`,
                `moveGroupAttrsToElems`,
                `prefixIds`,
                `removeAttrs`,
                `removeComments`,
                `removeDesc`,
                `removeDimensions`,
                `removeDoctype`,
                `removeEditorsNSData`,
                `removeEmptyAttrs`,
                `removeEmptyContainers`,
                `removeEmptyText`,
                `removeHiddenElems`,
                `removeMetadata`,
                `removeNonInheritableGroupAttrs`,
                `removeOffCanvasPaths`,
                `removeRasterImages`,
                `removeScriptElement`,
                // This messes up some SVGs used from stylesheets in our template (eg arrow.svg)
                //  begs the question why we are doing *any* agressive SVGO, but this hack works for now
                // `removeStyleElement`,
                `removeTitle`,
                `removeUnknownsAndDefaults`,
                `removeUnusedNS`,
                `removeUselessStrokeAndFill`,
                `removeXMLProcInst`,
                `reusePaths`,
                `sortAttrs`,
              ],
            },
          },
        ],
      },
    };
    // find CSS minimizer
    const minifyCssIndex = config.optimization.minimizer.findIndex(
      (minimizer) => minimizer.constructor.name === "CssMinimizerPlugin"
    );
    // if found, overwrite existing CSS minimizer with the new one
    if (minifyCssIndex > -1) {
      config.optimization.minimizer[minifyCssIndex] =
        plugins.minifyCss(options);
    }
    // replace webpack config with the modified object
    actions.replaceWebpackConfig(config);
  }
};
