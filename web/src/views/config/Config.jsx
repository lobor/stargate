import FormChangePassword from 'components/forms/user/changePassword.jsx';

class Config extends React.Component {
	render() {
    return (
      <Ui.Tabs>
        <Ui.Tab label='Admin'>
          <FormChangePassword />
        </Ui.Tab>
      </Ui.Tabs>
    )
	}
}
export default Config;
