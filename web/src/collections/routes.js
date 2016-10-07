import Login from 'views/login/Login';
import Home from 'views/home/Home';
import Config from 'views/config/Config';
import PageNotFound from 'views/PageNotFound';

module.exports = [
  {
    pattern: '/',
    component: Home,
    name: 'home'
  },
  {
    pattern: '/config',
    component: Config,
    name: 'config'
  },
  {
    pattern: '/user/login',
    component: Login,
    name: 'login'
  },
];
