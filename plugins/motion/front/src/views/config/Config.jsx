import FormMotion from './../../components/forms/motion/config.jsx';
class Config extends React.Component{
	constructor(){
		super();
		this.state = {
      webcam: {
        stream: false,
        connect: false,
        record: false,
        path: ''
      },
      tabActive: 0
    };

    this.handleTabChange = this.handleTabChange.bind(this);
	}

	handleTabChange(index){
		this.setState({tabActive: index});
	}
	render(){
		return (
      <FormMotion />
		);
	}
}

export default Config;
