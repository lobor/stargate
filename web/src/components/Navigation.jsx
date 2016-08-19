import React, { Component } from 'react';
import axios from 'axios';
import { Link, IndexLink } from 'react-router';
import Nav from 'react-toolbox/lib/navigation';
import AppBar from 'react-toolbox/lib/app_bar';

import Menu from './../collections/menu';

import { Button, IconButton } from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';

import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

class Navigation extends Component {
	constructor(...args){
		super(...args);

		this.click = this.click.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.state = {
			active: false,
			title: 'home',
			menu: Menu
		}

	}

	click(url, label, e){
		this.setState({title: label});
		this.context.router.push(url);
		this.handleToggle();
	}

	handleToggle() {
    this.setState({active: !this.state.active});
  };

	logout(){
		this.context.io.run('logout', {}, (response) => {
			if(response.response){
				this.context.auth(false);
				this.context.router.push('/user/login');
			}
		})
			// .get('/user/logout')
			// .then(function (response) {
			// 	this.context.auth(false);
			// 	this.context.router.push('/user/login');
			// }.bind(this))
			// .catch(function (error) {
			// 	if(error.data.errors.redirect){
			// 		this.context.router.push('/user/login');
			// 	}
			// }.bind(this));
	}

	render() {
		var rendu = null;

		if(this.context.auth()){

			rendu = (
				<AppBar fixed flat>
					<IconButton icon='menu' onClick={this.handleToggle} style={{color: 'white'}} />
					<h1>{this.state.title}</h1>
					<Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
						<List selectable ripple>
							{
								this.state.menu.map((item, key) => {
									return (
										<ListItem key={key} onClick={this.click.bind(undefined, item.href, item.label)} caption={item.label} leftIcon={item.icon} />
									);
								})
							}
							<ListItem onClick={this.logout.bind(this)} caption='Log out' leftIcon='power_settings_new' />
						</List>
		      </Drawer>
				</AppBar>
			);
		}

    return rendu

	}
}

Navigation.contextTypes = {
	router: React.PropTypes.object.isRequired,
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default Navigation;
