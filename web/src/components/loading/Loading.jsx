import { style } from './style';

class Loading extends React.Component {
	constructor(...args){
			super(...args);
	}

	render() {
    if(this.props.render){
			if(this.props.children.length){
				return (
					<div>
						{this.props.children.map((el, i)=>{
							return el;
						})}
					</div>
				);
			}
			else{
				return this.props.children;
			}
    }
    return (
      <Ui.CircularProgress style={style} size={80} thickness={5} />
    );
	}
}

export default Loading;
