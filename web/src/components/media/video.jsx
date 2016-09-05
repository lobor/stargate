import React, { Component } from 'react';
import { Width, Style } from './style';



// navigator.getUserMedia = ( navigator.getUserMedia ||
//                        navigator.webkitGetUserMedia ||
//                        navigator.mozGetUserMedia ||
//                        navigator.msGetUserMedia);

class Video extends Component{
  constructor(...args){
    super(...args)
    this.state = {msg:false};

    this.error = this.error.bind(this);
  }

  componentDidMount(){

    // navigator.getUserMedia({video: false, audio: true}, (stream) => {
    //   console.log(stream);
    //   console.log(this.refs.audio);
    //   this.refs.audio.src = window.URL.createObjectURL(stream);
    //   this.refs.audio.play();
    // }, function(err){console.log("The following error occured: " + err);});


    // var audioCtx = new AudioContext();
    // var source;
    // var first = false;
    // // source = audioCtx.createBufferSource();
    // this.context.io.on('audio', function(data){
    //   if(!first){
    //     source = audioCtx.createBufferSource();
    //     first = true;
    //     audioCtx.decodeAudioData(data, function(buffer) {
    //       if(buffer){
    //         source.buffer = buffer;
    //
    //         source.connect(audioCtx.destination);
    //         source.loop = true;
    //         source.start();
    //       }
    //
    //     });
    //   }
    // });


    // var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // var source;
    //
    // var request = new XMLHttpRequest();
    // //
    // request.open('GET', '/video/audio', true);
    // //
    // request.responseType = 'arraybuffer';
    // //
    // request.onreadystatechange = function() {
    //   // console.log('onload');
    //   var audioData = request.response;
    //   if(!first){
    //     first = true;
    //     console.log(request);
    //   }
    //   // console.log(arguments);
    //   if(audioData)
    //     audioCtx.decodeAudioData(audioData, function(buffer) {
    //         source.buffer = buffer;
    //
    //         source.connect(audioCtx.destination);
    //         source.loop = true;
    //         source.start(0);
    //       },
    //
    //       function(e){}
    //     );
    //
    // }
    // //
    // request.send();
    //
    // // request.addEventListener('readystatechange', function(d) {
    // //   console.log(request);
    // //     // Votre code…
    // // });838/16/1
  }

  error(){
    this.setState({msg: 'An error has been occured'});
  }

  render(){
    Object.assign(Style, Width);
    let url = '/video/cam?port=' + this.props.port
    return (
      <div>
        <img style={Style} alt={this.state.msg} src={url} onError={this.error} />
      </div>
    )
    // <audio ref="audio" controls></audio>
  }
}
Video.contextTypes = {
	io: React.PropTypes.object
};
export default Video;
