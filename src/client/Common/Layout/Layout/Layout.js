import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Route, Switch } from 'react-router';

import normalizeCss from 'normalize.css';

import s from './Layout.scss';

import Header from '../Header';
import Footer from '../Footer';

import routes from '../../../routes';

const Layout = () => (
  <div>
    <Header />
    <main>
      <Switch>
        {routes.map(route => <Route key={route.name} {...route} />)}
      </Switch>
    </main>
    <Footer />
  </div>
);

export default withStyles(normalizeCss, s)(Layout);
