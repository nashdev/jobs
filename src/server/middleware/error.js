import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import { ErrorPageWithoutStyle } from '../../client/Error/Pages/Error';
import errorPageStyle from '../../client/Error/Pages/Error.css';
import Html from '../../client/Common/Layout/Html';

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

export default (err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
};
