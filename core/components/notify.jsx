
import { TypeNotify } from './style';

class Notify extends React.Component{
  constructor(...args){
    super(...args);
    this.state = {
      msg: false,
      type: 'success',
      open: false
    }

	}


  show(option){
    this.setState(option);

    this.setState({open: true});
  }

  render(){
    var html = false;
      html = (
        <Ui.Snackbar
          open={this.state.open}
          message={this.state.msg}
          bodyStyle={TypeNotify[this.state.type]}
        />
      );
    // }

    return html;
  }
}

export default Notify;
