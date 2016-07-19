import React, { Component } from 'react';

class PageNotFound extends Component {
	render() {
    return (
      <div>Not found</div>
    )
	}
}
PageNotFound.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default PageNotFound;