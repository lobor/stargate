import React, { Component } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';

import { Button, Ul, Li, Img, Icon } from './style';

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
    return (
      <div>
				<ul style={Ul}>
					{this.state.img.map((img, key) => {
            let toto;
            if(img.src.match(/avi/g)){
              toto = (<video src={img.src} style={Img} controls></video>)
            }
            else{
              toto = (<img src={img.src} style={Img} />)
            }
						return (
              <li key={key} style={Li}>
                {toto}
                <div style={Button}>
                  <FontIcon value='delete' style={Icon} onClick={this.delete.bind(this, img.name)} />
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
