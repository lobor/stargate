import Notify from 'notify';

class Plugins extends React.Component {
  constructor(){
    super();
    this.state = {
      plugins: [],
      dialog: false,
      password: false
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
    if(false === installed){
      plugins[index].installed = 'loading';
      this.setState({plugins: plugins});

      this.context.io.run('plugins:install', plugins[index], (data) => {
        plugins[index].installed = true
        this.setState({plugins: plugins});
        this._notify.show({msg: 'The plugin "' + plugins[index].name + '" has been installed', type: 'success'});
      });
    }
    else{
      var event = new Event(plugins[index].name + ':delete');
      window.dispatchEvent(event);

      plugins[index].installed = 'loading';
      this.setState({plugins: plugins});

      this.context.io.run('plugins:uninstall', plugins[index], (data) => {
        plugins[index].installed = false
        this.setState({plugins: plugins});
        this._notify.show({msg: 'The plugin "' + plugins[index].name + '" has been remove', type: 'success'});
      });
    }
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


  render() {
    let html = (<Ui.CircularProgress size={80} thickness={5} />);

    if(this.state.plugins.length){
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

      html = (
        <Ui.List>
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
      );
    }
    return html
  }
}

Plugins.contextTypes = {
  io: React.PropTypes.object
};


export default Plugins;
