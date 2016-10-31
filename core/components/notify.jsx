
import { TypeNotify } from './style';

class Notify extends React.Component{
  constructor(...args){
    super(...args);
    this.state = {
      msg: false,
      type: 'success',
      open: false,
      error: false,
      dialog: false
    }

    this.handleErrors = this.handleErrors.bind(this);
	}


  show(option){
    this.setState(option);

    this.setState({open: true});
  }

  handleErrors(){
    this.setState({ dialog: !this.state.dialog });
  }

  render(){
    var html = false;
    let param = {};

    if(this.state.error){
      param.action = ( <Ui.FlatButton label={ Lang.seeDetails } /> );
      param.onActionTouchTap = this.handleErrors
    }

    html = (
      <div>
        <Ui.Dialog
          title={Lang.errors}
          actions={
            <Ui.FlatButton label={Lang.close} primary={true} onTouchTap={ this.handleErrors } />
          }
          modal={true} open={this.state.dialog} onRequestClose={ this.handleErrors }
        >
          {this.state.error}
        </Ui.Dialog>
        <Ui.Snackbar
          open={this.state.open}
          message={this.state.msg}
          bodyStyle={TypeNotify[this.state.type]}
          {...param}
        />
      </div>
    );

    return html;
  }
}

export default Notify;
