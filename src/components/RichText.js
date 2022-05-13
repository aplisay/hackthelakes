import * as React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

const renderOptions = {
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, `${textSegment} `];
    }, []);
  },
};

export const RichText = ({ content }) => (
  renderRichText(content, renderOptions)
);

export const plainText = ({ content }) => documentToPlainTextString(content);
export default RichText;