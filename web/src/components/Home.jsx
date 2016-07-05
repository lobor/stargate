import React, { Component } from 'react';
import ItemCard from './ItemCard.jsx';

class Home extends Component {
	render() {
    return (
      <div>
				<ItemCard data={['webcam']} />
			</div>
    )
	}
}

export default Home;