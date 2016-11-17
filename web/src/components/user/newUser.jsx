import { Link, Match, Redirect } from 'react-router';
import Loading from 'components/loading/Loading';
import Notify from 'notify';

class NewUser extends React.Component {
  constructor(){
    super();

    this.state = {
      form: {
        password: false,
        username: false,
        confirm_password: false,
        role: false,
      },
      renter: false,
      redirect: false,
      msg: false,
      roles: [],
    }
    this.submit = this.submit.bind(this);

  }

  componentWillMount(){
    this.context.io.run('role:list', {}, (datas)=>{
      this.setState({ render: true, roles: datas })
    });
  }

  submit(e){
    e.preventDefault();
    if(this.state.password === this.state.comfirm_password){
      this.context.io.run('user:create', this.state.form, (res) => {
  			if(res.success){
          this.setState({ redirect: '/config/users' })
          //this._notify.show({msg: Lang.successChangePassword, type: 'success'});
  			}
  			else{
          //this._notify.show({msg: Lang.errorOccured, type: 'error'});
  			}
  		});
    }
    else{
      this.setState({ msg: 'It\' not the same password' })
    }
  }

  change(name, e, value, value2){
    let form = this.state.form;
    Object.assign(form, { [name]: value2 || value });
    this.setState({ form: form });
  }

	render() {
    if(!this.state.redirect){
      return (
        <Loading render={this.state.render}>
          <form onSubmit={this.submit}>
            <Notify ref="notification" />
            <h1>{Lang.createUser}</h1>
            <Ui.TextField name="username" id="username" type="text" required hintText={Lang.username} onChange={this.change.bind(this, 'username')} />
            <br/>
            <Ui.TextField name="password" id="password" type="password" required hintText={Lang.password} onChange={this.change.bind(this, 'password')} />
            <br/>
            <Ui.TextField name="confirm_password" id="comfirm_password" type="password" required hintText={Lang.confirmPassword} onChange={this.change.bind(this, 'confirm_password')} />
            <br/>
            <Ui.SelectField
              floatingLabelText={Lang.roles}
              value={this.state.value}
              onChange={this.change.bind(this, 'role')}
            >
              {this.state.roles.map((role, key)=>{
                return (
                  <Ui.MenuItem key={key} value={role.id} primaryText={Lang[role.name]} />
                );
              })}
            </Ui.SelectField>
            <div style={(this.state.msg) ? {} : {'display': 'none'}} >
              {this.state.msg}
            </div>
            <Ui.RaisedButton type="submit" label={Lang.save} primary />
          </form>
        </Loading>
      )
    }
    else{
      return ( <Redirect to={this.state.redirect}  />)
    }
	}
}

NewUser.contextTypes = {
	io: React.PropTypes.object
};

export default NewUser;
