const App = window.App;
console.log(App);
class ConfigPlugin extends React.Component {
	constructor(...args){
		super(...args);
		console.log(this);
		console.log(App);
		// this.state.config = window.App.state.config[this.params.plugin];
	}



	render() {
    return (
      <div>Config plugin</div>
    )
	}
}
export default ConfigPlugin;
