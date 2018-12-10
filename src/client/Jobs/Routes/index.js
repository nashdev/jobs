// import AsyncComponent from '../../../shared/components/AsyncComponent';

import JobsEditPage from "../Pages/JobEditPage";
import JobsDetailPage from "../Pages/JobDetailPage";
import JobsCreatePage from "../Pages/JobCreatePage";
import JobsListPage from "../Pages/JobListPage";

export default [
  {
    path: "/job/:id/edit",
    name: "job-edit",
    exact: true,
    private: true,
    // component: AsyncComponent(() =>
    //   import('../Pages/Edit' /* webpackChunkName: "jobs-edit" */),
    // ),
    component: JobsEditPage,
  },
  {
    path: "/job/:id",
    name: "job-detail",
    exact: true,
    // component: AsyncComponent(() =>
    //   import('../Pages/Detail' /* webpackChunkName: "jobs-detail" */),
    // ),

    component: JobsDetailPage,
  },
  {
    path: "/jobs/create",
    name: "job-create",
    exact: true,
    private: true,
    // component: AsyncComponent(() =>
    //   import('../Pages/Create' /* webpackChunkName: "jobs-create" */),
    // ),

    component: JobsCreatePage,
  },
  {
    path: "/jobs",
    name: "jobs-list",
    exact: true,
    // component: AsyncComponent(() =>
    //   import(/* webpackChunkName: "jobs-list",  webpackPrefetch: true */ '../Pages/List'),
    // ),

    component: JobsListPage,
  },
  {
    path: "/jobs/filter/:filter",
    name: "jobs-list-filter",
    exact: true,
    // component: AsyncComponent(() =>
    //   import(/* webpackChunkName: "jobs-list",  webpackPrefetch: true */ '../Pages/List'),
    // ),

    component: JobsListPage,
  },

  {
    path: "/",
    name: "jobs-list",
    exact: true,
    // component: AsyncComponent(() =>
    //   import(/* webpackChunkName: "jobs-list",  webpackPrefetch: true */ '../Pages/List'),
    // ),

    component: JobsListPage,
  },
];
