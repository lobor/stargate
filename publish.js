var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path'),
    spawn = require('child_process').spawn;

// Instantiate a Mocha instance.
var mocha = new Mocha();

var testDir = './test/test'

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
    console.log('Compile js file');
    let git = spawn('npm', ['run', 'build:js']);

    git.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    git.stderr.on('data', (data) => {
      console.log(`${data}`);
    });

    git.on('close', (code) => {
      if(0 === code){
        console.log('Commit file');
        let git = spawn('git', ['commit', '-a', '-m', '"Commit via publish file, after test and min js file"']);

        git.stdout.on('data', (data) => {
          console.log(`${data}`);
        });

        git.stderr.on('data', (data) => {
          console.log(`${data}`);
        });

        git.on('close', (code) => {
          if(0 === code){
            console.log('Push');
            let git = spawn('git', ['push', 'https://lobor@github.com/lobor/stargate.git']);

            git.stdout.on('data', (data) => {
              console.log(`${data}`);
            });

            git.stderr.on('data', (data) => {
              console.log(`${data}`);
            });

            git.on('close', (code) => {
              if(0 === code){
                process.exit();
              }
            });
          }
        });
      }
    });
  }
});
