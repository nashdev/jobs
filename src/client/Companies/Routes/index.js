import CompanyEdit from '../Pages/Edit';
import CompanyDetail from '../Pages/Detail';
import CompanyCreate from '../Pages/Create';
import CompanyList from '../Pages/List';

export default [
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
];
