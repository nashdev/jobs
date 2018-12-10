import Auth from "../client/Auth/Routes";
import People from "../client/People/Routes";
import Jobs from "../client/Jobs/Routes";
import Companies from "../client/Companies/Routes";
import Search from "../client/Search/Routes";
import Dashboard from "../client/Dashboard/Routes";

const routes = [
  ...Auth,
  ...People,
  ...Jobs,
  ...Companies,
  ...Search,
  ...Dashboard,
];

export const routeNames = routes.map((x) => x.path);

export default routes;
