import React, { Component } from 'react';
import { Width, Style, Container } from './style';


class Video extends Component{
  constructor(...args){
    super(...args)
    this.state = {
      msg:false,
      msgFR: ''
    };
    this.error = this.error.bind(this);
  }

  componentWillMount(){
		this.context.io.on('fr:result', (data) => {
      if(this.props.port === data.port){
        var name = '';
  			var score = '';
  			if(data && data.collection){
  				name = data.collection;
  				score = data.score
  			}

  			this.setState({msgFR: name + ' => ' + score});
      }
		});

    this.context.io.on('fr:noFace', (data) => {
      if(this.props.port === data.port){
  			this.setState({msgFR: ''});
      }
		});
	}

	componentWillUnmount(){
		this.context.io.off('fr:result');
    this.context.io.off('fr:noFace');
	}

  error(){
    this.setState({msg: 'An error has been occured'});
  }

  render(){
    Object.assign(Style, Width);
    let url = '/video/cam?port=' + this.props.port
    return (
      <div style={Container}>
        <img style={Style} alt={this.state.msg} src={url} onError={this.error} />
        {this.state.msgFR}
      </div>
    )
  }
}
Video.contextTypes = {
	io: React.PropTypes.object
};
export default Video;
