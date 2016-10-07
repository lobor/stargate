
import { CardStyle, CardTitleStyle } from './style';

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
        that.setState(JSON.parse(this.response))
      }
    };
    request.open("GET", "https://raw.githubusercontent.com/lobor/stargate/update/update.json", true);
    request.send(null);
  }

  select(index, e){
    console.log(this.state.plugins[index]);
  }


  render() {
    return (
      <Ui.List>
        <Ui.Subheader>List plugins available</Ui.Subheader>
        {this.state.plugins.map((plugin, index) => {
          let text = plugin.name + ' v' + plugin.version;
          // icone => delete
          return (
            <Ui.ListItem
              key={index}
              primaryText={text}
              secondaryText={plugin.description}
              onClick={this.select.bind(undefined, index)}
              rightIcon={<Ui.FontIcon className="material-icons">file_download</Ui.FontIcon>}
              secondaryTextLines={2}
            />
          )
        })}
      </Ui.List>
    )
  }
}


export default Plugins;
