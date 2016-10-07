
import FormLogin from 'components/forms/user/login.jsx';

import { CardStyle, CardTitleStyle } from './style';

class Login extends React.Component {
  render() {
    return (
			<Ui.Card style={CardStyle}>
				<Ui.CardTitle
					title="Login"
					style={CardTitleStyle}
				/>
				<Ui.CardText>
					<FormLogin />
				</Ui.CardText>
			</Ui.Card>
    )
  }
}


export default Login;
