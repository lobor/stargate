import React, { Component } from 'react';

class Video extends Component{
  constructor(...args){
    super(...args)
    this.state = {msg:false};

    this.error = this.error.bind(this);




    var request = new XMLHttpRequest();
    request.open("GET", "/video/audio", true);
    request.responseType = "arraybuffer";
    
    var toto = this;
    request.onload = function() {
      console.log(5);
      var Data = request.response;
      toto.process(Data);
    };

    request.send();
  }

  process(Data) {
    console.log(3);
    source = context.createBufferSource(); // Create Sound Source
    context.decodeAudioData(Data, function(buffer){
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(context.currentTime);
    })
  }

  error(e, f, r){
    this.setState({msg: 'An error has been occured'});
  }

  // componentDidMount(){
  //   this.refs.audio.addEventListener('play', () => {
  //     console.log(this.refs.audio.played);
  //     console.log(this.refs.audio.networkState);
  //     console.log(this.refs.audio.duration);
  //   })
  // }

  render(){
    let width = {
      width: '100%',
      'maxWidth': '400px',
    };
    let style = {
      background: 'black',
      display: 'block',
      margin: 'auto',
      marginTop: '25px',
      color: 'red',
      height: '300px',
      textAlign: 'center'
    };
    Object.assign(style, width);
    return (
      <div>
        <img style={style} alt={this.state.msg} src='/video/cam' onError={this.error} />
      </div>
    )
  }
}

export default Video;
