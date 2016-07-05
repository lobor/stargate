import React, { Component } from 'react';

import { Route, Router, browserHistory } from 'react-router';


class App extends Component {
	// constructor(props){
	// 	super(props);
	// 	console.log(this.context = {router: React.PropTypes.object.isRequired});
	// }
	componentWillMount() {
		var routes = this.props.route, route, auth;
		this.state = {log: undefined};
		
		// console.log(this);
		
		
		if(undefined === this.state.log){
			this.state.log = "free";
		}
		
		
		// for (var i = 0, r = routes.length; i < r; i++) {
			route = routes;
			auth = route.auth;
			
			if(route.indexRoute){
				auth = route.indexRoute.auth;
			}
			
			
					
			// console.log(auth, this.state.log);
			
			if(-1 === auth.indexOf(this.state.log)){
				// console.log(6);
				this.context.router.push('/user/login');
				return false;
			}
		// }
  }
	
  render() {
    return (
      <div>
        <h1>App</h1>

				{this.props.children}
      </div>
    )
  }
}

App.contextTypes = {
	router: React.PropTypes.object.isRequired
// 	routes: React.PropTypes.array.isRequired
};

export default App;