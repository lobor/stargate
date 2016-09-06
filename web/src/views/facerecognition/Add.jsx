
import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import Notify from './../../components/commons/notify';


class AddFR extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      name: '',
      images: [],
      preview: []
    }

    this.submit = this.submit.bind(this);
  }

  change(name, value, e){
    if(name === 'name'){
      this.setState({name: value});
    }
    else{
      this.setState({images: value.target.files, preview: []});

      var file;
      var reader = [];
      var index = 0;

      for(var i = 0, len = value.target.files.length; i < len; i++){
        file = value.target.files[i];
        reader.push(new FileReader());
        index = reader.length - 1;
        reader[index].onloadend = function(t, fileReady) {
          let toto = this.state.preview;

          toto.push({
            data: reader[t].result,
            name: fileReady.name
          })
          this.setState({preview: toto});
        }.bind(this, index, file)

        if (file) {
          reader[index].readAsDataURL(file);
        }
      }
    }
  }

  componentDidMount(){
    this._notify = this.refs.notification;
  }

  submit(e){
    e.preventDefault();
    this.context.io.run('fr:upload', {name: this.state.name, files: this.state.preview}, (res) => {
      if(res.state){
        this._notify.addNotify({
          msg: 'Has been saved',
          type: 'success'
        });
        this.context.router.push('/config')
      }
    });
  }

  render() {
    return (
      <div>
        <Notify ref="notification" />
        <form>
          <Input type='text' label='Name of model' name='name' onChange={this.change.bind(this, 'name')} />
          <div className="container-upload">
            <input type="file" id="fileinput" multiple="multiple" className="upload" accept="image/*"  onChange={this.change.bind(this, 'img')} />
            <Button className="fake-button" label="Add picture" raised primary onClick={this.goToAdd} />
          </div>
          {this.state.preview.map((el, i) => {
            return (<img src={el.data} key={i} width="100" />)
          })}
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
