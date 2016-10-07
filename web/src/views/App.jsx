import Navigation from 'components/navigation/Navigation.jsx';

import { BrowserRouter, Match, Miss, Link } from 'react-router'

import { appCss } from './../style/app.scss';

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



class App extends React.Component {
	constructor(){
		super();

		this.state = {
			routes: Routes,
			navigation: Menu
		}
	}

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

  render() {
    return (
			<BrowserRouter>
				<MuiThemeProvider muiTheme={muiTheme}>
					<div>
						<Navigation navigation={this.state.navigation} />
						<div className="wrapper">
							{this.state.routes.map((route, i)=>{
								return (<Match key={i} ref={route.name} exactly pattern={route.pattern} component={route.component} />)
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
