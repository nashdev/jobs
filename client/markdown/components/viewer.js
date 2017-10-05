import React from "react";
import MarkdownRenderer from "react-markdown-renderer";

const markdownOptions = {
  linkify: true
};

const MarkdownViewer = ({ markdown, options }) =>
  (<MarkdownRenderer
    markdown={markdown}
    options={{ ...markdownOptions, ...options }}
  />);

export default MarkdownViewer;
