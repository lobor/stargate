var fs = require('fs');

export default [
	{
		'name': 'config:motion',
		'dep': ['webcam', 'motion'],
		'call': function(data, fc){
			console.log('toto');
			fc({
				toto: 'toto'
			});
		}
	},
	// {
	// 	'name': 'config:motion',
	// 	'dep': ['webcam', 'motion'],
	// 	'call': function(data, fc){
	// 		let confMotion = this.motion.getConfig();
	// 		fc({
	// 			webcam: this.webcam,
	// 			'record_video': ('on' === confMotion.ffmpeg_output_movies) ? true : false,
	// 			'record_picture': ('on' === confMotion.output_pictures) ? true : false,
	// 		});
	// 	}
	// },
	// {
	// 	'name': 'config:motion:post',
	// 	'dep': ['webcamRunning', 'motion', 'toolbox'],
	// 	'call': function(data, fc){
	// 		var copyConfMotion = {};
	// 		var confMotion = this.motion.getConfig();
	// 		confMotion.ffmpeg_output_movies = (data.record_video) ? 'on' : 'off';
	// 		confMotion.output_pictures = (data.record_picture) ? 'on' : 'off';
	//
	// 		Object.assign(copyConfMotion, confMotion);
	// 		this.motion.setCamConfig(data.webcam);
	// 		this.toolbox.writeCameraJs(data.webcam);
	//
	//
	//
	// 		delete copyConfMotion.thread;
	// 		fs.writeFile(process.cwd() + '/config/motion/confcam.js', 'module.exports = ' + JSON.stringify(copyConfMotion) + ';', (err) => {
	// 			if(err){
	// 				fc({response: false});
	// 			}
	// 			else{
	// 				this.motion.setConfig(confMotion).build();
	// 				if(this.webcamRunning){
	// 					this.motion.stop();
	// 					this.motion.start();
	// 				}
	//
	// 				fc({response: true});
	// 			}
	// 		});
	// 	}
	// },
];
