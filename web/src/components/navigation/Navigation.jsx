import React, { Component } from 'react';

import Nav from 'react-toolbox/lib/navigation';
import AppBar from 'react-toolbox/lib/app_bar';
import { List, ListItem } from 'react-toolbox/lib/list';
import { IconButton } from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';
import Link from 'react-router/Link'

import {Icon} from './style';

import Redirect from 'react-router/Redirect'

class Navigation extends Component {
	constructor(...args){
		super(...args);
		this.handleToggle = this.handleToggle.bind(this);
		this.state = {
			active: false,
			title: 'home',
		}

	}

	handleToggle() {
    this.setState({active: !this.state.active});
  };

	logout(){
		this.context.io.run('logout', {}, (response) => {
			if(response.response){
				this.context.auth(false);
				console.log(this.context.auth());
				// this.context.router.go('/user/login');
				// this.context.router.push('/user/login');
			}
		})
	}

	render() {
		var rendu = null;

		if(this.context.auth()){
			rendu = (
				<AppBar fixed flat>
					<IconButton icon='menu' onClick={this.handleToggle} style={Icon} />
					<h1>{this.state.title}</h1>
					<Drawer className="navigation" active={this.state.active} onOverlayClick={this.handleToggle}>
						<List selectable ripple>
							{
								this.props.navigation.map((item, key) => {
									return (
										<Link to={item.href} key={key}  onClick={this.handleToggle}>
											<ListItem key={key} caption={item.label} leftIcon={item.icon} />
										</Link>
									);
								})
							}
							<ListItem onClick={this.logout.bind(this)} caption='Log out' leftIcon='power_settings_new' />
						</List>
		      </Drawer>
				</AppBar>
			);
		}
		else{
			rendu = (<Redirect to="/user/login" />);
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
