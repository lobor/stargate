var cv = require('opencv');
var fs = require('fs');
var openBr = require('./utils/openBR');


var mjpeg2jpegs = require("mjpeg2jpegs");
var http = require("http");


http.request({
    port: "8081",
}, mjpeg2jpegs(function (res) {
    // res.on("imageHeader", function (header) {
    //     console.log("Image header: ", header);
    // });
    var onPasse = true;
    res.on("imageData", function (data) {
        if(onPasse){
          onPasse = false;
          // console.log("Image data: ", data);
          fs.writeFile('./img.jpg', data, function(){
            console.log('fin ecriture', 'analyse image');
            cv.readImage('./img.jpg', (err, im) => {
              im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
                if(faces.length){
                  console.log('face found');
                  for (var i=0;i<faces.length; i++){
                    var x = faces[i]
                    im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
                  }
                  im.save('./visio/detect/out.jpg');
                  var result = openBr.compareFaces('./visio/collections/g/sans_lunette.jpg', './visio/detect/out.jpg');
                  console.log(result);
                  if(result > 1){
                    console.log('detect face =>', 'g');
                  }
                }
                else{
                  // console.log('not detect');
                }
                onPasse = true;
              });
            })
          });
        }
    });
    // res.on("imageEnd", function () {
    //     console.log("Image end");
    // });
})).end();


// // var request = require('request');
// function launch() {
//   extract('http://localhost:8081/',(img) => {
//     fs.writeFile('./img.jpg', img, function(){
      // cv.readImage('./img.jpg', (err, im) => {
      //   im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
      //     if(!err){
      //       if(faces.length){
      //         for (var i=0;i<faces.length; i++){
      //           var x = faces[i]
      //           im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
      //         }
      //         im.save('./visio/detect/out.jpg');
      //         var result = openBr.compareFaces('./visio/collections/g/lunette.jpg', './visio/detect/out.jpg');
      //         if(result > 1){
      //           console.log('detect face =>', 'g');
      //         }
      //       }
      //       else{
      //         // console.log('not detect');
      //       }
      //       launch();
      //     }
      //     else{
      //       console.log(err);
      //     }
      //
      //   });
      // })
//     });
//   });
// }
// launch();
