import Link from 'react-router/Link'


import Redirect from 'react-router/Redirect'

import { Icon, Badge } from './style';

class Navigation extends React.Component {
	constructor(...args){
		super(...args);
		this.handleToggle = this.handleToggle.bind(this);
		this.state = {
			active: false,
			title: 'home',
		}
	}

	handleToggle(r,d,e) {
    this.setState({active: !this.state.active});
  };

	logout(){
		this.context.io.run('logout', {}, (response) => {
			if(response.response){
				this.context.auth(false);
			}
		})
	}

	render() {
		var rendu = null;
		if(this.context.auth()){
			rendu = (
				<Ui.AppBar
					title={this.state.title}
					onLeftIconButtonTouchTap={this.handleToggle}
					iconElementRight={
						<Ui.Badge badgeContent={4} primary={false} style={{padding: '0'}} badgeStyle={Badge}>
							<Ui.IconButton>
								<Ui.FontIcon className="material-icons" color={Colors.white}>info</Ui.FontIcon>
							</Ui.IconButton>
						</Ui.Badge>
					}
					style={{position:'fixed'}}>
					<Ui.Drawer docked={false} className="navigation" open={this.state.active} onRequestChange={this.handleToggle}>
						<Ui.List>
							{
								this.props.navigation.map((item, key) => {
									let tradLabel = (item.plugin) ? Lang[item.plugin][item.label] : Lang[item.label];

									if(!tradLabel){
										console.error('UNTRANSLATED =>', item.label);
										tradLabel = item.label;
									}

									return (
										<Link to={item.href} key={key}  onClick={this.handleToggle}>
											<Ui.ListItem key={key} primaryText={tradLabel} leftIcon={<Ui.FontIcon className="material-icons">{item.icon}</Ui.FontIcon>} />
										</Link>
									);
								})
							}
							<Ui.ListItem onClick={this.logout.bind(this)} primaryText={Lang.logOut} leftIcon={<Ui.FontIcon className="material-icons">power_settings_new</Ui.FontIcon>} />
						</Ui.List>
		      </Ui.Drawer>
				</Ui.AppBar>
			);
		}
		else{
			rendu = (<Redirect to="/user/login" />);
		}

    return rendu

	}
}

Navigation.contextTypes = {
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default Navigation;
