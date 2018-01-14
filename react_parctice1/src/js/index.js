import React from 'react';
var ReactDOM = require('react-dom');
import ComponentHeader from './compoments/header';

class Index extends React.Component{
  render(){
    return( //only return one dom node
      <div>
        <ComponentHeader/>
        <h2>main content</h2>
      </div>
    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));
