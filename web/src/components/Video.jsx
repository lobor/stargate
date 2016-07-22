import React, { Component } from 'react';
import ReactDom from 'react-dom';
import FontIcon from 'react-toolbox/lib/font_icon';

class Video extends Component {
  constructor(...args){
    super(...args)
    this.state = {msg:false};
  }
  error(e, f, r){
    this.setState({msg: 'An error has been occured'});
    console.log(this.refs.player.error);
  }

  startClick(type) {
    let config = {};

    // configure la configuration du mouvement
    switch (type){
      case 'l':
        config.direction = 'left';
        break;
      case 'u':
        config.direction = 'up';
        break;
      case 'd':
        config.direction = 'down';
        break;
      case 'r':
        config.direction = 'right';
        break;
    }

    // appelle node pour controler le robot
    console.log('start', config);
  }

  endClick(type) {
    let config = {};

    // configure la configuration du mouvement
    switch (type){
      case 'l':
        config.direction = 'left';
        break;
      case 'u':
        config.direction = 'up';
        break;
      case 'd':
        config.direction = 'down';
        break;
      case 'r':
        config.direction = 'right';
        break;
    }

    // appelle node pour controler le robot
    console.log('finish', config);
  }

	render() {
    let width = {
      width: '400px',
    };

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
    };

    let styleCenter = {
      marginTop: 'auto',
      marginBottom: 'auto'
    };

    let styleContainerArrow = {
      marginRight: 'auto',
      marginLeft: 'auto',
      marginTop: '50px',
      height: '100px',
    };

    let styleCursor = {
      cursor: 'pointer'
    };

    Object.assign(styleContainerArrow, width);
    Object.assign(style, width);
    Object.assign(styleCenter, styleCursor);

    return (
      <div>
        <video ref="player" onError={this.error.bind(this)} height="222" style={style} src="/webcam.mp4"></video>

        <div style={styleMsg}>
          {this.state.msg}
        </div>

        <div className="flex between" style={styleContainerArrow}>
          <FontIcon style={styleCenter} onMouseDown={this.startClick.bind(this, 'l')} onMouseUp={this.endClick.bind(this, 'l')} value='arrow_back' />
          <div className="flex-col between">
            <FontIcon style={styleCursor} onMouseDown={this.startClick.bind(this, 'u')} onMouseUp={this.endClick.bind(this, 'u')} value='arrow_upward' />
            <FontIcon style={styleCursor} onMouseDown={this.startClick.bind(this, 'd')} onMouseUp={this.endClick.bind(this, 'd')} value='arrow_downward' />
          </div>
          <FontIcon style={styleCenter} onMouseDown={this.startClick.bind(this, 'r')} onMouseUp={this.endClick.bind(this, 'r')} value='arrow_forward' />
        </div>
      </div>
    )
	}
}

export default Video;