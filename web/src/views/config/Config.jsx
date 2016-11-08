import FormChangePassword from 'components/forms/user/changePassword.jsx';
import ListUser from 'components/user/listUser.jsx';
import { Link, Match } from 'react-router';

class Config extends React.Component {
	render() {
		let link = [], match = [];
		let config = [{
			label: 'Users',
			component: ListUser,
			url: '/config/users',
			role: 1
		}];

		let user = JSON.parse(localStorage.getItem('user'));
		config.forEach((item)=>{
			if(user.id_role === item.role){
				link.push({
					url: item.url,
					label: item.label
				});

				match.push({
					url: item.url,
					component: item.component
				});
			}
		});

		match.push({
			url: '/config/users/:id',
			component: FormChangePassword
		});

    return (
			<div style={ {display: 'flex'} }>
				<Ui.Card style={ {width: "20%"} }>
					<Ui.CardText>
						<Ui.List>
							{link.map((item, key)=>{
								return (
									<Link key={key} to={item.url} style={ {textDecoration: "none"} }>
										<Ui.ListItem  key={key} primaryText={item.label} />
									</Link>
								);
							})}
				    </Ui.List>
					</Ui.CardText>
				</Ui.Card>
				<Ui.Card style={ {width: "80%"} }>
					<Ui.CardText>
						{match.map((item, key)=>{
							return (
								<Match key={key} exactly pattern={item.url} component={item.component} />
							);
						})}
					</Ui.CardText>
				</Ui.Card>
			</div>
    )
	}
}

Config.contextTypes = {
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default Config;
