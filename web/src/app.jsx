
require("react");
require("material-ui");

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import { render } from 'react-dom';
import App from './views/App.jsx';


if (typeof document !== "undefined") {
	window.App = render(<App />, document.getElementById('container'));
}
