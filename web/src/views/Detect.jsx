import React, { Component } from 'react';

//var clm = require('./../utils/clmtrackr/clmtrackr');
//var model = require('./../utils/clmtrackr/models/model_pca_20_svm');
//console.log(clm);
class Detect extends Component {
  constructor(...args){
    super(...args);
    this.state = {
			img: []
		};
  }

	componentDidMount(){
    this.context.io.run('detect:get', {}, (data) => {

      this.setState({
        img: data.map(function(el){
          return {src: '/visio/' + el};
        })
      });


      // var videoInput = document.getElementById('inputVideo');

  //    var ctracker = new clm.tracker();
    //  ctracker.init(model);
      // ctracker.start(videoInput);

    });
    // return axios
		// 	.get('/api/detect')
		// 	.then((response) => {
		// 		this.setState(response.data.response);
		// 	})
    //   .catch((error) => {
    //     if(401 === error.status){
    //       this.context.router.push('/user/login');
    //     }
    //   });
  }

	click(e){
		this.refs.src.src = e.target.innerHTML;
		this.refs.player.play();
	}

	render() {
    return (
      <div>
				<ul>
					{this.state.img.map((img, key) => {
						return <li key={key}><img src={img.src} /></li>
					})}
				</ul>
      </div>
    )
	}
}
Detect.contextTypes = {
	io: React.PropTypes.object
};
export default Detect;
