import PeopleEditPage from "../Pages/PeopleEditPage";
import PeopleDetailPage from "../Pages/PeopleDetailPage";
import PeopleListPage from "../Pages/PeopleListPage";

export default [
  {
    path: "/settings",
    name: "people-edit",
    exact: true,
    private: true,
    component: PeopleEditPage,
  },
  {
    path: "/person/:id",
    name: "people-detail",
    exact: true,
    component: PeopleDetailPage,
  },

  {
    path: "/people",
    name: "people-list",
    exact: true,
    component: PeopleListPage,
  },

  {
    path: "/people/filter/:filter",
    name: "people-list-filer",
    exact: true,
    component: PeopleListPage,
  },
];
