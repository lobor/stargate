import Loading from 'components/loading/Loading';

class LastLogin extends React.Component{
  constructor(...args){
    super(...args);
    this.state = {
      date: [],
      render: false
    };
	}

  componentWillMount(){
    this.context.io.run('lastLogin', {}, (data) => {
      this.setState({date: data.lastLogin, render: true});
    });
  }


  render(){
    return (
      <Ui.Card>
        <Ui.CardTitle title="Last Login" />
        <Ui.CardText>
          <Loading render={this.state.render}>
            <Ui.List>
              {this.state.date.map(function(date, i){
                return <Ui.ListItem key={i} primaryText={date} />;
              })}
            </Ui.List>
          </Loading>
        </Ui.CardText>
      </Ui.Card>
    );
  }
}

LastLogin.contextTypes = {
	io: React.PropTypes.object
};

export default LastLogin;
