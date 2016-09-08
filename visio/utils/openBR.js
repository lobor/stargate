var spawn = require('child_process').spawn
var spawnSync = require('child_process').spawnSync

function compareFaces(fileA, fileB, fc){
  // console.log(spawnSync('br', ['-algorithm', 'FaceRecognition', '-compare', fileA, fileB]).stdout.toString('utf8'));
  return spawnSync('br', ['-algorithm', 'FaceRecognition', '-compare', fileA, fileB]).stdout.toString('utf8');
}

module.exports = {
  compareFaces: compareFaces
}
