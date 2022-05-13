import React, {Children} from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as excerpt from 'excerpts';


const options = {
  words: 40,
  moreRegExp: /<!-- end excerpt -->/i,  // Search for the slug
  stripTags: false, // Set to false to get html code
  pruneLength: 1600, // Amount of characters that the excerpt should contain
  pruneString: '…',
  pruneSeparator: ' ', // Separator to be used to separate words
};


const Excerpt = props => {
    let markup = ReactDOMServer.renderToStaticMarkup(props.children);
  let html = excerpt(markup, options);
  
  console.log('Children', { children: Children.toArray(props.children) });
  
    return <div dangerouslySetInnerHTML={{ __html: html }} />;

};


export default Excerpt
