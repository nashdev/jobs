import Dashboard from "../Pages/Dashboard";

export default [
  {
    path: "/dashboard/:collection?",
    name: "dashboard",
    exact: true,
    private: true,
    component: Dashboard,
  },
];
