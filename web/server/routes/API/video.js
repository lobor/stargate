export default [
	{
		'name': 'video:get',
    'dep': ['webcam', 'visio'],
		'call': function(data, fc){
			var socket = this.socket;
			this.visio.on('detect', (data) => {
				socket.emit('video:detect', data);
			});

      fc({webcam: this.webcam});
		}
	}
];
