import React from "react";
import ReactDOM from "react-dom/server";
import PrettyError from "pretty-error";

import ErrorPage from "../../client/Error/Pages/Error";
import Html from "../components/HTML";

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage("express");

export default (err, req, res, next) => {
  console.error(pe.render(err));

  const html = ReactDOM.renderToStaticMarkup(
    <Html title="Internal Server Error" description={err.message}>
      {ReactDOM.renderToString(<ErrorPage error={err} />)}
    </Html>
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
};
