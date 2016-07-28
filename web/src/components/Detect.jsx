import React, { Component } from 'react';
import axios from 'axios';

class Detect extends Component {
  constructor(...args){
    super(...args);
    this.state = {
			videos: []
		};
  }

	componentWillMount(){
    return axios
			.get('/api/detect')
			.then((response) => {
				this.setState(response.data.response);
			})
      .catch((error) => {
        if(401 === error.status){
          this.context.router.push('/user/login');
        }
      });
  }

	click(e){
		this.refs.src.src = e.target.innerHTML;
		this.refs.player.play();
	}

	render() {
    return (
      <div>
				<video ref="player" controls>
					<source ref="src" src=""></source>
				</video>
				<ul>
					{this.state.videos.map((video, key) => {
						return <li onClick={this.click.bind(this)} key={key}>{video.name}</li>
					})}
					<li></li>
				</ul>
      </div>
    )
	}
}

export default Detect;