var mjpeg2jpegs = require("./utils/mjpeg2jpeg");
var basePath = process.cwd();
var pathTmpMjpeg2jpegs = basePath + '/tmp/mjpeg2jpegs{{index}}.jpg';

var openBr = require('./utils/openBR');

var http = require("http");
var fs = require("fs");
var cv = require("opencv");


module.exports = function(index, collections, callback){
  cv.readImage(pathTmpMjpeg2jpegs.replace('{{index}}', index), function (err, im){
    im.detectObject(cv.FACE_CASCADE, {}, function (err, faces){
      if(faces && faces.length){
        for(var i = 0; i < collections.length; i++){
          var result = openBr.compareFaces('./visio/collections/' + collections[i], pathTmpMjpeg2jpegs.replace('{{index}}', index));

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

          total = total / result.length;
          if(total > 0.50){
            callback(null, {collection: collections[i], score: total});
            i = collections.length;
          }
          else{
            callback(null, {collection: 'unknown', score: total});
          }
        }
      }
      else{
        callback(null, null)
      }
    });
  });
}
