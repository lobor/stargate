
import React, { Component } from 'react';


class ModelFR extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      img: []
    }
  }

  componentWillMount(){
    this.context.io.run('fr:get', {id:this.props.location.state.id}, (data) => {
      this.setState({img: data});
    });
  }

  render() {
    return (
      <div>
        {this.state.img.map((el, i) => {
          let url = '/facerecognition/img/' + this.props.location.state.id + '/' + el;
          return <img key={i} src={url} width="200" />
        })}
      </div>
    )
  }
}
ModelFR.contextTypes = {
  router: React.PropTypes.object.isRequired,
	io: React.PropTypes.object
};

export default ModelFR;
