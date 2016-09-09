import { Title } from './style.js';

import React, { Component } from 'react';
import { IconButton, Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';

import Upload from './../../components/commons/upload';


class ModelFR extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      img: [],
      active: false
    };

    this.delete = this.delete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.submit = this.submit.bind(this);
  };

  delete(){
    this.context.io.run('fr:delete', {id:this.props.location.state.id}, (data) => {
      if(data){
        this.context.router.push('config');
      }
    });
  }

  actions() {
    return [
      { label: "Cancel", onClick: this.handleToggle },
      { label: "Delete", onClick: this.delete }
    ];
  }

  handleToggle(){
    this.setState({active: !this.state.active});
  }

  componentWillMount(){
    this.context.io.run('fr:get', {id:this.props.location.state.id}, (data) => {
      this.setState({img: data});
    });
  }

  submit(e){
    e.preventDefault();
    this.context.io.run('fr:update', {name: this.props.location.state.id, files: this.refs.upload.state.preview}, (res) => {
      if(res.state){
        this.context.router.push('/config')
      }
    });
  }

  render() {
    return (
      <div>
        <h2 style={Title}>
          Model: {this.props.location.state.id}
          <IconButton icon='delete' primary onClick={this.handleToggle} />
        </h2>
        {this.state.img.map((el, i) => {
          let url = '/facerecognition/img/' + this.props.location.state.id + '/' + el;
          return <img key={i} src={url} width="200" />
        })}
        <Upload ref="upload" />
        <br />
        <Button type="submit" label="Save model" raised primary onClick={this.submit} />
        <Dialog
          actions={this.actions()}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Delete Model'
        >
          <p>Are you sure to delete this model ?</p>
        </Dialog>
      </div>
    )
  }
}
ModelFR.contextTypes = {
  router: React.PropTypes.object.isRequired,
	io: React.PropTypes.object
};

export default ModelFR;
