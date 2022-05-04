/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");

const DEBUG_webpack = false;

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allContentfulPage {
        nodes {
          slug
          title
          id
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
    return;
  }
  // Create blog post pages.
  result.data.allContentfulPage.nodes.forEach(({ slug, title, id }, index) => {
    let slugPath = slug.replace(/^\/*/, "/");
    createPage({
      slug,
      // You can prepend it with any prefix you want
      path: slugPath,
      // This component will wrap our MDX content
      component: path.resolve(`src/components/page-layout.js`),
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
