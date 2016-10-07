
class LastLogin extends React.Component{
  constructor(...args){
    super(...args);
    this.state = {
      date: []
    }

    this.context.io.run('lastLogin', {}, (data) => {
      this.setState({date: data.lastLogin});
    });
	}


  render(){
    return (
      <Ui.Card>
        <Ui.CardTitle title="Last Login" />
        <Ui.CardText>
          <Ui.List>
            {this.state.date.map(function(date, i){
              return <Ui.ListItem key={i} primaryText={date} />;
            })}
          </Ui.List>
        </Ui.CardText>
      </Ui.Card>
    );
  }
}

LastLogin.contextTypes = {
	io: React.PropTypes.object
};

export default LastLogin;
