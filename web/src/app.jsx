/**
 * Webpack of entry point
 */


// Add React on window => window.React
require("react");

// Add material-ui on window => window.Ui
require("material-ui");

// Add material-ui-colors on window => window.Colors
require("material-ui/styles/colors");

// Add lang on window => window.Lang
require("imports?this=>window!languages");


var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import { render } from 'react-dom';
import App from './views/App.jsx';

// render app
if (typeof document !== "undefined") {
	window.App = render(<App />, document.getElementById('container'));
}
