import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

class LastLogin extends Component{
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
      <Card>
        <CardTitle title="Last Login" />
        <CardText>
          <ul>
            {this.state.date.map(function(date){
              return <li>{date}</li>;
            })}
          </ul>
        </CardText>
      </Card>
    );
  }
}

LastLogin.contextTypes = {
	io: React.PropTypes.object
};

export default LastLogin;
