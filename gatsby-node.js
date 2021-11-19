/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");
exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;
  const result = await graphql(`
query {
  allMarkdownRemark(sort: {fields: frontmatter___order, order: ASC}) {
    nodes {
      frontmatter {
        slug
        title
        menu
      }
      fileAbsolutePath
      id
    }
  }
}
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // Create blog post pages.
  result.data.allMarkdownRemark.nodes.forEach(({ fileAbsolutePath, id, frontmatter }, index) => {
    let slug = frontmatter.slug || fileAbsolutePath.replace(/.*\/([0-9A-Za-z\-]+)\/[^\/]*$/, '/$1') || `/${id}`
    console.log({ slug, fileAbsolutePath, id, frontmatter})
    createPage({
      // You can prepend it with any prefix you want
      path: `${slug}`,
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/page-layout.js`),
      // You can use the values in this context in
      // our page layout component
      context: { id: id, menu: frontmatter.menu, title: frontmatter.title, order: index+10 },
    });
  });
};


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@typeform/,
            use: loaders.null(),
          },
        ],
      }
    });
  }
}