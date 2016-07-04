import React from 'react/addons';
import StylingMixin from './../utils/styling-mixin.jsx';
import Router from 'react-router';

let Link = Router.Link;

let styles = {
  wrap: {
    padding: "20px"
  },
  header: {
    fontFamily: "serif",
    fontSize: "48px"
  },
  green: {
    color: "green"
  }
};

var App = React.createClass({
  mixins: [StylingMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState() {
    return {
      isActive: false
    };
  },

  render() {
//<button onClick={this.go}>Go to component</button>
    return (
      <div style={styles.wrap}>
				<h1 style={this.mergeStyles(styles.header, this.state.isActive && styles.green)}>
					It works!
				</h1>
				<button onClick={this.toggleActive}>
					{this.state.isActive ? "Desactivate" : "Activate"}
				</button>
				<Link to="/testComponent">Go to component</Link>
			</div>
    );
  },
	
  toggleActive() {
    this.setState({
      isActive: !this.state.isActive
    });
  }
});

export default App;