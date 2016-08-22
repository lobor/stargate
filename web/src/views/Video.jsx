import React, { Component } from 'react';

import MediaVideo from './../components/media/video.jsx'
import RobotDeplacement from './../components/robot/deplacement.jsx'

class Video extends Component {
	render() {
    return (
      <div>
        <MediaVideo />
        <RobotDeplacement />
      </div>
    )
	}
}

export default Video;
