import Notify from 'notify';

class Plugins extends React.Component {
  constructor(){
    super();
    this.state = {
      plugins: []
    }

    this.select = this.select.bind(this);
  }

  componentWillMount(){
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
      plugins[index].installed = 'loading';
      this.setState({plugins: plugins});

      this.context.io.run('plugins:uninstall', plugins[index], (data) => {
        plugins[index].installed = false
        this.setState({plugins: plugins});
        this._notify.show({msg: 'The plugin "' + plugins[index].name + '" has been remove', type: 'success'});
      });
    }
  }


  render() {
    let html = (<Ui.CircularProgress size={80} thickness={5} />);

    if(this.state.plugins.length){
      html = (
        <Ui.List>
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
