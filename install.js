var spawn = require('child_process').spawn;

const ls = spawn('npm', ['install'], {cwd: process.cwd() + '/plugins/motion/'});

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
