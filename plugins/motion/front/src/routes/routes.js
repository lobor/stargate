import Config from 'views/config/Config.jsx';
import Video from 'views/video/Video.jsx';

module.exports = [
	{
		pattern: '/motion/config',
		component: Config,
		name: 'motion_config'
	},
	{
		pattern: '/camera',
		component: Video,
		name: 'motion_camera'
	}
]
