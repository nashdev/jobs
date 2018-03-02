import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import { ErrorPageWithoutStyle } from '../../client/routes/error/ErrorPage';
import errorPageStyle from '../../client/routes/error/ErrorPage.css';
import Html from '../../client/components/Html';

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

export default (err, req, res) => {
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
  // res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
};
