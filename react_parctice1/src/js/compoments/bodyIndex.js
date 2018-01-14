import React, {Component} from 'react';

export default class Body extends Component{

  componentWillMount(){
    console.log("bodyindex will mount");
  }

  componentDidMount(){
    console.log("bodyindex did mount");
  }

  render(){
    var userName = "parry";
    var boolInput = true;
    //commemts
    var html = "IMOOC&nbsp;LESSON";

    return(
      <div>
        <h2>the main content of page</h2>
        <p>{userName == '' ? "No user yet" : "userName: " + userName}</p>
        <input type='button' value='default button' disabled={boolInput}/> 
        {/*comment*/}
        <p dangerouslySetInnerHTML={{__html : html}}></p>{/*may remain XSS flaw to be actack*/}
      </div>
    )
  }
}