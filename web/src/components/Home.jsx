import React, { Component } from 'react';
import ItemCard from './ItemCard.jsx';

class Home extends Component {
	render() {
    return (
      <div>
				<ItemCard data={[{name: 'webcam', icon: 'icono-camera'}]} />
			</div>
    )
	}
}

export default Home;