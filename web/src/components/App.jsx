import React, { Component } from 'react';
import Navigation from './Navigation.jsx';

import { Route, Router, browserHistory } from 'react-router';


class App extends Component {
	componentWillMount() {
		var route = this.props.route, auth;
		
		var logging = localStorage.getItem('login');
		
		this.state = {log: undefined};
		
		
		if(undefined === logging){
			logging = "free";
		}
		
		auth = route.auth;
		
		if(route.indexRoute){
			auth = route.indexRoute.auth;
		}
		
		if(-1 === auth.indexOf(logging)){
			this.context.router.push('/user/login');
			localStorage.setItem('login', 'user');
			return false;
		}
  }
	
  render() {
    return (
      <div>
				<Navigation />
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