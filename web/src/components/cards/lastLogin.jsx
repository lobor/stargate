import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

class LastLogin extends Component{
  constructor(...args){
    super(...args);
    this.state = {
      date: 0
    }

    this.context.io.run('lastLogin', {}, (data) => {
      this.setState({date: data.lastLogin})
    });
	}


  render(){
    return (
      <Card>
        <CardTitle title="Last Login" />
        <CardText>
          {this.state.date}
        </CardText>
      </Card>
    );
  }
}

LastLogin.contextTypes = {
	io: React.PropTypes.object
};

export default LastLogin;
