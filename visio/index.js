// var exec = require('child_process').exec;
// console.log(3);
// var electron = require('electron');
//
//
// app.on('ready', function(){
//   console.log(3);
  // var tracking = require('tracking');
  // var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
  //
  // colors.on('track', function(event) {
  //   if (event.data.length === 0) {
  //     // No colors were detected in this frame.
  //   } else {
  //     event.data.forEach(function(rect) {
  //       console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
  //     });
  //   }
  // });
  //
  // tracking.track('#myVideo', colors);
// });


// exec('br -algorithm FaceRecognition -compare ' + __dirname + '/../../visio/lunette.jpg ' + __dirname + '/../../visio/sans_lunette.jpg', function(error, stdout, stderr){
//   console.log('resultat');
//   if (error) {
//     console.error(`exec error: ${error}`);
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
//   console.log('fini');
//   // callback();
// });

// var nodeunit = require('nodeunit');
// var fs = require('fs');
// var jpeg = require('jpeg-js');
// var imageHeight = 600;
// var imageWidth = 348;
//
// // var context = nodeunit.utils.sandbox(['build/tracking.js', 'build/data/eye.js', 'build/data/face.js', 'build/data/mouth.js'], {
// var context = nodeunit.utils.sandbox(['./node_modules/tracking/build/tracking.js', './node_modules/tracking/build/data/face.js'], {
//   Float32Array: Float32Array,
//   Float64Array: Float64Array,
//   Int16Array: Int16Array,
//   Int32Array: Int32Array,
//   Int8Array: Int8Array,
//   Uint8ClampedArray: Uint8ClampedArray,
//   Uint32Array: Uint32Array,
//   navigator: {},
//   tracking: {},
//   window: {}
// });
//
// var tracking = context.tracking;
// var tracker = new tracking.ObjectTracker(['face']);
// var jpegData = fs.readFileSync('./visio/collections/g/lunette.jpg');
// var rawImageData = jpeg.decode(jpegData, true);
// imageWidth = rawImageData.width;
// imageHeight = rawImageData.height;
//
// tracker.setStepSize(2);
// tracker.track(rawImageData.data, imageWidth, imageHeight);
// tracker.on('track', function(event) {
//   fs.writeFileSync(process.cwd() + '/visio/test.txt', 'on passe');
//   console.log("j'ai trouvé un visage");
// });

var faced = new Faced();
faced.detect('./visio/collections/g/lunette.jpg', function (faces, image, file) {
  if (!faces) {
    return console.log("No faces found!");
  }

  var face = sface[0];

  console.log(
    "Found a face at %d,%d with dimensions %dx%d",
    face.getX(),
    face.getY(),
    face.getWidth(),
    face.getHeight()
  );

  console.log(
    "What a pretty face, it %s a mouth, it %s a nose, it % a left eye and it %s a right eye!",
    face.getMouth() ? "has" : "does not have",
    face.getNose() ? "has" : "does not have",
    face.getEyeLeft() ? "has" : "does not have",
    face.getEyeRight() ? "has" : "does not have",
  );
});


/*
 * Test event
 */
// var fs = require('fs');
// console.log('on passe');
// fs.writeFileSync(process.cwd() + '/visio/test.txt', 'on passe');
