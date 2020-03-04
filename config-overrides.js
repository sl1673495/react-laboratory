const rewireAliases = require('react-app-rewire-aliases');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
	config = rewireAliases.aliasesOptions({
		'@': path.resolve(__dirname, `src`)
	})(config, env);
  return config;
}