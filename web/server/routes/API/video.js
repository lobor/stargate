export default [
	{
		'name': 'video:get',
    'dep': ['webcam', 'visio'],
		'call': function(data, fc){
			var socket = this.socket;
			this.visio.on('result', (data) => {
				socket.emit('fr:result', data);
			});

			this.visio.on('noFace', (data) => {
				socket.emit('fr:noFace', data);
			});

      fc({webcam: this.webcam});
		}
	}
];
