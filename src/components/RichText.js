import * as React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const renderOptions = {
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

const RichText = ({ content }) => renderRichText(content, renderOptions);


export default RichText;