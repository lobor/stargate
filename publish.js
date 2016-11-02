var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path'),
    spawn = require('child_process').spawn;

// Instantiate a Mocha instance.
var mocha = new Mocha();

var testDir = './test'

// Add each .js file to the mocha instance
fs
  .readdirSync(testDir)
  .filter(function(file){
    // Only keep the .js files
    return file.substr(-3) === '.js';

  })
  .forEach(function(file){
      mocha.addFile(
          path.join(testDir, file)
      );
  });

// Run the tests.
mocha.run(function(failures){
  process.on('exit', function () {
    process.exit(failures);  // exit with non-zero status if there were failures
  });

  if(0 === failures){
    const ls = spawn('git', ['push', 'https://lobor@github.com/lobor/stargate.git']);

    ls.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.log(`${data}`);
    });

    ls.on('close', (code) => {
      if(0 === code){
        process.exit();
      }
      // console.log(`child process exited with code ${code}`);
    });
    // process.exit();
  }
});
