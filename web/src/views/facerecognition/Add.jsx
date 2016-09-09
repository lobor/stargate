

import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import Upload from './../../components/commons/upload';


class AddFR extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      name: ''
    }

    this.submit = this.submit.bind(this);
  }

  change(name, value){
    this.setState({name: value});
  }

  submit(e){
    e.preventDefault();

    this.context.io.run('fr:upload', {name: this.state.name, files: this.refs.upload.state.preview}, (res) => {
      if(res.state){
        this.context.router.push('/config')
      }
    });
  }

  render() {
    return (
      <div>
        <form>
          <Input type='text' label='Name of model' name='name' onChange={this.change.bind(this, 'name')} />
          <Upload ref="upload" />
          <br />
          <Button type="submit" label="Create model" raised primary onClick={this.submit} />
        </form>
      </div>
    )
  }
}

AddFR.contextTypes = {
  router: React.PropTypes.object.isRequired,
	io: React.PropTypes.object
};

export default AddFR;
