import React, { Component } from 'react';
import axios from 'axios';
import { Link, IndexLink } from 'react-router';
import Nav from 'react-toolbox/lib/navigation';
import AppBar from 'react-toolbox/lib/app_bar';
// import Link from 'react-toolbox/lib/link';
import Button from 'react-toolbox/lib/button';

class Navigation extends Component {
	constructor(...args){
		super(...args);

		this.click = this.click.bind(this);
	}

	click(e){
		e.preventDefault();
		this.context.router.push(e.target.href);
	}

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
				<AppBar fixed flat>
					<Nav className="navigation" type='horizontal'>
						<IndexLink to="/" activeClassName="active">Home</IndexLink>
						<Link to="/video" activeClassName="active">Video</Link>
						<Link to="/video/detect" activeClassName="active">Detect</Link>
						<Link to="/config" activeClassName="active">Config</Link>
						<a onClick={this.logout.bind(this)}>Log out</a>
					</Nav>
				</AppBar>
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