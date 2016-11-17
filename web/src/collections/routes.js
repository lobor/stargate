import Login from 'views/login/Login';
import Home from 'views/home/Home';
import Config from 'views/config/Config';
import ConfigPlugin from 'views/configPlugin/ConfigPlugin';
import Plugins from 'views/plugins/Plugins';
import PageNotFound from 'views/PageNotFound';

module.exports = [
  {
    pattern: '/',
    component: Home,
    name: 'home',
    exactly: true
  },
  {
    pattern: '/plugins/config/:plugin',
    component: ConfigPlugin,
    name: 'config_plugin',
    exactly: true
  },
  {
    pattern: '/config',
    component: Config,
    name: 'config',
    exactly: false
  },
  {
    pattern: '/plugins',
    component: Plugins,
    name: 'plugins',
    exactly: true
  },
  {
    pattern: '/user/login',
    component: Login,
    name: 'login',
    exactly: false
  },
];
