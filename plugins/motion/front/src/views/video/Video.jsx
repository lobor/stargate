import React, { Component } from 'react';

import MediaVideo from './../../components/media/video.jsx';

class Video extends Component {
	constructor(...args){
		super(...args);

		this.state = {
			webcam:[],
			visio: '',
			score: ''
		};
	}

	componentDidMount(){
		this.context.io.run('video:get', {}, (data) => {
			this.setState(data);
		})
	}

	render() {
		var html = '';
		if(this.state.webcam.length){
			html = [];
			this.state.webcam.forEach((el, i) => {
				html.push(<MediaVideo key={i} port={el.stream_port} />);
			})
		}
		else{
			html = 'Thea are not webcam';
		}

    return (
      <div>
				{html}
      </div>
    )
	}
}
Video.contextTypes = {
	io: React.PropTypes.object
};
export default Video;
