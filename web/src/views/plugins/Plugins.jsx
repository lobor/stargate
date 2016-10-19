import Notify from 'notify';
import Loading from 'components/loading/Loading';

class Plugins extends React.Component {
  constructor(){
    super();
    this.state = {
      plugins: [],
      dialog: false,
      password: false,
      render: false
    }

    this.select = this.select.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.validate = this.validate.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  checkPluginList(){
    let request = new XMLHttpRequest();
    var that = this;
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        that.context.io.run('plugins:get', {}, (data) => {
          let listPlugins = JSON.parse(this.response);
          listPlugins.plugins.map((plugin, index) => {
            plugin.installed = false;
            if(-1 !== data.installed.indexOf(plugin.name)){
              plugin.installed = true;
            }
            return plugin;
          })

          listPlugins.render = true;
          that.setState(listPlugins);
          that._notify = that.refs.notification;
        });
      }
    };
    request.open("GET", "https://raw.githubusercontent.com/lobor/stargate/update/update.json", true);
    request.send(null);
  }

  componentWillMount(){
    this.checkPluginList()
  }

  componentDidMount(){
    this.context.io.on('askSudo', () => {
      this.setState({dialog: true});
    });
  }

  componentWillUnmount(){
    this.context.io.off('askSudo');
  }

  select(index, installed, e){
    let plugins = this.state.plugins;
    plugins[index].installed = 'loading';
    this.setState({plugins: plugins});

    if(false === installed){
      this.install(plugins, index)
    }
    else{
      this.uninstall(plugins, index)
    }
  }

  install(plugins, index){
    let plugin = plugins[index];

    this.context.io.run('plugins:install', plugin, (data) => {
      plugin.installed = true
      this.setState({plugins: plugins});
      this._notify.show({msg: 'The plugin "' + plugin.name + '" has been installed', type: 'success'});
    });
  }

  uninstall(plugins, index){
    let plugin = plugins[index];
    var event = new Event(plugin.name + ':delete');
    window.dispatchEvent(event);

    this.context.io.run('plugins:uninstall', plugin, (data) => {
      plugin.installed = false
      this.setState({plugins: plugins});
      this._notify.show({msg: 'The plugin "' + plugin.name + '" has been remove', type: 'success'});
    });
  }

  handleClose(){
    this.setState({dialog: false});
  }

  handleValue(e, value){
    this.setState({password: value});
  }

  validate(){
    this.context.io.run('askSudo:response', {password: this.state.password}, (data) => {
      if(data.success){
        this.handleClose();
      }
    });
  }

  cancel(){
    this.select(this.state.plugins.length - 1, true);
    this.handleClose();
  }

  render(){
    const actions = [
       <Ui.FlatButton
         label="Cancel"
         primary={true}
         onTouchTap={this.cancel}
       />,
       <Ui.FlatButton
         label="Submit"
         primary={true}
         keyboardFocused={true}
         onTouchTap={this.validate}
       />,
     ];


    return (
      <Loading render={this.state.render}>
        <Ui.Dialog
          title="Password sudo"
          actions={actions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.handleClose}
        >
        <Ui.TextField
            ref="password"
            type="password"
            hintText="Your passowrd"
            floatingLabelText="Your passowrd"
            onChange={this.handleValue}
          />
        </Ui.Dialog>
        <Notify ref="notification" />
        <Ui.List>
          <Ui.Subheader>List plugins available</Ui.Subheader>
          {this.state.plugins.map((plugin, index) => {
            let text = plugin.name + ' v' + plugin.version;
            let icon = (plugin.installed) ? (<Ui.FontIcon className="material-icons rotate">delete</Ui.FontIcon>) : (<Ui.FontIcon className="material-icons rotate">file_download</Ui.FontIcon>);

            if(plugin.installed === 'loading'){
              icon = (<Ui.CircularProgress />);
            }

            return (
              <Ui.ListItem
                key={index}
                primaryText={text}
                secondaryText={plugin.description}
                onClick={this.select.bind(undefined, index, plugin.installed)}
                rightIcon={icon}
                secondaryTextLines={2}
              />
            )
          })}
        </Ui.List>
      </Loading>
    );
  }
}

Plugins.contextTypes = {
  io: React.PropTypes.object
};


export default Plugins;
