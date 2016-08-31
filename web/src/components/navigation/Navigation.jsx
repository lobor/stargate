import React, { Component } from 'react';

import Nav from 'react-toolbox/lib/navigation';
import AppBar from 'react-toolbox/lib/app_bar';
import { List, ListItem } from 'react-toolbox/lib/list';
import { IconButton } from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';

import Menu from './../../collections/menu';

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
				console.log(this.context.router);
				this.context.router.go('/user/login');
				// this.context.router.push('/user/login');
			}
		})
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
