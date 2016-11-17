// import { style } from './style';

class Lightbox extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			display: 'none',
			justifyContent: 'center',
			alignItems: 'center',
			zIndex: '10001',
			background: 'rgba(31, 30, 30, 0.71)'
		}

		this.onClick = this.onClick.bind(this);
		this.close = this.close.bind(this);
	}

	onClick(...args) {
		this.setState({
			display: 'flex'
		});

		if (this.props.onClick) {
			this.props.onClick(...args);
		}
	}

	close(){
		this.setState({
			display: 'none'
		});
	}

	render() {
		return (
			<div>
				<div style={this.state} onClick={this.close}>
					<Ui.Paper zDepth={5} rounded={false} >
						<img src={this.props.src} style={{
							maxWidth: '100%',
							maxHeight: '100%',
							display: 'block'
						}}/>
					</Ui.Paper>
				</div>
				<Ui.Avatar src={this.props.src} size={this.props.size} onClick={this.onClick} style={this.props.style}/>
			</div>
		);
	}
}

export default Lightbox;
