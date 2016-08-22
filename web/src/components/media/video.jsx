import React, { Component } from 'react';

class Video extends Component{
  constructor(...args){
    super(...args)
    this.state = {msg:false};

    this.error = this.error.bind(this)
  }

  error(e, f, r){
    this.setState({msg: 'An error has been occured'});
  }

  render(){
    let width = {
      width: '100%',
      'maxWidth': '400px',
    };
    let style = {
      background: 'black',
      display: 'block',
      margin: 'auto',
      marginTop: '25px',
      color: 'red',
      height: '300px',
      textAlign: 'center'
    };
    Object.assign(style, width);
    return (
      <div>
        <img style={style} alt={this.state.msg} src='/video/cam' onError={this.error} />
      </div>
    )
  }
}

export default Video;
