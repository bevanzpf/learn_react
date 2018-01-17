import React, {Component} from 'react';
var css = require("../../css/footer.css");

export default class ComponentFooter extends Component{
  render(){
    console.log(css);
    return(
      <footer className={css.miniFooter}>
        <h1>this is footer</h1>
      </footer>
    )
  }
}