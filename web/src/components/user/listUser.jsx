import { Link, Match, Redirect } from 'react-router';
import Loading from 'components/loading/Loading';

class ListUser extends React.Component {
  constructor(){
    super();

    this.state = {
      render: false,
      users: [],
      redirect: false,
      query: false
    };

    this.goToUser = this.goToUser.bind(this);
  }

  componentWillMount(){
    this.context.io.run('user:list', {}, (data)=>{
      this.setState({render: true, users: data.users});
    })
  }

  goToUser(index){
    this.setState({ redirect: '/config/users/' + this.state.users[index].id, query: this.state.users[index] })
  }

	render() {
    if(!this.state.redirect){
      return (
        <Loading render={this.state.render}>
          <Ui.Table onRowSelection={this.goToUser}>
            <Ui.TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <Ui.TableRow>
                <Ui.TableHeaderColumn>Name</Ui.TableHeaderColumn>
                <Ui.TableHeaderColumn>Role</Ui.TableHeaderColumn>
              </Ui.TableRow>
            </Ui.TableHeader>
            <Ui.TableBody displayRowCheckbox={false}>
              {this.state.users.map((user, i)=>{
                return (
                  <Ui.TableRow key={i}>
                    <Ui.TableRowColumn>{user.username}</Ui.TableRowColumn>
                    <Ui.TableRowColumn>{user.role.name}</Ui.TableRowColumn>
                  </Ui.TableRow>
                );
              })}
            </Ui.TableBody>
          </Ui.Table>
        </Loading>
      )
    }
    else{
      return ( <Redirect to={this.state.redirect}  />)
    }
	}
}

ListUser.contextTypes = {
	io: React.PropTypes.object
};

export default ListUser;
