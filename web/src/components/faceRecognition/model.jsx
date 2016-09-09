import React, { Component } from 'react';

import { List, ListItem, ListDivider } from 'react-toolbox/lib/list';
import ListSubHeader from './../toolbox/list/ListSubHeader';
import { Button } from 'react-toolbox/lib/button';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

import Notify from './../commons/notify';


class Config extends Component{
  constructor(...args){
		super(...args);
    this.state = {
      tabActive: 0,
      model: []
    };

    this.goToAdd = this.goToAdd.bind(this);
	}

  handleTabChange(index){
    this.setState({tabActive: index});
  }

  componentWillMount(){
    this.context.io.run('fr:list', {}, (res) => {
      this.setState({model: res})
    });
  }

  goToAdd(){
    this.context.router.push('/config/facerecognition/add')
  }

  goTo(id){
    this.context.router.push({
      'pathname':'/config/facerecognition/model',
      state: {id: id}
    })
  }


  render(){
    return (
      <List selectable ripple>
        <ListSubHeader caption='Models' rightActions={
          <Button type="submit" label="Add model" raised primary onClick={this.goToAdd} />
        } />

        <ListDivider />
        {this.state.model.map((e) => {
          return (
            <ListItem
              caption={e}
              key={e}
              leftIcon='perm_identity'
              onClick={this.goTo.bind(this, e)}
            />
          );
        })}
      </List>
    );
  }
}

Config.contextTypes = {
  router: React.PropTypes.object.isRequired,
	io: React.PropTypes.object
};

export default Config;
