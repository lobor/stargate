// var exec = require('child_process').exec;
// console.log(3);
// var electron = require('electron');
//
//
// app.on('ready', function(){
//   console.log(3);
//   var tracking = require('tracking');
//   var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
//
//   colors.on('track', function(event) {
//     if (event.data.length === 0) {
//       // No colors were detected in this frame.
//     } else {
//       event.data.forEach(function(rect) {
//         console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
//       });
//     }
//   });
//
//   tracking.track('#myVideo', colors);
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


// var fs = require('fs');
// console.log('on passe');
// fs.writeFileSync(process.cwd() + '/visio/test.txt', 'on passe');
