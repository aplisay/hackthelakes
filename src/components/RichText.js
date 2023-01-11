import * as React from "react";
import { renderRichText} from "gatsby-source-contentful/rich-text";
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'

const renderOptions = {
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, `${textSegment} `];
    }, []);
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data;
      return (
        <a href={uri} className="underline">
          {children}
        </a>
      );
    },
    [INLINES.ASSET_HYPERLINK]: (node, children) => {
      console.log('node', { node, children });
      let url = node?.data?.target?.file?.url;
    
      return url && <a href={url}>{children}</a>
    },

  },
};

export const RichText = ({ content }) => (
  renderRichText(content, renderOptions)
);

export const plainText = ({ content }) => documentToPlainTextString(content);
export default RichText;