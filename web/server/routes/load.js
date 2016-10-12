module.exports = {
	api: [
		// Routes for socket API
		require('./API/user'),
		require('./API/plugins'),
		// require('./API/cpu'),
	],
	front: [
		// Route for render express Page

		// Not modified, it's route of index
		require('./front/index')
	]
};
