var spawn = require("child_process").spawn;


var basePath = process.cwd();

module.exports = function(port, collections, callback){
  const ls = spawn('python', ['-u', basePath + '/visio/recognizer.py', 'http://localhost:' + port + '/', collections.join(',')]);

  ls.stdout.on('data', (data) => {
    data = JSON.parse(data);
    console.log(data);
    var keys = Object.keys(data);
    if(1 === keys.length){
      callback(data);
    }
    else{
      callback(data);
      // for
    }
  });

  // ls.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`);
  // });
  // ls.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });
  // cv.readImage(pathTmpMjpeg2jpegs.replace('{{index}}', index), function (err, im){
  //   im.detectObject(cv.FACE_CASCADE, {}, function (err, faces){
  //     if(faces && faces.length){
  //       for(var i = 0; i < collections.length; i++){
  //         var result = openBr.compareFaces('./visio/collections/' + collections[i], pathTmpMjpeg2jpegs.replace('{{index}}', index));
  //
  //         result = result.split('\n')[1].slice(12).split(' ').filter(function(e){
  //           return (e !== '');
  //         });
  //
  //         var total = 0;
  //         result.forEach(function(e){
  //           e.trim();
  //           if(parseFloat(e)){
  //             total += parseFloat(e);
  //           }
  //         });
  //
  //         total = total / result.length;
  //         if(total > 0.50){
  //           callback(null, {collection: collections[i], score: total});
  //           i = collections.length;
  //         }
  //         else{
  //           callback(null, {collection: 'unknown', score: total});
  //         }
  //       }
  //     }
  //     else{
  //       callback(null, null)
  //     }
  //   });
  // });
}
