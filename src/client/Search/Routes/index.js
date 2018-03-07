import SearchResults from '../Pages/Results';

export default [
  {
    path: '/search/:term',
    name: 'search-result',
    exact: true,
    component: SearchResults,
  },
];
