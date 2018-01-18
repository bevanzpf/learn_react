import React from 'react';
var ReactDOM = require('react-dom');
import ComponentHeader from './compoments/header';
import ComponentFooder from './compoments/footer';
import Body from './compoments/bodyIndex'

export default class Index extends React.Component{

  componentWillMount(){
    console.log("index will mount");
  }

  componentDidMount(){
    console.log("index did mount");
  }

  render(){
    return( //only return one dom node
      <div>
        <ComponentHeader/>
        {this.props.children}
        <ComponentFooder/>
      </div>
    );
  }
}


