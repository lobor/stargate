import React, { Component } from 'react';
import axios from 'axios';
import { Link, IndexLink } from 'react-router';

class Navigation extends Component {
	logout(){
		axios
			.get('/user/logout')
			.then(function (response) {
				this.context.auth(false);
				this.context.router.push('/user/login');
			}.bind(this))
			.catch(function (error) {
				console.log(error);
				if(error.data.errors.redirect){
					this.context.router.push('/user/login');
				}
			}.bind(this));
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