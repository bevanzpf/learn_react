import {Link} from 'react-router-dom';
var React = require('react');
var ReactDOM = require('react-dom');




export default class ComponentHeader extends React.Component{

	constructor(){
		super();
		this.state = {
			miniHeader: false
		};
	};
    switchHeader(){
	  this.setState({
		  miniHeader: !this.state.miniHeader
	  });
	};

	render(){
		const styleComponentHeader = {
			header: {
				backgroundColor: "#333",
				color: "#FFF",
				paddingTop : this.state.miniHeader ? "3px" : "15px",
				paddingBottom: this.state.miniHeader ? "3px" : "15px"
			}
			// other style
		};

		return(
			<header style={styleComponentHeader.header}   onClick={this.switchHeader.bind(this)}>
			    <Link to="/list/123"> list </Link>
          <Link to="/main"> main </Link>
			    <h1> this is header </h1>
			</header>
        )
	}
}
