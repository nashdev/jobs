import React from "react";
import Helmet from "react-helmet";

const HTML = ({
  children,
  css = [],
  scripts = [],
  apolloState = {},
  state = {},
}) => {
  const head = Helmet.renderStatic();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="Nashdev Jobs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="_X-CaJkIX0xzenu0IIHZlaCs1uJ6RhJCk-MuPGNE6ag"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css"
        />
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"
        />

        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {css.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              apolloState
            ).replace(/</g, "\\u003c")};`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.INITIAL_STATE=${JSON.stringify(state).replace(
              /</g,
              "\\u003c"
            )};`,
          }}
        />
        {scripts.map((src) => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  );
};

export default HTML;
