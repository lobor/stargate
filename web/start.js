require('babel/register');

var Server = require('./server/server');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var motion = require('./server/utils/motion');
var toolbox = require('./server/utils/toolbox');
var fs = require('fs');
var os = require('os');

var ConfigEnv = require(process.cwd() + '/config/web/environnement');
var ConfigAdmin = require(process.cwd() + '/config/web/admin');
var ConfigMotion = require(process.cwd() + '/config/motion/confcam');
Object.assign(process.env, ConfigEnv);

let server = new Server();


exec('ls /dev/video*', (error, stdout, stderr) => {
	let webCam = stdout.split('\n'); // output => ['/dev/video0', '/dev/video1', '']

	// Hack last item
	webCam.pop();

	let config = {
		webcam: [],
		motion: new motion().setConfigPath(process.cwd() + '/tmp/'),
		toolbox: toolbox
	};

	webCam.forEach((el, i) => {
		let configJson = {};
		try {
			configJson = require(process.cwd() + '/config/motion/camera/cam' + i + '.js')
		} catch (e) {
			configJson = {
				videodevice: el,
				stream_port: '808' + (i + 1),
				stream_localhost: 'on',
				target_dir: process.cwd() + '/visio/detect/camera' + i
			};

			config.toolbox.writeCameraJs(configJson, i)
		}

		config.webcam.push({
			videodevice: el,
			stream_port: configJson.stream_port,
			target_dir: configJson.target_dir
		});

		config.motion.addCam(configJson);


		// configJson = JSON.stringify(configJson)
		// 	.replace(/({|}|'|")/g, '')
		// 	.replace(/:/g, ' ')
		// 	.replace(/,/g, os.EOL);
		//
		// fs.writeFileSync(process.cwd() + '/tmp/cam' + i + '.conf', configJson);
		//
		// ConfigMotion.thread.push(process.cwd() + '/tmp/cam' + i + '.conf');
	});

	// create directory tmp if not exist
	try {
    fs.accessSync(process.cwd() + '/tmp/', fs.F_OK);
	} catch (e) {
    fs.mkdirSync(process.cwd() + '/tmp/', 0777)
	}

	config
		.motion
		.setConfig(ConfigMotion, ConfigAdmin.user + ':' + ConfigAdmin.password)
		.build();

	if(!error){
		var ls = spawn('gst-launch-1.0', [
			'v4l2src', 'device=/dev/video0',
			'!', 'facedetect',
			'!', 'motioncells',
			'!', 'videoconvert',
			'!', 'videoscale',
			'!', 'video/x-raw,width=320,height=240',
			'!', 'theoraenc',
			'!', 'oggmux',
			'!', 'tcpserversink', 'host=127.0.0.1', 'port=9000'
		])

		ls.stdout.on('data', (data) => {
		  console.log(`stdout: ${data}`);
		});

		ls.stderr.on('data', (data) => {
			// console.log(data.toString('utf8').match(/facedetect/g));
			if(data.toString('utf8').match(/gst_bin_change_state_func/g) && data.toString('utf8').match(/facedetect/g))
				// console.log(data.toString('utf8'));
		  	console.log(`stderr: ${data}`);
		});
		//
		ls.on('close', (code) => {
		  console.log(`child process exited with code ${code}`);
		});
		// config.motion.start();
	}

	process.on('exit', function (){
	  config.motion.stop();
	});

	server
		.set(config)
		.loadRoutes()
		.start();

});
