import React, { Component } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';

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
          return {src: '/visio/' + el, name: el};
        })
      });
    });
  }

	click(e){
		this.refs.src.src = e.target.innerHTML;
		this.refs.player.play();
	}

  delete(name){
    this.context.io.run('detect:delete', {picture: name}, (data) => {
      this.setState({img: this.state.img.filter(function(el){
        return el.name !== name;
      })});
    });
  }

	render() {
    var styleButton = {
      'backgroundColor': 'rgba(0,0,0,0.5)',
      'position': 'absolute',
      bottom: '0',
      width: '100%',
    }
    return (
      <div>
				<ul style={{'listStyle': 'none'}}>
					{this.state.img.map((img, key) => {
						return (
              <li key={key} style={{position: 'relative', float: 'left', color: 'white'}}>
                <img src={img.src} style={{display: 'block'}} />
                <div style={styleButton}>
                  <FontIcon value='delete' style={{cursor: 'pointer'}} onClick={this.delete.bind(this, img.name)} />
                </div>
              </li>
            );
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
