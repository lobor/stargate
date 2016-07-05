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
								icon
							</div>
							<div className="card__body">
								{result}
							</div>
						</div>
					)
				})}
			</div>
    )
	}
}

export default ItemCard;