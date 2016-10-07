import Notify from 'notify';

class Config extends React.Component{
  constructor(...args){
		super(...args);
    this.state = {
      webcam: [],
      tabActive: 0
    };

    this.handleTabChange = this.handleTabChange.bind(this);
	}

  handleTabChange(index){
    this.setState({tabActive: index});
  }

  componentWillMount(){
    this.context.io.run('config:motion', {}, (res) => {
      if(res){
        this.setState(res);
      }
      else{
        this.context.router.push('/user/login');
      }
    });
  }

  handleChange(name, index, value) {
    if(typeof value !== 'object'){
      let webcam = this.state.webcam;
      webcam[index][name] = value;
      this.setState({webcam: webcam});
    }
    else{
      this.setState({[name]: index});
    }
  }

	submit(index, e){
    if(!e){
      e = index;
    }
    e.preventDefault();
    this.context.io.run('config:motion:post', this.state, (res) => {
      if(res.response){
        this._notify.show({
          msg: 'Has been saved',
          type: 'success'
        });
      }
      else{
        this._notify.show({
          msg: 'An error has been occured',
          type: 'error'
        });
      }
    });
	}

  render(){
    return (
      <Ui.Tabs>
        <Ui.Tab label='General'>
          <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this)}>
            <Ui.List>
              <Ui.Divider />
              <Ui.ListItem
                primaryText='Record video'
                secondaryText='Record on motion detection'
                leftIcon={<Ui.FontIcon className="fiber-manual-record" />}
                rightToggle={<Ui.Toggle key="record_video" toggled={this.state.record_video} onToggle={this.handleChange.bind(this, 'record_video')} />}
              />
              <Ui.Divider />
              <Ui.ListItem
                primaryText='Record picture'
                secondaryText='Record on motion detection'
                leftIcon={<Ui.FontIcon className="fiber-manual-record" />}
                rightToggle={<Ui.Toggle key="record_picture" toggled={this.state.record_picture} onToggle={this.handleChange.bind(this, 'record_picture')} />}
              />
              <Ui.Divider />
            </Ui.List>
            <Ui.RaisedButton type="submit" label="Save" primary />
          </form>
        </Ui.Tab>
        {this.state.webcam.map((el, i) => {
          let name = 'Camera ' + (i + 1)
          return (
            <Ui.Tab label={name} key={i + 1}>
              <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this, i)}>
                <Ui.List>
                  <Ui.ListItem
                    primaryText='Path where save file'
                    leftIcon={<Ui.FontIcon className="folder" />}
                    secondaryText={
                      <Ui.TextField type='text' key="path" label='/tmp/motion' onChange={this.handleChange.bind(this, 'target_dir', i)} value={this.state.webcam[i].target_dir} />
                    }
                  />
                  <Ui.Divider />
                </Ui.List>
                <Ui.RaisedButton type="submit" label="Save" primary />
              </form>
            </Ui.Tab>
          )
        })}
      </Ui.Tabs>
    );
  }
}

Config.contextTypes = {
	io: window.React.PropTypes.object
};

export default Config;
