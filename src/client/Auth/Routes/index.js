import SlackLogin from '../Pages/Slack';

export default [
  {
    path: '/slack/login',
    name: 'login',
    exact: true,
    component: SlackLogin,
  },
];
