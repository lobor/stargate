// module.exports = [
// 	// API
// 	require('./API/config'),
// 	require('./API/user'),
// 	require('./API/detect'),

// 	// Page
// 	require('./front/video'), // video











// 	// Not modified, it's route of index
// 	require('./front/index')
// ];

module.exports = {
	api: [
		// API
		// require('./API/config'),
		require('./API/user'),
		// require('./API/cpu'),
		require('./API/detect'),
		require('./API/video'),
		require('./API/facerecognition'),
	],
	front: [
		// Page
		// require('./front/video'), // video
		require('./front/facerecognition/img'), // video


		// Not modified, it's route of index
		require('./front/index')
	]
};
