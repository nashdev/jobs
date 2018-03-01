import Home from './home/Home';
import SlackLogin from './login/slack';
import CompanyEdit from './companies/edit';
import CompanyDetail from './companies/detail';
import CompanyCreate from './companies/create';
import CompanyList from './companies/list';
import JobEdit from './jobs/edit';
import JobDetail from './jobs/detail';
import JobCreate from './jobs/create';
import JobList from './jobs/list';

import PeopleEdit from './people/edit';
import PeopleDetail from './people/detail';
import PeopleCreate from './people/create';
import PeopleList from './people/list';

import SearchResults from './search/results';

import Dashboard from './dashboard';

const routes = [
  // Home
  {
    path: '/',
    name: 'home',
    exact: true,
    component: Home,
  },
  // Search
  {
    path: '/search/:term',
    name: 'search-result',
    exact: true,
    component: SearchResults,
  },

  // Auth
  {
    path: '/slack/login',
    name: 'login',
    exact: true,
    component: SlackLogin,
  },

  // People
  {
    path: '/person/:id/edit',
    name: 'people-edit',
    exact: true,
    component: PeopleEdit,
  },
  {
    path: '/person/:id',
    name: 'people-detail',
    exact: true,
    component: PeopleDetail,
  },
  {
    path: '/people/create',
    name: 'people-create',
    exact: true,
    component: PeopleCreate,
  },

  {
    path: '/people',
    name: 'people',
    exact: true,
    component: PeopleList,
  },

  // Companies
  {
    path: '/company/:id/edit',
    name: 'company-edit',
    exact: true,
    component: CompanyEdit,
  },

  {
    path: '/company/:id',
    name: 'company-detail',
    exact: true,
    component: CompanyDetail,
  },
  {
    path: '/companies/create',
    name: 'company-create',
    exact: true,
    component: CompanyCreate,
  },
  {
    path: '/companies',
    name: 'companies',
    exact: true,
    component: CompanyList,
  },
  // Jobs
  {
    path: '/job/:id/edit',
    name: 'job-edit',
    exact: true,
    component: JobEdit,
  },
  {
    path: '/job/:id',
    name: 'job-detail',
    exact: true,
    component: JobDetail,
  },
  {
    path: '/job/create',
    name: 'job-create',
    exact: true,
    component: JobCreate,
  },
  {
    path: '/jobs',
    name: 'companies',
    exact: true,
    component: JobList,
  },

  // Dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    exact: true,
    component: Dashboard,
  },
];

export default routes;
