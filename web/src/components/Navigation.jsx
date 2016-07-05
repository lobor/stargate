import React, { Component } from 'react';
import { Link } from 'react-router';

class Navigation extends Component {
	render() {
    return (
      <nav>
				Menu
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/Config">Config</Link>
					</li>
				</ul>
			</nav>
    )
	}
}

export default Navigation;