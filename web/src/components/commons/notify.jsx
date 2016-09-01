import React, { Component } from 'react';

import { TypeNotify, StyleContainer, StyleMsg } from './style';

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

    Object.assign(StyleMsg, TypeNotify[this.state.type]);

    if(this.state.msg){
      html = (
        <div style={StyleContainer}>
          <div style={StyleMsg}>
            {this.state.msg}
          </div>
        </div>
      );
    }

    return html;
  }
}

export default Notify;
