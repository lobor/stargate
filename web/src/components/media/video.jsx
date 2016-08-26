import React, { Component } from 'react';

class Video extends Component{
  constructor(...args){
    super(...args)
    this.state = {msg:false};

    this.error = this.error.bind(this);
  }

  componentDidMount(){
    var audioCtx = new AudioContext();
    this.context.io.on('audio', function(data){
      // console.log(data);
      // var toto = new Float32Array(data);
      // audioCtx.decodeAudioData(toto, function(buffer) {
      // });
      // console.log(toto);
    });


    // var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // var source;
    //
    // source = audioCtx.createBufferSource();
    // var request = new XMLHttpRequest();
    //
    // request.open('GET', '/video/audio', true);
    //
    // request.responseType = 'arraybuffer';
    //
    // request.onload = function() {
    //   var audioData = request.response;
    //   audioCtx.decodeAudioData(audioData, function(buffer) {
    //       source.buffer = buffer;
    //
    //       source.connect(audioCtx.destination);
    //       source.loop = true;
    //
    //     },
    //
    //     function(e){"Error with decoding audio data" + e.err});
    //
    // }
    //
    // request.send(null);
    //
    // // request.addEventListener('readystatechange', function(d) {
    // //   console.log(request);
    // //     // Votre code…
    // // });
    // source.start(0);
  }

  error(e, f, r){
    this.setState({msg: 'An error has been occured'});
  }

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
Video.contextTypes = {
	io: React.PropTypes.object
};
export default Video;
