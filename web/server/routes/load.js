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
		require('./API/user'),
		// require('./API/cpu'),
	],
	front: [
		// Page

		// Not modified, it's route of index
		require('./front/index')
	]
};
