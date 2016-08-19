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
						'record': confMotion.ffmpeg_output_movies,
						'path': confMotion.target_dir
					}
				}
			});
		}
	},
	// {
	// 	'url': '/api/config',
	// 	'type': 'post',
	// 	'dep': ['webcamRunning', 'webcamConnect', 'motion'],
	// 	'call': function(req, res){
	// 		if(req.body.name && undefined !== req.body.value){
	// 			let config = this.motion.getConf();
	// 			switch (req.body.name) {
	// 				case 'webcam':
	// 					if(req.body.value){
	// 						this.motion.start();
	// 						this.webcamRunning = true;
	// 					}
	// 					else if(this.webcamRunning){
	// 						this.motion.stop();
	// 						this.webcamRunning = false;
	// 					}
	// 					break;
	// 				case 'path':
	// 					config.target_dir = req.body.value;
	// 					break;
	// 			}

	// 			res.status(200).json({
	// 				"response": {
	// 					'webcam': {
	// 						'stream': this.webcamRunning,
	// 						'connect': this.webcamConnect,

	// 					}
	// 				},
	// 			});
	// 		}
	// 		else{
	// 			res.status(500).json({
	// 				"response":false,
	// 				"errors": {
	// 					"message": "You should be connected for to have access",
	// 					"redirect":"/user/login"
	// 				}
	// 			});
	// 		}
	// 	}
	// },
];
