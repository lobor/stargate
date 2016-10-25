import Loading from 'components/loading/Loading';


class Cpu extends React.Component{
  constructor(...args){
    super(...args);
    this.state = {
      render: false,
      info: 0 + '%'
    }
	}

  componentWillMount(){
    this.context.io.run('cpu');
    this.context.io.on('cpu:change', (data) => {
      var st = {};
      st.info = Math.floor(data.cpu) + '%';
      st.render = true
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
        <Ui.CardTitle title={Lang.cpuUsage} />
        <Ui.CardText>
          <Loading render={this.state.render}>
            {this.state.info}
          </Loading>
        </Ui.CardText>
      </Ui.Card>
    );
  }
}

Cpu.contextTypes = {
	io: React.PropTypes.object
};

export default Cpu;
