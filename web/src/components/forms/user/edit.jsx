import Notify from 'notify';

class Edit extends React.Component{
  constructor(...args){
    super(...args)

    this.state = {
      old_password: false,
      new_password: false,
      comfirm_new_password: false,
      user: false
    }
    this.submit = this.submit.bind(this);
  }

  componentWillMount(){
    this.context.io.run('user:get', {id: this.props.params.id}, (data)=>{
      if(data.error){

      }
      else{
        this.setState({user: data.user});
      }
    })
  }

  componentDidMount(){
    this._notify = this.refs.notification;
  }

  submit(e){
    e.preventDefault();
    this.context.io.run('user:changePassword', this.state, (res) => {
			if(res.response){
        this._notify.show({msg: Lang.successChangePassword, type: 'success'});
			}
			else{
        this._notify.show({msg: Lang.errorOccured, type: 'error'});
			}
		});
  }

  change(name, e, value){
    this.setState({[name]: value});
  }

  render(){
    return (
      <div>
        <form onSubmit={this.submit}>
          <Notify ref="notification" />
          <Ui.TextField name="new_password" id="new_password" type="password" required hintText={Lang.newPassword} onChange={this.change.bind(this, 'new_password')} /><br/>
          <Ui.TextField name="confirm_new_password" id="comfirm_new_password" type="password" required hintText={Lang.confirmPassword} onChange={this.change.bind(this, 'confirm_new_password')} /><br/>
          <div style={(this.state.msg) ? {} : {'display': 'none'}} >
            {this.state.msg}
          </div>
          <Ui.RaisedButton type="submit" label={Lang.change} primary />
        </form>
      </div>
    )
  }
}

Edit.contextTypes = {
	io: React.PropTypes.object
};

export default Edit;
