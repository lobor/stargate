import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';

class Upload extends Component{
  constructor(...args){
    super(...args);
    this.state = {
      images: [''],
      preview: []
    }
	}

  change(name, value, e){
    this.setState({images: value.target.files, preview: []});

    var file;
    var reader = [];
    var index = 0;

    for(var i = 0, len = value.target.files.length; i < len; i++){
      file = value.target.files[i];
      reader.push(new FileReader());
      index = reader.length - 1;
      reader[index].onloadend = function(t, fileReady) {
        let preview = this.state.preview;

        preview.push({
          data: reader[t].result,
          name: fileReady.name
        })
        this.setState({preview: preview});
      }.bind(this, index, file)

      if (file) {
        reader[index].readAsDataURL(file);
      }
    }
  }

  render(){
    return (
      <div>
        <div className="container-upload">
          <input type="file" id="fileinput" multiple="multiple" className="upload" accept="image/*"  onChange={this.change.bind(this, 'img')} />
          <Button className="fake-button" label="Add picture" raised primary />
        </div>
        <br />
        <div>
          {this.state.preview.map((el, i) => {
            return (<img src={el.data} key={i} width="100" />)
          })}
        </div>
      </div>
    );
  }
}

export default Upload;
