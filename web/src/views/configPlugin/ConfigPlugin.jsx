import Loading from 'components/loading/Loading';
import { FormStyle, BoolStyle, TextStyle } from './style.js';

class ConfigPlugin extends React.Component {
	constructor(){
		super();
		this.state = {
			name: '',
			config: {},
			render: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount(){
		this.context.io.run(this.props.params.plugin + ':config', {}, (data) => {
			let state = {
				name: data.name,
				doc: data.doc,
				config: data[data.name],
				render: true
			};
			this.setState(state)
		});
	}

	handleSubmit(e){
		e.preventDefault();
		e.stopPropagation();
		this.setState({ render: false});
		this.context.io.run(this.props.params.plugin + ':config:post', this.state.config, (data) => {
			let state = {
				name: data.name,
				doc: data.doc,
				config: data[data.name],
				render: true
			};
			this.setState(state)
		});
	}

	handleChange(name, event, value){
		let config = this.state.config;

		config[name] = (value) ? 'on' : 'off';

		this.setState({ config: config });
	}

	render() {
		var componentsBool = [], componentsText = [], i = 0
		for(let key in this.state.config){
			let config = this.state.config[key];

			if(config === 'on' || config === 'off'){
				componentsBool.push((
					<Ui.Toggle label={key} key={i} onToggle={this.handleChange.bind(this, key)} defaultToggled={(config === 'on') ? true : false} style={BoolStyle} name={key} />
				));
			}
			else{
				componentsText.push((
					<Ui.TextField value={config} key={i} name={key} floatingLabelText={key}  />
				));
			}
			i++;
		}


    return (
			<Loading render={this.state.render} >
				<h1>{this.state.name} <Ui.Subheader><a href={this.state.doc} target="_blank" title="">Doc</a></Ui.Subheader></h1>
				<form onSubmit={this.handleSubmit}>
					<div style={FormStyle}>
						{componentsBool.map((component) => {
							return (component)
						})}

						{componentsText.map((component) => {
							return (component)
						})}
					</div>
					<Ui.RaisedButton type="submit" label="Save" primary={true} fullWidth={true} />
				</form>
			</Loading>
    )
	}
}

ConfigPlugin.contextTypes = {
  io: React.PropTypes.object
};

export default ConfigPlugin;
