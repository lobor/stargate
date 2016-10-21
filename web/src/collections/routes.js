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
    name: 'home'
  },
  {
    pattern: '/config',
    component: Config,
    name: 'config'
  },
  {
    pattern: '/config/:plugin',
    component: ConfigPlugin,
    name: 'config_plugin'
  },
  {
    pattern: '/plugins',
    component: Plugins,
    name: 'plugins'
  },
  {
    pattern: '/user/login',
    component: Login,
    name: 'login'
  },
];
