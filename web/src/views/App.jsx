import Navigation from 'components/navigation/Navigation.jsx';

import { BrowserRouter, Match, Miss, Link } from 'react-router'

// Style of app
import { appCss } from './../style/app.scss';

// Socket API
var Api = require("imports?this=>window!./../utils/Api")

var Menu = require('./../collections/menu');
var Routes = require('./../collections/routes');



// Theming
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.indigo500,
  },
  appBar: {
    height: 50,
  },
});
// end theming



/**
 * Point of entry to react application, as well as routes
 */
class App extends React.Component {
	constructor(){
		super();

		this.state = {
			routes: Routes,
			navigation: Menu,
      config: {}
		}
	}

  componentDidMount(){
    // Event for add script when a plugin is installing
    Api.on('assets:add', (assets)=>{
      var script = document.createElement('script');
      script.src = assets;

      document.body.appendChild(script);
    });

    // Event for delete script when a plugin is installing
    Api.on('assets:delete', (assets)=>{
      var scripts = document.querySelectorAll('script');
      scripts.forEach((script)=>{
        if(script.src === window.location.origin + assets){
          script.remove();
        }
      })
    });
  }

  // Create context authentification and socket API
	getChildContext() {
		var auth = false;
		if('/user/login' !== window.location.pathname){
      auth = true;
		}
		else if('/user/login' === window.location.pathname){
			auth = false;
		}

    return {
      auth: (val) => {
				if(val !== undefined){
					auth = val;
				}
				return auth;
			},
			io: Api
    };
  }

  // render App with routes and navigation
  render() {
    return (
			<BrowserRouter>
				<MuiThemeProvider muiTheme={muiTheme}>
					<div>
						<Navigation ref="navigation" navigation={this.state.navigation} />
						<div className="wrapper">
							{this.state.routes.map((route, i)=>{
								return (<Match key={i} exactly={route.exactly} pattern={route.pattern} component={route.component} />)
							})}
						</div>
					</div>
				</MuiThemeProvider>
			</BrowserRouter>
		)
  }
}

App.childContextTypes = {
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default App;
