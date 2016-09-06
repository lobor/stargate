import React, { PropTypes, Component } from 'react';

import { ListSubHeader } from 'react-toolbox/lib/list';

class ListSubHeaderCustom extends Component{
  render(){
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <ListSubHeader caption={this.props.caption} />
        {this.props.rightActions}
      </div>
    );
  }
}

export default ListSubHeaderCustom;
