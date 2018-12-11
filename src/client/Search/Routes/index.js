import SearchResultsPage from "../Pages/SearchResultsPage";

export default [
  {
    path: "/search/:term",
    name: "search-result",
    exact: true,
    component: SearchResultsPage,
  },
];
