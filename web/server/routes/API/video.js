export default [
	{
		'name': 'video:get',
    'dep': ['webcam'],
		'call': function(data, fc){
      fc({webcam: this.webcam});
		}
	}
];
