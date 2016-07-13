import React, { Component } from 'react';
import Navigation from './Navigation.jsx';

import { Route, Router, browserHistory } from 'react-router';


class App extends Component {
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
				if(val){
					auth = val;
				}
				return auth;
			}
    };
  }

  render() {
    return (
			<div>
				<Navigation />
				<div className="wrapper">
					{this.props.children}
				</div>
			</div>
		)
  }
}

App.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

App.childContextTypes = {
	auth: React.PropTypes.func
};

export default App;