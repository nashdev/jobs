import PeopleEdit from '../Pages/Edit';
import PeopleDetail from '../Pages/Detail';
import PeopleCreate from '../Pages/Create';
import PeopleList from '../Pages/List';

export default [
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
];
