var cv = require('opencv');
var extract = require('jpeg-extract');
// var request = require('request');
var i = 0;
function launch(index) {
  extract('http://localhost:8081/',(img) => {
    try{
      cv.readImage(img, (err, im) => {
        if(!err){
          im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
            if(!err){
              if(faces.length){
                console.log('detect', index);
                for (var i=0;i<faces.length; i++){
                  var x = faces[i]
                  im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
                }
                im.save('./visio/detect/out' + index + '.jpg');
              }
              else{
                // console.log('not detect');
              }

              launch(index + 1);
            }
            else{
              console.log(err);
            }

          });
        }
        else{
          console.log(err);
        }
      })
    }
    catch(e){
      launch(index + 1);
    }
  });

}
launch(i);
