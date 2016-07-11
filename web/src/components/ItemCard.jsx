import React, { Component } from 'react';

class ItemCard extends Component {
	render() {
		console.log(this.props.data);
    return (
			<div className="card__list">
				{this.props.data.map(function(result, i){
					return (
						<div className="card__container" key={i}>
							<div className="card__header">
								<div className={result.icon}></div>
							</div>
							<div className="card__body">
								{result.name}
							</div>
						</div>
					)
				})}
			</div>
    )
	}
}

export default ItemCard;