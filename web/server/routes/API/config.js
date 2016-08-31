var fs = require('fs');

export default [
	{
		'name': 'config',
		'dep': ['webcamRunning', 'webcamConnect', 'motion'],
		'call': function(data, fc){
			let confMotion = this.motion.getConfig();
			fc({
				"response": {
					'webcam': {
						'stream': this.webcamRunning,
						'connect': this.webcamConnect,
						'record_video': confMotion.ffmpeg_output_movies,
						'record_picture': confMotion.output_pictures,
						'path': confMotion.target_dir
					}
				}
			});
		}
	},
	{
		'name': 'config:motion',
		'dep': ['webcamRunning', 'webcamConnect', 'motion'],
		'call': function(data, fc){
			let confMotion = this.motion.getConfig();
			fc({
				"response": {
					'stream': this.webcamRunning,
					'connect': this.webcamConnect,
					'record_video': ('on' === confMotion.ffmpeg_output_movies) ? true : false,
					'record_picture': ('on' === confMotion.output_pictures) ? true : false,
					'path': confMotion.target_dir
				}
			});
		}
	},
	{
		'name': 'config:motion:post',
		'dep': ['webcamRunning', 'motion'],
		'call': function(data, fc){
			let confMotion = this.motion.getConfig();

			confMotion.target_dir = data.path;
			confMotion.ffmpeg_output_movies = (data.record_video) ? 'on' : 'off';
			confMotion.output_pictures = (data.record_picture) ? 'on' : 'off';

			fs.writeFile(process.cwd() + '/config/motion/confcam.js', 'module.exports = ' + JSON.stringify(confMotion) + ';', (err) => {
				if(err){
					fc({response: false});
				}
				else{
					this.motion.setConfig(confMotion, process.cwd() + '/tmp/confcam.conf');
					if(this.webcamRunning){
						this.motion.stop();
						this.motion.start();
					}

					fc({response: true});
				}
			});
		}
	},
	{
		'name': 'config:post',
		'dep': ['webcamRunning', 'webcamConnect', 'motion'],
		'call': function(data, fc){
			if(data.name && undefined !== data.value){
				let config = this.motion.getConf();
				switch (req.body.name) {
					case 'webcam':
						if(req.body.value){
							this.motion.start();
							this.webcamRunning = true;
						}
						else if(this.webcamRunning){
							this.motion.stop();
							this.webcamRunning = false;
						}
						break;
					case 'path':
						config.target_dir = req.body.value;
						break;
				}

				fc({
					"response": {
						'webcam': {
							'stream': this.webcamRunning,
							'connect': this.webcamConnect,

						}
					},
				});
			}
			else{
				fc({
					"response":false,
					"errors": {
						"message": "You should be connected for to have access",
						"redirect":"/user/login"
					}
				});
			}
		}
	},
];
