import Link from 'react-router/Link'

import {Icon} from './style';

import Redirect from 'react-router/Redirect'

class Navigation extends React.Component {
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
				<Ui.AppBar title={this.state.title} onLeftIconButtonTouchTap={this.handleToggle} style={{position:'fixed'}}>
					<Ui.Drawer docked={false} className="navigation" open={this.state.active} onRequestChange={this.handleToggle}>
						<Ui.List>
							{
								this.props.navigation.map((item, key) => {
									return (
										<Link to={item.href} key={key}  onClick={this.handleToggle}>
											<Ui.ListItem key={key} primaryText={item.label} leftIcon={<Ui.FontIcon className="material-icons">{item.icon}</Ui.FontIcon>} />
										</Link>
									);
								})
							}
							<Ui.ListItem onClick={this.logout.bind(this)} primaryText='Log out' leftIcon={<Ui.FontIcon className="material-icons">power_settings_new</Ui.FontIcon>} />
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
	router: React.PropTypes.object.isRequired,
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default Navigation;
