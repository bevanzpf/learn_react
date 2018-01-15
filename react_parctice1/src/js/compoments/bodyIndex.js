import React, {Component} from 'react';
import BodyChild from "./bodychild"

export default class Body extends Component{
  constructor(){
    super();
    this.state = {
      username: "parry",
      age: 20
    };
  }

  changeUserInfo(){
    this.setState({age: 50});
  }
  handleChildValueChange(event){
    this.setState({age: event.target.value});
  }
  render(){
    return(
      <div>
        <h2>the main content of page</h2>
        <p>
        username: {this.state.username}
        </p>
        <p>
        age: {this.state.age}
        </p>
        {this.props.userid}
        <input type='button' value='submit' onClick ={this.changeUserInfo.bind(this)}/>
        <br/>
        <BodyChild handleChildValueChange={this.handleChildValueChange.bind(this)}/>

        
      </div>
    )
  }
}