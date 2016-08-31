import React, { Component } from 'react';

class Notify extends Component{
  constructor(...args){
    super(...args);
    this.state = {
      msg: false,
      type: 'success'
    }

	}


  addNotify(option){
    this.setState(option);

    setTimeout(() => {
      this.setState({msg: false});
    }, 2000);
  }

  render(){
    var html = false;

    let typeNotify = {
      'success': {
        backgroundColor: '#32e432'
      },
      'error': {
        backgroundColor: 'red'
      }
    }

    let styleContainer = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    };

    let styleMsg = {
      padding: '10px'
    };

    Object.assign(styleMsg, typeNotify[this.state.type]);

    if(this.state.msg){
      html = (
        <div style={styleContainer}>
          <div style={styleMsg}>
            {this.state.msg}
          </div>
        </div>
      );
    }

    return html;
  }
}

export default Notify;
