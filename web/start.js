require('babel/register');

var Server = require('./server/server');

var exec = require('child_process').exec;
var motion = require('./server/utils/motion');
var toolbox = require('./server/utils/toolbox');
var fs = require('fs');
var os = require('os');
var Visio = require(process.cwd() + '/visio/visio');

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
		toolbox: toolbox,
		visio: new Visio()
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

		config.webcam.forEach((cam)=>{
			config.visio.addStream({port: cam.stream_port});
		})
		config.visio.setPathCollection(process.cwd() + '/visio/collections/');

		config.motion.on('start',function(){
			config.visio.start();
		})

		config.motion.start();
	}

	process.on('exit', function (){
	  config.motion.stop();
	});




	// visio.start();

	server
		.set(config)
		.loadRoutes()
		.start();
});
