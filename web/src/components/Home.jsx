import React, { Component } from 'react';
import ItemCard from './ItemCard.jsx';

class Home extends Component {
	render() {
    return (
      <div>
        <ItemCard data={[{name: 'webcam', icon: 'icono-camera', link: '/video'}]} />
      </div>
    )
	}
}
Home.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default Home;