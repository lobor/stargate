import React, { Component } from 'react';

import MediaVideo from './../../components/media/video.jsx';
import RobotDeplacement from './../../components/robot/deplacement.jsx';

class Video extends Component {
	constructor(...args){
		super(...args);

		this.state = {webcam:[]};
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
				html.push(<MediaVideo key={i} port={el.port} />);
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
