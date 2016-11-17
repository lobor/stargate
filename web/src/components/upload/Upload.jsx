import { StyleContainer, StyleContainerPreview, StyleContainerInput } from './styles.js';

class Upload extends React.Component{
  constructor(...args){
    super(...args);
    this.state = {
      images: [],
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
        if(i === len){
          if(this.props.onChange){
            this.props.onChange(this.state.preview)
          }
        }
      }.bind(this, index, file)

      if (file) {
        reader[index].readAsDataURL(file);
      }
    }

  }

  render(){
    return (
      <div style={StyleContainer}>
        <div className="container-upload" style={StyleContainerInput}>
          <input type="file" id="fileinput" multiple="multiple" className="upload" accept="image/*"  onChange={this.change.bind(this, 'img')} />
          <Ui.RaisedButton className="fake-button" label="Add picture" primary={true} />
        </div>

        <div style={StyleContainerPreview}>
          {this.state.preview.map((el, i) => {
            return (<img src={el.data} key={i} width="100" />)
          })}
        </div>
      </div>
    );
  }
}

export default Upload;
