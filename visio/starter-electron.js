var spawn = require('electron-spawn')
var electron = spawn('./electron-app.js', 'bar', 'baz', {
  detached: true
})
electron.stderr.on('data', function (data) {
  console.error('stderr', data.toString())
})
electron.stdout.on('data', function (data) {
  console.log('stdout',data.toString())
})
