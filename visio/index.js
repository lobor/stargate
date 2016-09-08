var cv = require('opencv');
var extract = require('jpeg-extract');
var fs = require('fs');
var openBr = require('./utils/openBR');
// var request = require('request');
function launch() {
  extract('http://localhost:8081/',(img) => {
    fs.writeFile('./img.jpg', img, function(){
      cv.readImage('./img.jpg', (err, im) => {
        im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
          if(!err){
            if(faces.length){
              for (var i=0;i<faces.length; i++){
                var x = faces[i]
                im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
              }
              im.save('./visio/detect/out.jpg');
              var result = openBr.compareFaces('./visio/collections/g/lunette.jpg', './visio/detect/out.jpg');
              if(result > 1){
                console.log('detect face =>', 'g');
              }
            }
            else{
              // console.log('not detect');
            }
            launch();
          }
          else{
            console.log(err);
          }

        });
      })
    });
  });
}
launch();
