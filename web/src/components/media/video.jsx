import React, { Component } from 'react';
import { Width, Style, Container } from './style';


class Video extends Component{
  constructor(...args){
    super(...args)
    this.state = {
      msg:false,
      collection: '',
      score: ''
    };
    console.log(this);
    this.error = this.error.bind(this);
  }

  componentWillMount(){
		this.context.io.on('video:detect', (data) => {
      if(this.props.port === data.port){
        var name = '';
  			var score = '';
  			if(data && data.collection){
  				name = data.collection;
  				score = data.score
  			}

  			this.setState({visio: name, score: score})
      }
		});
	}

	componentWillUnmount(){
		this.context.io.off('video:detect');
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
        {this.state.visio} => {this.state.score}
      </div>
    )
  }
}
Video.contextTypes = {
	io: React.PropTypes.object
};
export default Video;
