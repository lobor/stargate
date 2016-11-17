import React, { Component } from 'react';
import Cpu from 'components/cards/cpu.jsx';
import LastLogin from 'components/cards/lastLogin.jsx';

class Home extends Component {
	render() {
    return (
      <div className="contentCard">
				<Cpu />
				<LastLogin />
      </div>
    )
	}
}
Home.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default Home;
