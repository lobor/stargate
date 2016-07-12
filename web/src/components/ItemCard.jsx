import React, { Component } from 'react';
import  { Link } from 'react-router';

class ItemCard extends Component {
	render() {
    return (
			<div className="card__list">
				{this.props.data.map(function(result, i){
					return (
						<Link to={result.link}  className="card__container" key={i}>
							<div className="card__header">
								<div className={result.icon}></div>
							</div>
							<div className="card__body">
								{result.name}
							</div>
						</Link>
					)
				})}
			</div>
    )
	}
}

export default ItemCard;