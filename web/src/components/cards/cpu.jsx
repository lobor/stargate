import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

class Cpu extends Component{
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
      <Card>
        <CardTitle title="CPU Usage" />
        <CardText>
          {this.state.cpu}
        </CardText>
      </Card>
    );
  }
}

Cpu.contextTypes = {
	io: React.PropTypes.object
};

export default Cpu;
