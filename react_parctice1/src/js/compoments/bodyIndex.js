import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BodyChild from "./bodychild";
import PropTypes from 'prop-types';
import { Input } from 'antd';
const Search = Input.Search;

export default class Body extends Component{
  constructor(){
    super();
    this.state = {
      username: "parry",
      age: 20
    };
  }

  changeUserInfo(age){
    this.setState({age: age});
    var mySubmitButton = document.getElementById("submitButton");
    ReactDOM.findDOMNode(mySubmitButton).style.color="red";
    console.log(this.refs.submitButton);
    this.refs.submitButton1.style.color="blue";
  }
  handleChildValueChange(event){
    this.setState({age: event.target.value});
  }
  render(){
    return(
      <div>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200 , height: 20}}
        />
        <br></br>
        <h2>the main content of page</h2>
        <p>
        username: {this.state.username}
        </p>
        <p>
        age: {this.state.age}
        </p>
        params from parant: userid: {this.props.userid}
        <Input placeholder="Basic usage" />
        <Input type='button' id="submitButton" ref="submitButton" value='submit' onClick ={this.changeUserInfo.bind(this, 90)}/>
        <br/>
        <BodyChild handleChildValueChange={this.handleChildValueChange.bind(this)}/>

        
      </div>
    )
  }
}

Body.propTypes = {
  userid: PropTypes.number.isRequired
};

Body.defaultProps = {
  userid: "this is a default userid"
}