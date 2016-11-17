import React, { Component } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';

class Deplacement extends Component{
  constructor(...args){
    super(...args)
    this.state = {msg:false};
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
  }

  render(){
    let width = {
      width: '100%',
      'maxWidth': '400px',
    };
    let styleContainerArrow = {
      marginRight: 'auto',
      marginLeft: 'auto',
      marginTop: '50px',
      height: '100px',
    };
    let styleCenter = {
      marginTop: 'auto',
      marginBottom: 'auto'
    };let styleCursor = {
      cursor: 'pointer'
    };
    Object.assign(styleContainerArrow, width);
    Object.assign(styleCenter, styleCursor);
    return (
      <div className="flex between" style={styleContainerArrow}>
        <FontIcon style={styleCenter} onMouseDown={this.startClick.bind(this, 'l')} onMouseUp={this.endClick.bind(this, 'l')} value='arrow_back' />
        <div className="flex-col between">
          <FontIcon style={styleCursor} onMouseDown={this.startClick.bind(this, 'u')} onMouseUp={this.endClick.bind(this, 'u')} value='arrow_upward' />
          <FontIcon style={styleCursor} onMouseDown={this.startClick.bind(this, 'd')} onMouseUp={this.endClick.bind(this, 'd')} value='arrow_downward' />
        </div>
        <FontIcon style={styleCenter} onMouseDown={this.startClick.bind(this, 'r')} onMouseUp={this.endClick.bind(this, 'r')} value='arrow_forward' />
      </div>
    )
  }
}

export default Deplacement;
