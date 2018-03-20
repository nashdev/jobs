import Home from './Home/Routes';
import Auth from './Auth/Routes';
import People from './People/Routes';
import Jobs from './Jobs/Routes';
import Companies from './Companies/Routes';
import Search from './Search/Routes';
import Dashboard from './Dashboard/Routes';
import UIKit from './Common/UIKit/Routes';

const routes = [
  ...Home,
  ...Auth,
  ...People,
  ...Jobs,
  ...Companies,
  ...Search,
  ...Dashboard,
  ...UIKit,
];

export const routeNames = routes.map(x => x.path);

export default routes;
