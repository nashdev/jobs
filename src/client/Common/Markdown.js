import React from "react";
import MarkdownRenderer from "react-markdown-renderer";
import s from "./Markdown.css";

const markdownOptions = {
  linkify: true,
};

const MarkdownViewer = ({ markdown, options }) => (
  <div className={s.content}>
    <MarkdownRenderer
      markdown={markdown}
      options={{ ...markdownOptions, ...options }}
    />
  </div>
);

export default MarkdownViewer;
