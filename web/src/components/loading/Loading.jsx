import { style } from './style';

class Loading extends React.Component {
	constructor(...args){
			super(...args);
	}

	render() {
    if(this.props.render){
			if(this.props.children.length && Array.isArray(this.props.children)){
				return (
					<div>
						{this.props.children.map((el, i)=>{
							return el;
						})}
					</div>
				);
			}
			else{
				return (<div>{this.props.children}</div>);
			}
    }
    return (
      <Ui.CircularProgress style={style} size={80} thickness={5} />
    );
	}
}

export default Loading;
