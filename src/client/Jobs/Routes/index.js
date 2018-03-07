import JobEdit from '../Pages/Edit';
import JobDetail from '../Pages/Detail';
import JobCreate from '../Pages/Create';
import JobList from '../Pages/List';

export default [
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
];
