import React, { Component } from 'react';
import axios from 'axios';
import { Link, IndexLink } from 'react-router';

class Navigation extends Component {
	logout(){
		var toto = console;
		axios
			.get('/user/logout')
			.then(function (response) {
				this.context.router.push('/user/login');
				// this.state.log = false;
			}.bind(this))
			.catch(function (error) {
				toto.log(error);
			});
	}

	render() {
		var rendu = null;

		if(this.context.auth()){
			rendu = (
				<nav>
					<ul>
						<li>
							<IndexLink to="/" activeClassName="active">Home</IndexLink>
						</li>
						<li>
							<Link to="/video" activeClassName="active">Video</Link>
						</li>
						<li>
							<Link to="/config" activeClassName="active">Config</Link>
						</li>
						<li>
							<a onClick={this.logout.bind(this)}>Log out</a>
						</li>
					</ul>
				</nav>
			);
		}

    return rendu
    
	}
}

Navigation.contextTypes = {
	router: React.PropTypes.object.isRequired,
	auth: React.PropTypes.func
};

export default Navigation;