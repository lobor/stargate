export default [
	{
		'url': '/api/config',
		'type': 'get',
		'dep': ['webcamRunning', 'webcamConnect', 'motion'],
		'call': function(req, res){
			res.status(200).json({
				"response": {
					'webcam': {
						'stream': this.webcamRunning,
						'connect': this.webcamConnect
					}
				},
			});
		}
	},
	{
		'url': '/api/config',
		'type': 'post',
		'dep': ['webcamRunning', 'webcamConnect', 'motion'],
		'call': function(req, res){
			if(req.body.name && undefined !== req.body.value){
				switch (req.body.name) {
					case 'webcam':
						if(req.body.value){
							this.motion.start();
							this.webcamRunning = true;
						}
						else if(webcamRunning){
							this.motion.stop();
							this.webcamRunning = false;
						}
						break;
				}
				res.status(200).json({
					"response": {
						'webcam': {
							'stream': this.webcamRunning,
							'connect': this.webcamConnect
						}
					},
				});
			}
			else{
				res.status(500).json({
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

