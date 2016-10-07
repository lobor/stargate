
class Cpu extends React.Component{
  constructor(...args){
    super(...args);
    this.state = {
      cpu: 0 + '%'
    }
	}

  componentWillMount(){
    this.context.io.run('cpu');
    this.context.io.on('cpu:change', (data) => {
      var st = {
        cpu: ''
      };
      st.cpu = Math.floor(data.cpu) + '%';
      this.setState(st);
    });
  }

  componentWillUnmount(){
    this.context.io.off('cpu:change');
    this.context.io.run('cpu:stop');
  }


  render(){
    return (
      <Ui.Card>
        <Ui.CardTitle title="CPU Usage" />
        <Ui.CardText>
          {this.state.cpu}
        </Ui.CardText>
      </Ui.Card>
    );
  }
}

Cpu.contextTypes = {
	io: React.PropTypes.object
};

export default Cpu;
