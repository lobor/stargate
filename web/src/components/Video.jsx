import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Video extends Component {
  constructor(...args){
    super(...args)
    this.state = {msg:false};
  }
  error(e, f, r){
    this.setState({msg: 'An error has been occured'});
    console.log(this.refs.player.error);
  }

	render() {
    let style = {
      background: 'black',
      display: 'block',
      margin: 'auto',
      marginTop: '25px'
    };

    let styleMsg = {
      color: 'red',
      textAlign: 'center',
      marginTop: '25px'
    }

    return (
      <div>
        <video ref="player" width="400" onError={this.error.bind(this)} height="222" style={style} src="/webcam.mp4">
        </video>
        <div style={styleMsg}>{this.state.msg}</div>
      </div>
    )
	}
}

export default Video;