module.exports  = function () {
	let confMotion = this.motion.getConfig();
	return {
		"response": {
			'webcam': {
				'stream': this.webcamRunning,
				'connect': this.webcamConnect,
				'record': confMotion.ffmpeg_output_movies,
				'path': confMotion.target_dir
			}
		}
	};
}