

import Notify from './../../commons/notify';

class ChangePassword extends React.Component{
  constructor(...args){
    super(...args)

    this.state = {
      old_password: false,
      new_password: false,
      comfirm_new_password: false,
      msg: false,
      open: true
    }


    this.submit = this.submit.bind(this);
  }

  componentDidMount(){
    this._notify = this.refs.notification;
  }

  submit(e){
    e.preventDefault();
    this.context.io.run('user:changePassword', this.state, (res) => {
			if(res.response){
        this.setState({
          msg:  'The password has been changed'
        })
        this._notify.addNotify({msg: 'The password has been changed', type: 'success'});
			}
			else{
        this.setState({
          msg:  'An error has occured'
        })
        this._notify.addNotify({msg: 'An error has occured', type: 'error'});
			}
		});
  }

  change(name, value){
    this.setState({[name]: value});
  }

  render(){
    return (
      <div>
        <form onSubmit={this.submit}>
          <Ui.Snackbar
            open={this.state.open}
            message={this.state.message}
          />
          <Notify ref="notification" />
          <Ui.TextField name="old_password" id="old_password" type="password" required hintText="Current password" onChange={this.change.bind(this, 'old_password')} /><br/>
          <Ui.TextField name="new_password" id="new_password" type="password" required hintText="New password" onChange={this.change.bind(this, 'new_password')} /><br/>
          <Ui.TextField name="confirm_new_password" id="comfirm_new_password" type="password" required hintText="Comfirm new password" onChange={this.change.bind(this, 'confirm_new_password')} /><br/>
          <div style={(this.state.msg) ? {} : {'display': 'none'}} >
            {this.state.msg}
          </div>
          <Ui.RaisedButton type="submit" label="Validate" primary />
        </form>
      </div>
    )
  }
}

ChangePassword.contextTypes = {
	io: React.PropTypes.object
};

export default ChangePassword;
