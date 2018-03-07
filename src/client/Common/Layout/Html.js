import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired,
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    content: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const { title, description, styles, scripts, content, state } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"
          />
          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="apple-touch-icon" href="/icon.png" />
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${serialize(state)}`,
            }}
          />
          {scripts.map(script => <script key={script} src={script} />)}

          <script
            dangerouslySetInnerHTML={{
              __html:
                'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                `ga('create','UA-103830543-1','auto');ga('send','pageview')`,
            }}
          />

          <script
            src="https://www.google-analytics.com/analytics.js"
            async
            defer
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serialize({
                '@context': 'http://schema.org',
                '@type': 'WebSite',
                name: 'NashDev Jobs',
                alternateName: 'NashDev Jobs',
                url: 'https://jobs.nashdev.com',
              }),
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serialize({
                '@context': 'http://schema.org',
                '@type': 'Organization',
                url: 'https://nashdev.com',
                logo:
                  'https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2015-05-11/4857250251_5df1f743a374d9e66aeb_132.jpg',
              }),
            }}
          />
        </body>
      </html>
    );
  }
}

export default Html;
