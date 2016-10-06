// import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

// import Notify from './../../commons/notify';
// require('react');
// import { Button } from 'react-toolbox/lib/button';
// import Input from 'react-toolbox/lib/input';
// import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
// import Switch from 'react-toolbox/lib/switch';
// import FontIcon from 'react-toolbox/lib/font_icon';
// import Dropdown from 'react-toolbox/lib/dropdown';
//
// import {Tab, Tabs} from 'react-toolbox/lib/tabs';

class Config extends React.Component{
  constructor(...args){
		super(...args);
    this.state = {
      webcam: [],
      tabActive: 0
    };

    this.handleTabChange = this.handleTabChange.bind(this);
	}

  handleTabChange(index){
    this.setState({tabActive: index});
  }

  // componentWillMount(){
  //   this.context.io.run('config:motion', {}, (res) => {
  //     if(res){
  //       this.setState(res);
  //     }
  //     else{
  //       this.context.router.push('/user/login');
  //     }
  //   });
  // }

  componentDidMount(){
    console.log(this);
  }

  handleChange(name, index, value) {
    if(typeof value !== 'object'){
      let webcam = this.state.webcam;
      webcam[index][name] = value;
      this.setState({webcam: webcam});
    }
    else{
      this.setState({[name]: index});
    }
  }

	submit(index, e){
    if(!e){
      e = index;
    }
    e.preventDefault();
    this.context.io.run('config:motion:post', this.state, (res) => {
      // if(res.response){
      //   this._notify.addNotify({
      //     msg: 'Has been saved',
      //     type: 'success'
      //   });
      // }
      // else{
      //   this._notify.addNotify({
      //     msg: 'An error has been occured',
      //     type: 'error'
      //   });
      // }
    });
	}


  // render(){
  //   return (
  //     <div></div>
  //   );
  // }
  render(){
    return (
      <RaisedButton label="Save" primary />
    );
  }

  // render(){
  //   return (
  //     <Tabs index={this.state.tabActive} onChange={this.handleTabChange}>
  //       <Tab label='General'>
  //         <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this)}>
  //           <List>
  //             <ListDivider />
  //             <ListItem
  //               caption='Record video'
  //               legend='Record on motion detection'
  //               leftIcon='fiber_manual_record'
  //               rightActions={[
  //                 <Switch key="record_video" checked={this.state.record_video} onChange={this.handleChange.bind(this, 'record_video')} />
  //               ]}
  //             />
  //             <ListDivider />
  //             <ListItem
  //               caption='Record picture'
  //               legend='Record on motion detection'
  //               leftIcon='fiber_manual_record'
  //               rightActions={[
  //                 <Switch key="record_picture" checked={this.state.record_picture} onChange={this.handleChange.bind(this, 'record_picture')} />
  //               ]}
  //             />
  //             <ListDivider />
  //           </List>
  //           <Button type="submit" label="Save" raised primary />
  //         </form>
  //       </Tab>
  //       {this.state.webcam.map((el, i) => {
  //         let name = 'Camera ' + (i + 1)
  //         return (
  //           <Tab label={name} key={i + 1}>
  //             <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this, i)}>
  //               <List>
  //                 <ListItem
  //                   caption='Path where save file'
  //                   leftIcon='folder'
  //                   rightActions={[
  //                     <Input type='text' key="path" label='/tmp/motion' onChange={this.handleChange.bind(this, 'target_dir', i)} value={this.state.webcam[i].target_dir} />
  //                   ]}
  //                 />
  //                 <ListDivider />
  //               </List>
  //               <Button type="submit" label="Save" raised primary />
  //             </form>
  //           </Tab>
  //         )
  //       })}
  //     </Tabs>
  //   );
  // }
}

Config.contextTypes = {
	io: window.React.PropTypes.object
};

export default Config;
