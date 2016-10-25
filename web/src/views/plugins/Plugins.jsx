import Notify from 'notify';
import Loading from 'components/loading/Loading';
import { Link, Redirect } from 'react-router';

class Plugins extends React.Component {
  constructor(){
    super();
    this.state = {
      plugins: [],
      dialog: false,
      password: false,
      render: false,
      redirect: false
    }

    this.select = this.select.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.validate = this.validate.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.goTo = this.goTo.bind(this);
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
          });

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
      plugin.installed = true;
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

  goTo(name){
    this.setState({ redirect: '/config/' + name })
  }

  render(){
    if(this.state.redirect){
      return (
        <Redirect to={this.state.redirect}/>
      )
    }

    const actions = [
       <Ui.FlatButton
         label={Lang.cancel}
         primary={true}
         onTouchTap={this.cancel}
       />,
       <Ui.FlatButton
         label={Lang.submit}
         primary={true}
         keyboardFocused={true}
         onTouchTap={this.validate}
       />,
     ];

    return (
      <Loading render={this.state.render}>
        <Ui.Dialog
          title={Lang.passwordSudo}
          actions={actions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.handleClose}
        >
        <Ui.TextField
            ref="password"
            type="password"
            hintText={Lang.yourPassword}
            floatingLabelText={Lang.yourPassword}
            onChange={this.handleValue}
          />
        </Ui.Dialog>
        <Notify ref="notification" />
        <Ui.List>
          <Ui.Subheader>{Lang.listPluginsAvailable}</Ui.Subheader>
          {this.state.plugins.map((plugin, index) => {
            let text = plugin.name + ' v' + plugin.version;
            let icon;

            if(true === plugin.installed){
              const iconButtonElement = (
                <Ui.IconButton touch={true}>
                  <Ui.FontIcon className="material-icons">more_vert</Ui.FontIcon>
                </Ui.IconButton>
              );

              icon = (
                <Ui.IconMenu iconButtonElement={iconButtonElement} targetOrigin={{horizontal: 'right', vertical: 'top'}} style={{right: '15px'}}>
                  <Ui.MenuItem
                    onClick={this.goTo.bind(undefined, plugin.name)}
                    leftIcon={<Ui.FontIcon className="material-icons">settings</Ui.FontIcon>}
                    primaryText={Lang.settings}
                    />

                  <Ui.MenuItem
                    primaryText={Lang.remove}
                    leftIcon={<Ui.FontIcon className="material-icons">delete</Ui.FontIcon>}
                    onClick={this.select.bind(undefined, index, plugin.installed)}
                    />
                </Ui.IconMenu>
              );
            }
            else if (false === plugin.installed){
              icon = (
                <Ui.FontIcon className="material-icons" onClick={this.select.bind(undefined, index, plugin.installed)}>file_download</Ui.FontIcon>
              );
            }

            if(plugin.installed === 'loading'){
              icon = (<Ui.CircularProgress />);
            }

            // console.log(icon);

            return (
              <Ui.ListItem
                key={index}
                primaryText={text}
                secondaryText={plugin.description}
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
