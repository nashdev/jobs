import CompanyEditPage from "../Pages/CompanyEditPage";
import CompanyDetailPage from "../Pages/CompanyDetailPage";
import CompanyCreatePage from "../Pages/CompanyCreatePage";
import CompanyListPage from "../Pages/CompanyListPage";

export default [
  {
    path: "/company/:id/edit",
    name: "company-edit",
    exact: true,
    private: true,
    component: CompanyEditPage,
  },

  {
    path: "/company/:id",
    name: "company-detail",
    exact: true,
    component: CompanyDetailPage,
  },
  {
    path: "/companies/create",
    name: "company-create",
    exact: true,
    private: true,
    component: CompanyCreatePage,
  },
  {
    path: "/companies",
    name: "companies",
    exact: true,
    component: CompanyListPage,
  },
];
