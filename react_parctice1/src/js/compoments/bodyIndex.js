import React, {Component} from 'react';

export default class Body extends Component{
  constructor(){
    super();
    this.state = {
      username: "parry",
      age: 20
    };
  }

  render(){
    setTimeout(()=>{
      this.setState({username: "change it"});
    }, 4000);

    return(
      <div>
        <h2>the main content of page</h2>
        <p>
        {this.state.username}
        {this.props.userid}
        </p>
      </div>
    )
  }
}