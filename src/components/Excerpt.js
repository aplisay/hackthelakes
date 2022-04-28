import React from 'react'
import * as ReactDOMServer from 'react-dom/server';
import * as excerptHtml from 'excerpt-html';


const options = {
  moreRegExp: /<!-- end excerpt -->/i,  // Search for the slug
  stripTags: false, // Set to false to get html code
  pruneLength: 500, // Amount of characters that the excerpt should contain
  pruneSeparator: ' ', // Separator to be used to separate words
};


const Excerpt = props => {
    let markup = ReactDOMServer.renderToStaticMarkup(props.children);
    let html = excerptHtml(markup, options);


    console.log('Excerpt', html)
  
    return <div dangerouslySetInnerHTML={{ __html: html }} />;

};


export default Excerpt
