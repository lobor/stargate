import { StyleContainer, StyleContainerButton, StyleButton, StyleText } from './styles.js'

class ButtonDelete extends React.Component{
  constructor(...args){
    super(...args);
    this.state = {
      confirmOpen: false
    };

    this.handleShowConfirm = this.handleShowConfirm.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
	}

  handleShowConfirm(){
    this.setState({
      confirmOpen: !this.state.confirmOpen
    })
  }

  confirmDelete(){
    if(this.props.confirmDelete)
      this.props.confirmDelete();
  }

  render(){
    let html = (<Ui.RaisedButton icon={< Ui.FontIcon color = "white" className = "material-icons" > delete < /Ui.FontIcon>} onClick={this.handleShowConfirm} backgroundColor={Colors.red800}/>);
    if(this.state.confirmOpen){
      html = (
        <div style={StyleContainer}>
          <div style={StyleText}>are you sure?</div>
          <div style={StyleContainerButton}>
            <Ui.FloatingActionButton mini={true} backgroundColor={Colors.lightGreen500} style={StyleButton} onClick={this.confirmDelete}>
              < Ui.FontIcon className="material-icons" > check < /Ui.FontIcon>
            </Ui.FloatingActionButton>
            <Ui.FloatingActionButton mini={true} backgroundColor={Colors.red800} style={StyleButton} onClick={this.handleShowConfirm}>
              < Ui.FontIcon className="material-icons" > cancel < /Ui.FontIcon>
            </Ui.FloatingActionButton>
          </div>
        </div>
      );
    }


    return (html);
  }
}

export default ButtonDelete;
