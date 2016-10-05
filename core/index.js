var basePath = process.cwd();

import { success, error, warning } from './console';

module.exports = {
  Plugin: require(basePath + '/core/plugin'),
  success: success,
  error: error,
  warning: warning,
};
