var cv = require('opencv');
var fs = require('fs');
var openBr = require('./utils/openBR');


var mjpeg2jpegs = require("./utils/mjpeg2jpeg");
var http = require("http");
var basePath = process.cwd();
var pathTmpMjpeg2jpegs = basePath + '/tmp/mjpeg2jpegs{{index}}.jpg';
var pathTmpOpenBr = basePath + '/tmp/openbr{{index}}.jpg';

export default class Visio {
  constructor(){
    this.stream = [];
    this.collections = [];
  }

  addStream(config){
    this.stream.push(config);
  }

  addCollection(collection){
    this.collections.push(collection);
  }

  start(){
    // console.log(openBr.compareFaces('./visio/collections/' + this.collections[0], 'tmp/mjpeg2jpegs0.jpg'));
    var that = this;
    this.stream.forEach((stream, index) => {
      http.request({
        hostname: 'localhost',
        port: stream.port,
      }, mjpeg2jpegs((res) => {
          var onPasse = true;
          res.on("imageData", function (data) {
            if(onPasse){
              onPasse = false;

              fs.writeFile(pathTmpMjpeg2jpegs.replace('{{index}}', index), data, function(){
                cv.readImage(pathTmpMjpeg2jpegs.replace('{{index}}', index), (err, im) => {
                  im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
                    if(faces && faces.length){
                      for(var i = 0; i < that.collections.length; i++){
                        var result = openBr.compareFaces('./visio/collections/' + that.collections[i], pathTmpMjpeg2jpegs.replace('{{index}}', index));

                        result = result.split('\n')[1].slice(12).split(' ').filter(function(e){
                          return (e !== '');
                        });

                        var total = 0;
                        result.forEach(function(e){
                          e.trim();
                          if(parseFloat(e)){
                            total += parseFloat(e);
                          }
                        });

                        if(total / result.length > 0.70){
                          console.log('moi', total / result.length, that.collections[i]);
                          i = that.collections.length;
                        }

                        // if(result > 1){
                        //   console.log('detect face =>', collection);
                        // }
                      }
                    }
                    onPasse = true;
                  });
                })
              });
            }
          });
      })).end();
    })
  }
}
